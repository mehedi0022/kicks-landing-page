"use client";

import Image from "next/image";
import reviewsData from "@/data/reviews.json";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Reviews = () => {
  return (
    <section className="py-20 bg-[#E7E7E3]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <h2 className="text-4xl md:text-6xl font-semibold uppercase font-heading leading-[0.9] max-w-xl">
            Reviews
          </h2>

          <Button className="bg-[#4A69E2] hover:bg-blue-700 font-medium text-sm text-white uppercase px-8 py-4 rounded-md transition-all h-auto cursor-pointer">
            See All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-[32px] overflow-hidden flex flex-col h-full shadow-sm hover:translate-y-[-10px] transition-transform duration-300"
            >
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
                  <span className="ml-2 font-semibold ">{review.rating}.0</span>
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
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <Button className="bg-[#232321] text-white w-full py-7 rounded-2xl font-bold uppercase">
            View All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
