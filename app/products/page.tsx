"use client";

import { useState } from "react";
import { useKicks } from "@/context/KicksContext";
import ProductCard from "@/components/shared/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllProductsPage = () => {
  const { products, categories, loading } = useKicks();
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const sizes = ["38", "39", "40", "41", "42", "43", "44", "45"];
  const colors = ["#232321", "#4A69E2", "#FFA52F", "#234D37", "#FFFFFF"];

  return (
    <main className="min-h-screen bg-[#E7E7E3] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase font-heading text-[#232321]">
              Life Style Shoes
            </h1>
            <p className="text-gray-600 mt-2 font-sans">
              {products.length} Items found
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="font-bold uppercase text-sm hidden md:block">
              Sort by
            </span>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full md:w-[200px] bg-white rounded-xl border-none h-12 font-bold uppercase">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-1/4 space-y-8">
            <h3 className="text-2xl font-black uppercase font-heading">
              Filters
            </h3>

            <div className="space-y-4">
              <h4 className="font-bold uppercase text-[#232321]">Categories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`cat-${cat.id}`}
                      className="rounded-md border-gray-400"
                    />
                    <label
                      htmlFor={`cat-${cat.id}`}
                      className="text-sm font-bold uppercase cursor-pointer"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold uppercase text-[#232321]">Size</h4>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="h-10 border border-white bg-white hover:bg-[#232321] hover:text-white transition-all rounded-lg font-bold text-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold uppercase text-[#232321]">
                Price Range
              </h4>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                onValueChange={(val) => setPriceRange(val)}
                className="py-4"
              />
              <div className="flex justify-between text-sm font-bold">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold uppercase text-[#232321]">Color</h4>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-[32px]" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllProductsPage;
