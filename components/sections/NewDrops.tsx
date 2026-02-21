"use client";

import { useKicks } from "@/context/KicksContext";
import ProductCard from "../shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

const NewDrops = () => {
  const { products, loading } = useKicks();

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

  if (!products || products.length === 0) {
    return (
      <section className="py-20 container mx-auto text-center px-4">
        <div className="flex flex-col items-center gap-4 bg-white p-12 rounded-[40px] shadow-sm">
          <div className="p-6 bg-[#F5F5F5] rounded-full">
            <PackageOpen size={48} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold font-heading uppercase">
            No New Drops Found
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto font-sans">
            We couldn't find any products in this category at the moment.
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
    <section className="py-12 container mx-auto px-5 md:px-0">
      <div className="flex items-center justify-between mb-10 gap-2">
        <h2 className="text-2xl md:text-6xl font-semibold uppercase font-heading max-w-xl">
          Don’t miss out new drops
        </h2>
        <Button className="bg-[#4A69E2] hover:bg-blue-700 font-medium text-sm text-white uppercase px-4 md:px-8 py-2 md:py-4 rounded-md transition-all h-auto cursor-pointer">
          <Link href={"/products"}>Shop New Drops</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewDrops;
