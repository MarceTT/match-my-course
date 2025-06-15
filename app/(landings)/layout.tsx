import { Geist_Mono } from 'next/font/google'
import { raleway } from '../ui/fonts'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'

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