import { Geist_Mono } from 'next/font/google'
import { Footer, Header } from "@matchmycourse/components/layout";
import { raleway } from '@/lib/fonts';


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={`${raleway.className} ${geistMono.variable} antialiased`}>
        {children}
      </main>
      <Footer />
    </>
  );
}