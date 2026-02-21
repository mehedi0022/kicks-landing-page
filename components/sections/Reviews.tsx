"use client";

import Image from "next/image";
import reviewsData from "@/data/reviews.json";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

const Reviews = () => {
  return (
    <section className="py-20 bg-[#E7E7E3]">
      <div className="container mx-auto px-5 md:px-0">
        <div className="flex items-center justify-between mb-12 gap-6">
          <h2 className="text-2xl md:text-6xl font-semibold uppercase font-heading leading-[0.9] max-w-xl">
            Reviews
          </h2>

          <Button className="bg-[#4A69E2] hover:bg-blue-700 font-medium text-sm text-white uppercase px-4 md:px-8 py-2 md:py-4 rounded-md transition-all h-auto cursor-pointer">
            See All
          </Button>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            760: {
              slidesPerView: 1,
              spaceBetween: 3,
            },
          }}
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-[32px] overflow-hidden flex flex-col h-full shadow-sm hover:translate-y-[-10px] transition-transform duration-300">
                <div className="p-8 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex w-full justify-between items-center gap-3">
                      <div className="basis-3/4">
                        <h4 className="font-bold text-lg leading-tight">
                          {review.user}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#8a8c91]">
                        <Image
                          src={review.avatar}
                          alt={review.user}
                          fill
                          sizes="full"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "currentColor" : "none"}
                        className={
                          i < review.rating
                            ? "text-yellow-400 mr-0.5"
                            : "text-gray-300 mr-0.5"
                        }
                      />
                    ))}
                    <span className="ml-2 font-semibold ">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] w-full bg-[#F5F5F5] mt-auto">
                  <Image
                    src={review.productImage}
                    alt="Reviewed product"
                    fill
                    sizes="full"
                    className="object-cover"
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

export default Reviews;
