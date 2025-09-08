import { Card } from "@/components/ui/card";

export default function BookingPannelError({ message }: { message: string }) {
  return (
    <Card className="p-4 border border-red-500 bg-red-50 text-red-700">
      <p>Error: {message}</p>
    </Card>
  )
};
