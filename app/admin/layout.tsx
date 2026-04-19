import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";
import { SessionProvider } from "next-auth/react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  const user = session?.user as { role: string } | undefined;

  if (!session) {
    redirect("/login");
  }

  // Redirect influencers to their specific dashboard
  if (user?.role === "influencer") {
    redirect("/admin/influencer");
  }

  // Only admin role can access the full admin
  if (user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}