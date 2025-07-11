/// <reference path="../../types/next-auth.d.ts" />
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

  if (!session || session.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}