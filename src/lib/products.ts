export interface ShopProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  oldPrice?: string;
  discount?: number;
}

export type Product = ShopProduct;

export const products: ShopProduct[] = [
  { id: 1, name: "Chronograph Noir Watch", category: "Watches", price: "৳34,000", oldPrice: "৳42,000", discount: 19, image: "/images/products/watch-1.avif", colors: ["Black", "Silver"], sizes: ["One Size"] },
  { id: 2, name: "Luxe Leather Tote Bag", category: "Bags", price: "৳49,000", oldPrice: "৳58,000", discount: 16, image: "/images/products/bag-1.avif", colors: ["Brown", "Black"], sizes: ["Medium", "Large"] },
  { id: 3, name: "Gold Minimalist Bracelet", category: "Jewelry", price: "৳18,000", oldPrice: "৳22,000", discount: 18, image: "/images/products/bracelet-1.avif", colors: ["Gold"], sizes: ["S", "M", "L"] },
  { id: 4, name: "Classic Aviator Sunglasses", category: "Sunglasses", price: "৳21,000", oldPrice: "৳26,000", discount: 19, image: "/images/products/sunglasses-1.avif", colors: ["Gold", "Silver"], sizes: ["One Size"] },
  { id: 5, name: "Artisan Leather Wallet", category: "Wallets", price: "৳12,000", oldPrice: "৳15,000", discount: 20, image: "/images/a5.avif", colors: ["Brown", "Black"], sizes: ["One Size"] },
  { id: 6, name: "Signature Velvet Pouch", category: "Tech Accessories", price: "৳9,500", oldPrice: "৳12,000", discount: 21, image: "/images/a6.avif", colors: ["Black", "Navy"], sizes: ["S", "M"] },
  { id: 7, name: "Premium Aviator Shades", category: "Sunglasses", price: "৳26,000", oldPrice: "৳32,000", discount: 19, image: "/images/products/sunglasses-1.avif", colors: ["Black", "Gold"], sizes: ["One Size"] },
  { id: 8, name: "Classic Bifold Wallet", category: "Wallets", price: "৳15,000", oldPrice: "৳18,000", discount: 17, image: "/images/a5.avif", colors: ["Brown", "Navy"], sizes: ["One Size"] },
  { id: 9, name: "Smart Watch Band", category: "Tech Accessories", price: "৳9,500", oldPrice: "৳12,000", discount: 21, image: "/images/products/watch-1.avif", colors: ["Black", "Silver", "Brown"], sizes: ["S", "M", "L"] },
  { id: 10, name: "Daytona Silver Watch", category: "Watches", price: "৳52,000", oldPrice: "৳62,000", discount: 16, image: "/images/products/watch-1.avif", colors: ["Silver", "Black"], sizes: ["One Size"] },
  { id: 11, name: "Canvas Messenger Bag", category: "Bags", price: "৳38,000", oldPrice: "৳45,000", discount: 16, image: "/images/products/bag-1.avif", colors: ["Black", "Brown"], sizes: ["Medium", "Large"] },
  { id: 12, name: "Pearl Drop Necklace", category: "Jewelry", price: "৳24,000", oldPrice: "৳30,000", discount: 20, image: "/images/products/bracelet-1.avif", colors: ["Gold", "Silver"], sizes: ["One Size"] },
];
