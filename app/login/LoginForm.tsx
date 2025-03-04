"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, KeyRound, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const result = await loginAction(values.email, values.password);

      console.log("Resultado del loginAction:", result); // ✅ Depuración

    // ✅ Verificar si `success` es `false` y hay un mensaje de error
    if (result && !result.success && result.error) {
      toast.error(result.error); // ❌ Muestra "Invalid credentials"
      return;
    }

    toast.success("Inicio de sesión exitoso 🎉");
    router.push("/admin/dashboard");
   
    } catch (error) {
      console.error("Error inesperado:", error);
      toast.error("Error inesperado. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Logo y título */}
      <div className="mb-8 flex flex-col items-center text-white space-y-4">
        <Building2 className="h-12 w-12" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Enterprise Portal
        </h1>
      </div>

      <Card className="w-full max-w-md mx-4 shadow-[0_0_40px_rgba(8,_112,_184,_0.7)] backdrop-blur-sm bg-white/95">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Bienvenido de nuevo
            </CardTitle>
            <CardDescription className="text-center text-base">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  {...form.register("email")}
                  id="email"
                  placeholder="tu@empresa.com"
                  type="email"
                  className="pl-10 h-11"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  {...form.register("password")}
                  id="password"
                  type="password"
                  className="pl-10 h-11"
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mantener sesión iniciada
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-base font-medium"
            >
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-slate-400">
        © 2025 MatchMyCourse. Todos los derechos reservados.
      </div>
    </div>
  );
};

export default LoginForm;
