import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";
import InfluencerHeader from "./components/InfluencerHeader";

export default async function InfluencerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string }).role;

  // Only allow influencer role (and admin for testing)
  if (userRole !== "influencer" && userRole !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <SessionProvider>
      <ReactQueryProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <InfluencerHeader email={session.user.email || ""} />
          <main>{children}</main>
          <Toaster position="top-center" richColors closeButton />
        </div>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
