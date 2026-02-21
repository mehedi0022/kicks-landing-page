"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const images = [
    { main: "/nike-air-max.jpg", thumb: "/nike-air-max.jpg" },
    { main: "/nike-air-max-thumb1.jpg", thumb: "/nike-air-max-thumb1.jpg" },
    { main: "/nike-air-max-thumb2.jpg", thumb: "/nike-air-max-thumb2.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto px-5 md:px-0 pt-10 pb-20">
      <div className="w-full mb-5">
        <h1 className="font-heading font-bold uppercase leading-[100%] tracking-[-0.04em] whitespace-nowrap text-center text-[16.5vw] lg:text-[14.5vw] max-w-[100vw] select-none">
          DO IT <span className="text-[#4A69E2]">RIGHT</span>
        </h1>
      </div>

      <div className="full">
        <div className="relative w-full h-full aspect-7/8 md:aspect-21/9 rounded-[40px] overflow-hidden bg-[#FAFAFA] group">
          <div className="absolute inset-0 bg-[#CC9B6D]">
            <Image
              key={currentIndex}
              src={images[currentIndex].main}
              alt="Nike Air Max"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute max-w-[70%] bottom-5 md:bottom-10 left-5 md:left-10 text-white z-20">
            <h2 className="text-2xl md:text-6xl font-semibold uppercase mb-2">
              NIKE AIR MAX
            </h2>
            <p className="text-gray-100 max-w-sm text-sm md:text-base mb-6 opacity-90">
              Nike introducing the new air max for everyone's comfort and style.
            </p>
            <Button className="bg-[#4A69E2] hover:bg-blue-700 font-medium text-sm text-white uppercase px-4 md:px-8 py-2 md:py-4 rounded-md transition-all h-auto cursor-pointer">
              <Link href={"/products"}>SHOP NOW</Link>
            </Button>
          </div>

          <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 flex flex-col gap-4 z-20">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 md:w-24 md:h-24 rounded-xl border-2 overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? "border-yellow-400 scale-110"
                    : "border-white opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.thumb}
                  width={200}
                  height={200}
                  alt={`preview ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:block z-30">
            <div className="bg-[#232321] py-4 px-8 rounded-b-xl -rotate-90 origin-left translate-x-[-2px]">
              <h4 className="text-[12px] font-bold tracking-[0.3em] text-white whitespace-nowrap">
                Nike product of the year
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
