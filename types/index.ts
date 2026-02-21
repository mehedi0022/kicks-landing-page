export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
  userImage: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  selectedSize: string;
  description: string;
  images: string[];
  category: {
    id: string;
    name: string;
    slug: string;
    image: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
