import type { Metadata } from "next";
import { Rubik, Open_Sans } from "next/font/google";
import "./globals.css";
import { KicksProvider } from "@/context/KicksContext";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-rubik",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "KICKS - Premium Sneaker Store",
  description: "Do it right with the best sneakers in the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${openSans.variable} antialiased`}>
        <KicksProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" closeButton />
        </KicksProvider>
      </body>
    </html>
  );
}
