import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blinkit Discovery Engine",
  description: "AI-Powered Category Discovery Engine",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F6F2] text-[#171717] antialiased">
        <main className="w-full max-w-5xl mx-auto px-6 py-10 overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
