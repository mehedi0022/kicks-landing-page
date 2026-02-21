"use client";

import Image from "next/image";
import Link from "next/link";
import { useKicks } from "@/context/KicksContext";
import { Trash2, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import YouMayAlsoLike from "@/components/shared/YouMayAlsoLike";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useKicks();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const delivery = subtotal > 0 ? 6.99 : 0;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <main className="min-h-screen bg-[#E7E7E3] pt-10 pb-10">
      <div className="container mx-auto">
        <div className="p-6 mb-8">
          <h2 className="text-3xl font-semibold font-heading text-[#232321]">
            Saving to celebrate
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enjoy up to 60% off thousands of styles during the End of Year sale
            - while supplies last. No code needed.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[65%] space-y-4">
            <div className="bg-white rounded-[32px] p-8">
              <div className="mb-6">
                <h2 className="text-3xl font-semibold font-heading">
                  Your Bag
                </h2>
                <p className="text-gray-500 text-sm">
                  Items in your bag not reserved- check out now to make them
                  yours.
                </p>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-100 last:border-0"
                  >
                    <div className="relative w-full sm:w-40 aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-semibold uppercase font-heading leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
                            {item.category.name}
                          </p>

                          <div className="flex gap-4 mt-2">
                            <p className="text-gray-400 text-xs">
                              Color:{" "}
                              <span className="text-[#232321] font-bold">
                                {item.selectedColor}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="text-xl font-black text-[#4A69E2]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <span className="text-gray-500">Size</span>
                          <span className="bg-[#ECEEF0] px-3 py-1 rounded-md">
                            {item.selectedSize}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-bold">
                          <span className="text-gray-500">Quantity</span>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                parseInt(e.target.value),
                              )
                            }
                            className="bg-[#ECEEF0] border-none rounded-md px-2 py-1 focus:ring-0 cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <button className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                          <Heart size={20} />
                        </button>
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.selectedSize)
                          }
                          className="text-gray-400 hover:text-black transition-colors cursor-pointer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="px-8 sticky top-24">
              <h2 className="text-3xl font-semibold font-heading mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 font-semibold text-gray-600 text-base">
                <div className="flex justify-between">
                  <span>{cart.length} Item</span>
                  <span className="text-[#232321]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-[#232321]">${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax</span>
                  <span className="text-[#232321]">-</span>
                </div>
                <div className="flex justify-between text-lg text-[#232321] pt-4 border-t border-gray-100">
                  <span className="font-black">Total</span>
                  <span className="font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full bg-[#232321] hover:bg-black text-white h-14 rounded-xl font-heading uppercase font-semibold mt-8">
                Checkout
              </Button>
              <p className="text-start text text-black mt-4 underline cursor-pointer">
                Use a promo code
              </p>
            </div>
          </div>
        </div>

        <YouMayAlsoLike />
      </div>
    </main>
  );
};

const EmptyCartState = () => (
  <main className="min-h-screen bg-[#E7E7E3] flex items-center justify-center py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="bg-white rounded-[48px] p-12 md:p-20 max-w-4xl mx-auto shadow-sm">
        <div className="bg-[#F5F5F5] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-medium uppercase font-heading text-[#232321] leading-tight">
          Your bag is <span className="text-[#4A69E2]">Empty</span>
        </h2>
        <p className="text-gray-500 mt-6 font-sans text-lg max-w-md mx-auto">
          Looks like you haven&apos;t added any kicks to your bag yet.
          Let&apos;s find you something special!
        </p>
        <Link href="/products" className="inline-block mt-10">
          <Button className="bg-[#232321] hover:bg-[#4A69E2] text-white px-10 h-16 rounded-2xl uppercase font-black flex items-center gap-3 transition-all">
            Start Shopping <ArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  </main>
);

export default CartPage;
