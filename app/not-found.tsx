"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E7E7E3] flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="relative">
          <h1 className="text-[120px] md:text-[200px] font-black text-[#232321] leading-none opacity-10 select-none">
            404
          </h1>
        </div>

        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase font-heading text-[#232321]">
            Lost your way, <span className="text-[#4A69E2]">Kicker?</span>
          </h2>
          <p className="text-gray-600 font-sans max-w-lg mx-auto text-lg">
            The page you are looking for doesn&apos;t exist or has been moved.
            Don&apos;t worry, your perfect pair of shoes is still out there!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/">
            <Button
              variant="outline"
              className="h-14 px-8 rounded-xl border-2 border-[#232321] font-bold uppercase flex items-center gap-2 hover:bg-[#232321] hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft size={18} /> Back to Home
            </Button>
          </Link>

          <Link href="/products">
            <Button className="h-14 px-8 rounded-xl bg-[#4A69E2] hover:bg-blue-700 text-white font-bold uppercase flex items-center gap-2 transition-all shadow-lg shadow-blue-200 cursor-pointer">
              <ShoppingBag size={18} /> Shop All Kicks
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
