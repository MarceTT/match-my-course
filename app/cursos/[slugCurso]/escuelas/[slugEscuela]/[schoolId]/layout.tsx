import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { raleway } from "@/app/ui/fonts";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamicParams = true;
export const dynamic = 'auto';

export default function SchoolDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${raleway.className} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  );
}
