import type { ReactNode } from "react";
import ReactQueryProvider from "./providers";
import Header from "../components/common/HeaderServer";
import Footer from "../components/common/FooterServer";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <Header />

        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </ReactQueryProvider>
  );
}