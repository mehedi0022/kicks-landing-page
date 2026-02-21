"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { useKicks } from "@/context/KicksContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import YouMayAlsoLike from "@/components/shared/YouMayAlsoLike";

const ProductDetails = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useKicks();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("38");
  const sizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];
  const colors = [
    { code: "#232321", name: "Black" },
    { code: "#4A69E2", name: "Royal Blue" },
    { code: "#FFA52F", name: "Orange" },
    { code: "#234D37", name: "Dark Green" },
    { code: "#FFFFFF", name: "White" },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/products/slug/${slug}`,
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchSingleProduct();
  }, [slug]);

  if (loading) return <ProductSkeleton />;
  if (!product)
    return (
      <div className="text-center py-20 font-black uppercase">
        Product Not Found
      </div>
    );

  return (
    <main className="min-h-screen bg-[#E7E7E3] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.images.slice(0, 4).map((img, idx) => (
              <div
                key={idx}
                className={`relative aspect-square bg-[#F5F5F5] ${idx == 0 ? "rounded-tl-[48px]" : idx == 1 ? "rounded-tr-[48px]" : idx == 2 ? "rounded-bl-[48px]" : "rounded-br-[48px]"} overflow-hidden`}
              >
                <Image
                  src={img.replace(/[\[\]"]/g, "")}
                  alt={`${product.title} angle ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[40%] space-y-8">
            <div className="space-y-3">
              <span className="bg-[#4A69E2] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                New Release
              </span>
              <h1 className="text-3xl md:text-5xl font-black uppercase font-heading leading-none text-[#232321]">
                {product.title}
              </h1>
              <p className="text-2xl font-bold text-[#4A69E2]">
                ${product.price}.00
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-bold uppercase text-xs">Color</p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.code }}
                    className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 border-2
          ${
            selectedColor.code === color.code
              ? "border-white ring-2 ring-[#232321]"
              : "border-transparent hover:scale-110"
          }
          ${color.code === "#FFFFFF" ? "border-gray-200" : ""} 
        `}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase">
                <span>Size</span>
                <span className="underline cursor-pointer">Size Chart</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 rounded-lg font-bold text-sm transition-all ${
                      selectedSize === size
                        ? "bg-[#232321] text-white"
                        : "bg-white text-[#232321] border border-transparent hover:border-[#232321]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (!selectedSize) {
                      alert("Please select a size first!");
                      return;
                    }
                    addToCart(product, selectedSize, selectedColor.name);
                    toast.success(`${product.title} added to bag`, {
                      action: {
                        label: "View Bag",
                        onClick: () => router.push("/cart"),
                      },
                    });
                  }}
                  className="flex-1 bg-[#232321] hover:bg-black text-white h-16 rounded-2xl uppercase font-black gap-3 text-lg"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-14 h-14 rounded-xl border-[#232321] border-2"
                >
                  <Heart size={20} />
                </Button>
              </div>
              <Button className="w-full bg-[#4A69E2] hover:bg-blue-700 text-white h-14 rounded-xl uppercase font-bold text-xs">
                Buy it Now
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-300">
              <h4 className="font-bold uppercase text-sm mb-3">
                About the product
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed font-sans italic">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10">
        <YouMayAlsoLike currentProductId={product?.id} />
      </div>
    </main>
  );
};

const ProductSkeleton = () => (
  <div className="container mx-auto px-4 pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="aspect-square w-full rounded-[24px]" />
      ))}
    </div>
    <div className="space-y-6">
      <Skeleton className="h-14 w-3/4" />
      <Skeleton className="h-8 w-1/4" />
      <div className="grid grid-cols-5 gap-2 pt-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>
  </div>
);

export default ProductDetails;
