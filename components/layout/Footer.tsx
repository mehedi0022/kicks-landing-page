"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#E7E7E3] pt-10">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="bg-[#4A69E2] rounded-t-[32px] md:rounded-t-[48px] p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-[-40px] relative z-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-medium text-white uppercase font-heading  mb-4">
              Join our kicksplus <br /> club & get 15% off
            </h2>
            <p className="text-blue-100 font-sans text-lg">
              Sign up for free! Join the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-8">
              <Input
                placeholder="Email address"
                className="bg-transparent border-white/50 text-white placeholder:text-blue-200 h-12 w-full md:w-80 rounded-lg"
              />
              <Button className="bg-[#232321] hover:bg-black text-white px-10 h-12 rounded-lg uppercase font-bold text-sm">
                Submit
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <Image
              src="/footer-small-logo.png"
              alt="logo"
              width={367}
              height={112}
            />
          </div>
        </div>

        <div className="bg-[#232321] rounded-[32px] md:rounded-[48px] pt-24 px-8 md:px-16 overflow-hidden relative z-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            <div className="space-y-4">
              <h4 className="text-[#FFA52F] font-bold text-2xl font-heading">
                About us
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed max-w-[280px]">
                We are the biggest hyperstore in the universe. We got you all
                cover with our exclusive collections and latest drops.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#FFA52F] font-bold text-2xl font-heading">
                Categories
              </h4>
              <ul className="space-y-2 text-gray-300 font-sans font-medium">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Runners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sneakers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Basketball
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Outdoor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Golf
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Hiking
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#FFA52F] font-bold text-2xl font-heading">
                Company
              </h4>
              <ul className="space-y-2 text-gray-300 font-sans font-medium">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[#FFA52F] font-bold text-2xl font-heading">
                Follow us
              </h4>
              <div className="flex gap-4 text-white">
                <Link href="#" className="hover:text-[#4A69E2] transition-all">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="hover:text-[#4A69E2] transition-all">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="hover:text-[#4A69E2] transition-all">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="hover:text-[#4A69E2] transition-all">
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>

          <div className="">
            <Image
              src="/footer-big-logo.png"
              alt="logo"
              width={1262}
              height={208}
              className="w-full"
            />
          </div>
        </div>

        <div className="py-6 text-center text-gray-500 text-xs font-sans">
          © {new Date().getFullYear()} Kicks. Developed by Mehedi Hassan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
