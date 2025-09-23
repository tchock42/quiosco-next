import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiosco Next.JS con App Router y Prisma",
  description: "Quiosco Next.JS con App Router y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
