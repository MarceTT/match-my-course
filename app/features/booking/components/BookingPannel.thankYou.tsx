"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail, Phone } from "lucide-react"
import { useEffect } from "react"
import { launchConfettiBurst } from "@/lib/confetti";
interface ThankYouPageProps {
  onReset: () => void   
  confetti?: boolean
}

export default function ThankYouPage({ onReset, confetti }: ThankYouPageProps) {
    useEffect(() => {
        if (confetti) {
            launchConfettiBurst();
        }
    }, [confetti]);
    
  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <Card className="w-full max-w-2xl border-2 border-primary/20">
        <CardHeader className="bg-primary/5 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-3xl text-primary">¡Solicitud Enviada Exitosamente!</CardTitle>
          <CardDescription className="text-base">Hemos recibido su formulario de inscripción</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-foreground">
              Gracias por completar su solicitud de inscripción para estudiar en el extranjero.
            </p>
            <p className="text-muted-foreground">
              Nuestro equipo se pondrá en contacto con usted dentro de las próximas 24-48
              horas para confirmar los detalles de su programa.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-6">
            <h3 className="mb-4 font-semibold text-foreground">¿Qué sigue?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  1
                </span>
                <span>Recibirá un correo de confirmación con los detalles de su solicitud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  2
                </span>
                <span>Un asesor se comunicará con usted para coordinar los siguientes pasos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  3
                </span>
                <span>Le enviaremos información detallada sobre su programa y alojamiento</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">¿Necesita ayuda?</h3>
            <p className="text-sm text-muted-foreground">
              Si tiene alguna pregunta o necesita asistencia inmediata, no dude en contactarnos:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@matchmycourse.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+56 931714541</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={onReset} size="lg" variant="outline" className="bg-transparent">
              Enviar otra solicitud
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
