import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee SaaS - Find Your Perfect Coffee Spot",
  description: "Discover the best coffee shops near you with AI-powered recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2024 Coffee SaaS. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}