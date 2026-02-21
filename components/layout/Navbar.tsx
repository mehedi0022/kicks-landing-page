"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Menu, X } from "lucide-react";
import { useKicks } from "@/context/KicksContext";
import Image from "next/image";

const Navbar = () => {
  const { cart } = useKicks();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "New Drops 🔥", href: "/products" },
    { name: "Men", href: "#" },
    { name: "Women", href: "#" },
  ];

  return (
    <header className="w-full px-4 md:px-10 mt-4 md:mt-8">
      <nav className="container mx-auto bg-white rounded-[24px] py-3 px-6 md:py-5 md:px-10 flex items-center justify-between shadow-sm relative z-50">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden hover:bg-gray-100 rounded-lg transition-all"
          >
            {isOpen ? (
              <X size={24} strokeWidth={2.5} />
            ) : (
              <Menu size={24} strokeWidth={2.5} />
            )}
          </button>

          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.name}
                href={navLink.href}
                className="hover:text-blue-600 transition-colors"
              >
                {navLink.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logo.png"
              width={128}
              height={32}
              alt="KICKS Logo"
              className="w-20 md:w-32 object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
            <Search
              size={22}
              strokeWidth={2.5}
              className="hidden md:block text-[#232321]"
            />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
            <User size={22} strokeWidth={2.5} className="text-[#232321]" />
          </button>

          <Link href="/cart">
            <button className="relative w-10 h-10 md:w-12 md:h-12 bg-[#FFA52F] rounded-full flex items-center justify-center hover:bg-orange-500 transition-all shadow-sm">
              <span className="font-bold text-sm md:text-base text-[#232321]">
                {cart.length || 0}
              </span>
            </button>
          </Link>
        </div>

        <div
          className={`fixed inset-x-4 top-24 bg-white rounded-[32px] shadow-2xl z-40 p-8 transition-all duration-300 md:hidden origin-top ${
            isOpen
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-4 text-xl font-bold uppercase italic italic-font">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.name}
                href={navLink.href}
                onClick={() => setIsOpen(false)}
                className="border-b pb-4 border-gray-100 flex justify-between items-center"
              >
                {navLink.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
