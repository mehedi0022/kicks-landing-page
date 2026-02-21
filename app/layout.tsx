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
  metadataBase: new URL("https://kicks-store.vercel.app"),
  title: {
    default: "KICKS - Premium Sneaker Store",
    template: "%s | KICKS",
  },
  description:
    "Experience the ultimate sneaker collection. Do it right with KICKS – your destination for authentic, premium sneakers from the world's best brands.",
  keywords: [
    "Sneakers",
    "Premium Shoes",
    "Kicks Store",
    "Authentic Sneakers",
    "Buy Shoes Online",
  ],
  authors: [{ name: "Mehedi Hassan" }],
  creator: "Mehedi Hassan",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kicks-store.vercel.app",
    siteName: "KICKS",
    title: "KICKS - Premium Sneaker Store",
    description:
      "Authentic sneakers at your fingertips. Discover the latest drops and classic kicks.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KICKS Premium Sneaker Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KICKS - Premium Sneaker Store",
    description: "The best sneakers in the world, delivered to your door.",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
