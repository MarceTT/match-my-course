import { describe, it, expect, vi } from "vitest";

import {
  SsgDataError,
  assertSsgParams,
  handleSsgFailure,
  isProductionBuild,
  shouldFailOnMissingData,
  withSsgRetries,
} from "./ssgData";

/**
 * These tests pin the one behaviour that matters here: a production build must
 * FAIL when the data behind `generateStaticParams` is missing, instead of
 * quietly shipping a site without those pages.
 *
 * The regression this prevents actually happened: the SEO fetch threw
 * ECONNREFUSED during a build, the catch returned `[]`, and the build finished
 * green having generated 83 pages instead of the hundreds of school pages the
 * site lives on.
 */

const BUILD = { NEXT_PHASE: "phase-production-build" };
const RUNTIME = { NEXT_PHASE: "phase-production-server" };
const DEV = {};

describe("isProductionBuild", () => {
  it("is true only during the Next production build phase", () => {
    expect(isProductionBuild(BUILD)).toBe(true);
    expect(isProductionBuild(RUNTIME)).toBe(false);
    expect(isProductionBuild(DEV)).toBe(false);
  });
});

describe("shouldFailOnMissingData", () => {
  it("fails the build by default", () => {
    expect(shouldFailOnMissingData(BUILD)).toBe(true);
  });

  it("never fails outside the build phase, so runtime ISR degrades instead", () => {
    expect(shouldFailOnMissingData(RUNTIME)).toBe(false);
    expect(shouldFailOnMissingData(DEV)).toBe(false);
  });

  it("honours the explicit ALLOW_EMPTY_SSG escape hatch", () => {
    // Needed for local builds with no backend reachable.
    expect(
      shouldFailOnMissingData({ ...BUILD, ALLOW_EMPTY_SSG: "true" })
    ).toBe(false);
    // Only the exact opt-in disables it — no truthy-string surprises.
    expect(shouldFailOnMissingData({ ...BUILD, ALLOW_EMPTY_SSG: "1" })).toBe(true);
    expect(shouldFailOnMissingData({ ...BUILD, ALLOW_EMPTY_SSG: "" })).toBe(true);
  });
});

describe("assertSsgParams", () => {
  const params = [{ slug: "a" }, { slug: "b" }];

  it("returns the params unchanged when there is data", () => {
    expect(assertSsgParams("school pages", params, BUILD)).toBe(params);
  });

  it("throws during a build when the list is empty", () => {
    expect(() => assertSsgParams("school pages", [], BUILD)).toThrow(SsgDataError);
  });

  it("names the route and the cause in the message, so the build log is actionable", () => {
    let message = "";
    try {
      assertSsgParams("school pages", [], BUILD);
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).toContain("school pages");
    expect(message).toContain("ALLOW_EMPTY_SSG");
  });

  it("allows an empty list outside the build phase", () => {
    expect(assertSsgParams("school pages", [], RUNTIME)).toEqual([]);
    expect(assertSsgParams("school pages", [], DEV)).toEqual([]);
  });

  it("allows an empty list when the escape hatch is set", () => {
    expect(
      assertSsgParams("school pages", [], { ...BUILD, ALLOW_EMPTY_SSG: "true" })
    ).toEqual([]);
  });
});

describe("handleSsgFailure", () => {
  it("rethrows during a build so the deploy stops", () => {
    expect(() =>
      handleSsgFailure("school pages", new Error("ECONNREFUSED"), BUILD)
    ).toThrow(SsgDataError);
  });

  it("keeps the original error as the cause", () => {
    const original = new Error("ECONNREFUSED");
    try {
      handleSsgFailure("school pages", original, BUILD);
    } catch (error) {
      expect((error as SsgDataError).cause).toBe(original);
    }
  });

  it("degrades to an empty list outside the build phase", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(handleSsgFailure("school pages", new Error("boom"), RUNTIME)).toEqual([]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("rethrows an SsgDataError untouched instead of wrapping it twice", () => {
    const already = new SsgDataError("school pages", "empty");
    try {
      handleSsgFailure("school pages", already, BUILD);
    } catch (error) {
      expect(error).toBe(already);
    }
  });
});

describe("withSsgRetries", () => {
  it("returns the first successful result without retrying", async () => {
    const fn = vi.fn().mockResolvedValue(["ok"]);
    await expect(withSsgRetries(fn, { attempts: 3, delayMs: 0 })).resolves.toEqual([
      "ok",
    ]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries a transient failure and then succeeds", async () => {
    // This is the real scenario: the API restarted mid-build.
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("ECONNREFUSED"))
      .mockResolvedValue(["ok"]);
    await expect(withSsgRetries(fn, { attempts: 3, delayMs: 0 })).resolves.toEqual([
      "ok",
    ]);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("gives up after the configured attempts and surfaces the last error", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("ECONNREFUSED"));
    await expect(
      withSsgRetries(fn, { attempts: 3, delayMs: 0 })
    ).rejects.toThrow("ECONNREFUSED");
    expect(fn).toHaveBeenCalledTimes(3);
  });
});
