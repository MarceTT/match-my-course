import type { ReactNode } from "react";
import ReactQueryProvider from "./providers";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

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