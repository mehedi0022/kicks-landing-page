"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useKicks } from "@/context/KicksContext";
import { ArrowUpRight, ChevronLeft, ChevronRight, Dog } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavigationOptions } from "swiper/types";

import "swiper/css";

const Categories = () => {
  const { categories, loading } = useKicks();
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (loading) {
    return (
      <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <Skeleton className="h-10 w-[250px] md:h-14 md:w-[400px]" />
            <Skeleton className="h-10 w-[200px] md:h-14 md:w-[300px]" />
          </div>
          <Skeleton className="h-12 w-32 rounded-xl hidden md:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col space-y-4">
              <Skeleton className="aspect-square w-full rounded-[32px]" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="py-20 container mx-auto text-center px-4">
        <div className="flex flex-col items-center gap-4 bg-white p-12 rounded-[40px] shadow-sm">
          <div className="p-6 bg-[#F5F5F5] rounded-full">
            <Dog size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold font-heading uppercase">
            Category Not Found
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto font-sans">
            We couldn't find any category.
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-xl px-8 py-6 uppercase font-bold"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 bg-[#232321] overflow-hidden">
      <div className="container mx-auto mb-8 px-5 md:px-0">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-6xl font-semibold uppercase font-heading text-white">
            Categories
          </h2>

          <div className="flex gap-2">
            <button
              ref={prevRef}
              className="p-3 bg-[#E7E7E3] w-10 h-10 rounded-xl hover:bg-[#4A69E2] hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              ref={nextRef}
              className="p-3 bg-[#E7E7E3] w-10 h-10 rounded-xl hover:bg-[#4A69E2] hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="pl-[max(1rem,calc((100vw-1610px)/2+2.5rem))]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation as NavigationOptions;

            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            1024: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            760: {
              slidesPerView: 1,
            },
          }}
          className="w-full"
        >
          {categories.slice(0, 6).map((cat, index) => (
            <SwiperSlide key={cat.id}>
              <div
                className={`relative h-[400px] md:h-[500px] bg-[#F6F6F6] group transition-all duration-500 overflow-hidden ${index === activeIndex ? "bg-[#e4e4e4] rounded-tl-[32px] md:rounded-tl-[48px]" : "rounded-none"}  
        `}
              >
                <div className="absolute bottom-0 p-8 md:p-10 flex w-full justify-between items-center z-20">
                  <h3 className="text-2xl md:text-3xl font-black uppercase font-heading leading-none text-[#232321]">
                    {cat.name}
                  </h3>

                  <div className="flex justify-end">
                    <div className="bg-[#232321] text-white p-4 rounded-xl group-hover:bg-[#4A69E2] transition-colors shadow-lg cursor-pointer">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <Image
                    src={cat.image || "/fallback-image.png"}
                    alt={cat.name}
                    fill
                    sizes="full"
                    className="object-contain mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
