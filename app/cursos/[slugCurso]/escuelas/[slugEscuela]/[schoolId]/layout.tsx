import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { raleway } from "@/app/ui/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/app/ui/GTMPageViewTracker";
import { Suspense } from "react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamicParams = true;
export const dynamic = "auto";

export default function SchoolDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${raleway.className} ${geistMono.variable} antialiased`}>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER!} />
      <Suspense fallback={null}>
      <GTMPageViewTracker />
      </Suspense>
      {children}
    </div>
  );
}
