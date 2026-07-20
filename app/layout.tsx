import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Blinkit Growth Intelligence",
  description: "AI-Powered Discovery Engine for Cross-Category Customer Growth",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 px-10 py-8 max-w-[1400px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
