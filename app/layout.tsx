import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { raleway } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "./providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match My Course",
  description: "Match My Course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="preload"
          as="image"
          href="https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Pagina%2Binicial.webp"
          imageSrcSet="https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/Pagina%2Binicial.webp"
          imageSizes="100vw"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Match My Course" />
        <meta name="application-name" content="Match My Course" />
      </head>
      <body
        className={`${raleway.className} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
