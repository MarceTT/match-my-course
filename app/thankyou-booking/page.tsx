"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ThankYouPage from "@/app/features/booking/components/BookingPannel.thankYou";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";

export default function ThankYouBookingPage() {
  const router = useRouter();

  const handleReset = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-16">
        <ThankYouPage onReset={handleReset} confetti={true} />
      </div>
      <Footer />
    </div>
  );
}