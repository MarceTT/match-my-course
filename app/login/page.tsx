import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await auth();

  const user = session?.user as { role: string } | undefined;

  if (user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <LoginForm />
    </div>
  );
}