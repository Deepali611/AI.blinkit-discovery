import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blinkit Discovery Engine",
  description: "AI-Powered Category Discovery Engine",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F6F2] text-[#171717] antialiased">
        <div className="min-h-screen flex flex-col">
          {/* Top Premium Navbar */}
          <header className="border-b border-[#ECE8DE] bg-[#F2F1EC] sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="w-8 h-8 rounded-[12px] bg-[#F8CB46] flex items-center justify-center text-[#171717] text-[15px] font-black shadow-sm hover:opacity-90 transition-opacity">
                  B
                </Link>
                <div>
                  <Link href="/" className="font-display font-extrabold text-[14.5px] text-[#171717] leading-none tracking-tight hover:text-[#59624B] transition-colors">
                    Blinkit Discovery Engine
                  </Link>
                  <div className="text-[9px] text-[#5F6368] font-bold mt-0.5 tracking-wide uppercase">
                    AI-Powered Category Discovery
                  </div>
                </div>
              </div>
              
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-[12px] font-bold text-[#5F6368] hover:text-[#171717] transition-colors">
                  Dashboard
                </Link>
                <Link href="/guide" className="text-[12px] font-bold text-[#5F6368] hover:text-[#171717] transition-colors">
                  User Guide
                </Link>
                <Link href="/architecture" className="text-[12px] font-bold text-[#5F6368] hover:text-[#171717] transition-colors">
                  Engine Synopsis
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
