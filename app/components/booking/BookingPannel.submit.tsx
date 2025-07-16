import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function BookingPannelSubmit() {
  return (
    <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">¡Mensaje Enviado!</h2>
        <p className="text-green-700 mb-4">Gracias por contactarnos. Hemos recibido tu mensaje correctamente.</p>
        <p className="text-sm text-green-600">Te responderemos en las próximas 24 horas.</p>
      </CardContent>
    </Card>
  )
};
