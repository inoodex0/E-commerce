import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, quantity, size, color) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) =>
              item.product.name === product.name &&
              item.size === size &&
              item.color === color
          );
          if (existingIndex >= 0) {
            const updated = [...state.cart];
            updated[existingIndex].quantity += quantity;
            return { cart: updated };
          } else {
            return {
              cart: [...state.cart, { product, quantity, size, color }],
            };
          }
        }),
      removeFromCart: (index) =>
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index),
        })),
      updateQuantity: (index, quantity) =>
        set((state) => {
          const updated = [...state.cart];
          updated[index].quantity = Math.max(1, quantity);
          return { cart: updated };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "novara-cart-storage",
    }
  )
);

interface WishlistStore {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productName: string) => boolean;
  removeFromWishlist: (productName: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((p) => p.name === product.name);
          if (exists) {
            return { wishlist: state.wishlist.filter((p) => p.name !== product.name) };
          } else {
            return { wishlist: [...state.wishlist, product] };
          }
        }),
      isWishlisted: (productName) => {
        return get().wishlist.some((p) => p.name === productName);
      },
      removeFromWishlist: (productName) =>
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.name !== productName),
        })),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "novara-wishlist-storage",
    }
  )
);
