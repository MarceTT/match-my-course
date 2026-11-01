/**
 * ssgData — make a production build FAIL when the data behind
 * `generateStaticParams` is missing, instead of quietly shipping a site without
 * those pages.
 *
 * WHY THIS EXISTS
 * The school pages are pre-rendered from `fetchAllSeoEntries()`. That fetch hits
 * the live API at build time, and the original code swallowed any failure:
 *
 *     } catch (error) {
 *       console.error('[generateStaticParams] Error:', error);
 *       return [];
 *     }
 *
 * On 2026-11-01 the API restarted while the frontend was building. Every SEO
 * fetch threw ECONNREFUSED, the catch returned `[]`, and the build completed
 * GREEN having generated 83 pages instead of the hundreds of school pages the
 * site's SEO depends on. A deploy that silently drops the main indexable
 * surface is worse than a deploy that fails: nobody gets paged for green.
 *
 * WHAT IT DOES
 * During `next build` (and only then) an empty or failed params fetch aborts the
 * build with an actionable message. Outside the build phase — runtime ISR
 * revalidation — it degrades to an empty list exactly as before, because taking
 * the live site down over a transient API blip would be the wrong trade.
 *
 * ESCAPE HATCH
 * `ALLOW_EMPTY_SSG=true` restores the old permissive behaviour. That is what you
 * want for a local `bun run build` with no backend reachable; it is NOT what you
 * want in Railway.
 */

/** The value Next.js sets in `NEXT_PHASE` while running `next build`. */
export const BUILD_PHASE = "phase-production-build";

/** Opt-out env var, honoured only when set to the exact string "true". */
export const ALLOW_EMPTY_SSG = "ALLOW_EMPTY_SSG";

/**
 * The environment this module reads, injectable so it is testable. Declared as
 * an index signature rather than the two named keys, because the project types
 * `process.env` with its own `ProcessEnv` and a two-field interface has nothing
 * in common with it. The keys actually read are `NEXT_PHASE` and
 * `ALLOW_EMPTY_SSG`.
 */
export interface SsgEnv {
  readonly [key: string]: string | undefined;
}

/** Raised when a build-time params fetch produced nothing usable. */
export class SsgDataError extends Error {
  readonly label: string;

  constructor(label: string, detail: string, options?: { cause?: unknown }) {
    super(
      `[ssg] ${label}: ${detail}. The production build was stopped on purpose: ` +
        `shipping without these pages would silently drop them from the site. ` +
        `Check that the API is reachable from the build, or set ` +
        `${ALLOW_EMPTY_SSG}=true to build without them anyway.`,
      options
    );
    this.name = "SsgDataError";
    this.label = label;
  }
}

/** True while `next build` is running. */
export function isProductionBuild(env: SsgEnv = process.env): boolean {
  return env.NEXT_PHASE === BUILD_PHASE;
}

/**
 * True when missing data must abort. Only a production build is strict, and only
 * when the explicit escape hatch is absent.
 */
export function shouldFailOnMissingData(env: SsgEnv = process.env): boolean {
  if (!isProductionBuild(env)) return false;
  return env.ALLOW_EMPTY_SSG !== "true";
}

/**
 * Guard the result of a `generateStaticParams` computation.
 *
 * Returns the params untouched when there is data, or when we are not in a
 * strict build. Throws `SsgDataError` when a build produced an empty list —
 * the case that previously went unnoticed, because an empty list is not an
 * error to Next.js.
 */
export function assertSsgParams<T>(
  label: string,
  params: T[],
  env: SsgEnv = process.env
): T[] {
  if (params.length > 0) return params;
  if (!shouldFailOnMissingData(env)) return params;
  throw new SsgDataError(label, "resolved zero params at build time");
}

/**
 * Handle a failure raised while computing `generateStaticParams`.
 *
 * In a strict build it rethrows (preserving the original error as `cause`) so
 * the deploy stops. Anywhere else it warns and degrades to an empty list, which
 * is the pre-existing runtime behaviour.
 */
export function handleSsgFailure<T>(
  label: string,
  error: unknown,
  env: SsgEnv = process.env
): T[] {
  if (shouldFailOnMissingData(env)) {
    if (error instanceof SsgDataError) throw error;
    throw new SsgDataError(label, "failed to resolve params at build time", {
      cause: error,
    });
  }

  console.warn(
    `[ssg] ${label}: could not resolve params, continuing with none.`,
    error
  );
  return [];
}

export interface SsgRetryOptions {
  /** Total attempts, including the first one. */
  attempts?: number;
  /** Fixed delay between attempts, in milliseconds. */
  delayMs?: number;
  /** Injectable sleep, so tests do not wait. */
  sleep?: (ms: number) => Promise<void>;
}

const defaultSleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry a build-time data fetch a few times before giving up.
 *
 * A deploy should not fail because the API happened to restart during the
 * build — which is exactly what happened on 2026-11-01 — but it must still fail
 * if the API is genuinely unavailable. The last error is surfaced untouched so
 * the caller can wrap it with route context.
 */
export async function withSsgRetries<T>(
  fetcher: () => Promise<T>,
  options: SsgRetryOptions = {}
): Promise<T> {
  const attempts = options.attempts ?? 3;
  const delayMs = options.delayMs ?? 2000;
  const sleep = options.sleep ?? defaultSleep;

  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fetcher();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(delayMs);
    }
  }
  throw lastError;
}
