import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva Confirmada | MatchMyCourse",
  description: "Tu solicitud de reserva ha sido enviada exitosamente.",
  robots: { index: false, follow: false },  // noindex transactional page
};

export default function ThankYouBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
