// next-auth module augmentation preserved from the former lib/types.ts file.
// The authoritative augmentation lives in types/next-auth.d.ts; this block is
// kept verbatim (declaration merging is additive) so PR2's file-shadow fix does
// not silently drop any augmentation. next-auth unification is a SEPARATE change.
// See change: unify-school-details-type (PR2).

export {};

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      accessToken: string;
    };
  }

  interface User {
    accessToken: string;
    refreshToken?: string;
  }

  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
