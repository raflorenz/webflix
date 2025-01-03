import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Webflix",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-8">
          <header className="flex justify-between items-center">
            <h1 className="my-8 text-6xl text-[#e50914] uppercase">
              <Link href="/">Webflix</Link>
            </h1>
          </header>
          <main>{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
