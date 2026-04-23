import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cartItems: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  isInCart: (id: number) => boolean;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        const exists = get().cartItems.some((i) => i.id === item.id);
        if (exists) return;

        set({
          cartItems: [...get().cartItems, item],
        });
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((i) => i.id !== id),
        });
      },

      clearCart: () => set({ cartItems: [] }),

      isInCart: (id) => {
        return get().cartItems.some((i) => i.id === id);
      },

      totalPrice: () => {
        return get().cartItems.reduce((t, i) => t + i.price, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
