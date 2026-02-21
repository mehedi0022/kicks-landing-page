import Image from "next/image";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = product.images[0].replace(/[\[\]"]/g, "");

  return (
    <div className="rounded-3xl group transition-all">
      <div className="relative aspect-square bg-[#F5F5F5] rounded-[32px] overflow-hidden mb-4 border-8 border-[#FAFAFA]">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="full"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h4 className="absolute top-0 left-0 bg-[#4A69E2] py-2 px-5 text-[10px] text-white font-bold uppercase tracking-wider rounded-br-[32px] z-10">
          New
        </h4>
      </div>
      <div className="px-2 mb-4">
        <h3 className="font-heading font-semibold text-base md:text-2xl uppercase line-clamp-2">
          {product.title}
        </h3>
      </div>
      <Button className="w-full bg-[#232321] hover:bg-[#4A69E2] text-white font-medium py-5 rounded-md flex items-center justify-center px-6">
        <Link href={`/products/${product.slug}`}>
          <span>VIEW PRODUCT</span>-
          <span className="text-yellow-400 font-semibold">
            ${product.price}
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default ProductCard;
