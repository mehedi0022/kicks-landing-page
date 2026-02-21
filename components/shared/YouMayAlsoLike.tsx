"use client";

import { useRef } from "react";
import { useKicks } from "@/context/KicksContext";
import ProductCard from "../shared/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavigationOptions } from "swiper/types";

import "swiper/css";

interface Props {
  currentProductId?: number;
}

const YouMayAlsoLike = ({ currentProductId }: Props) => {
  const { products, loading } = useKicks();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const relatedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 6);

  if (loading || relatedProducts.length === 0) return null;

  return (
    <section className="py-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-6xl font-semibold font-heading leading-none">
          You may also like
        </h2>

        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="p-3 bg-[#E7E7E3] rounded-xl hover:bg-[#232321] hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="p-3 bg-[#232321] text-white rounded-xl hover:bg-[#4A69E2] transition-all shadow-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
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
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="related-products-swiper"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default YouMayAlsoLike;
