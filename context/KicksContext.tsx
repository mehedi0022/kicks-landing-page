"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { Product, Category } from "@/types";

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

interface KicksContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedSize: string,
    colorName: string,
  ) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
}

const KicksContext = createContext<KicksContextType | undefined>(undefined);

export const KicksProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axios.get("https://api.escuelajs.co/api/v1/products"),
          axios.get("https://api.escuelajs.co/api/v1/categories"),
        ]);

        setProducts(prodRes.data.slice(0, 20));
        setCategories(catRes.data.slice(1, 4));
      } catch (error) {
        console.error("Data fetching failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color,
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevCart,
        { ...product, quantity: 1, selectedSize: size, selectedColor: color },
      ];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.id === productId && item.selectedSize === size),
      );

      return updatedCart;
    });
  };

  const updateQuantity = (
    productId: number,
    size: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  return (
    <KicksContext.Provider
      value={{
        products,
        categories,
        loading,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </KicksContext.Provider>
  );
};

export const useKicks = () => {
  const context = useContext(KicksContext);
  if (!context) throw new Error("useKicks must be used within KicksProvider");
  return context;
};
