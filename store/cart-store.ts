import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { couponClientService } from "@/services/coupons/coupon.client";

type CartState = {
  cartItems: CartItem[];

  autoCoupon: string | null;
  manualCoupon: string | null;

  autoDiscount: number;
  manualDiscount: number;

  finalAmount: number;

  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  isInCart: (id: number) => boolean;
  totalPrice: () => number;

  applyAutoCoupon: () => Promise<void>;
  applyManualCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;

  recalculateTotal: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      autoCoupon: null,
      manualCoupon: null,

      autoDiscount: 0,
      manualDiscount: 0,

      finalAmount: 0,

      // =========================
      // 🛒 CART
      // =========================

      addToCart: (item) => {
        const exists = get().cartItems.some((i) => i.id === item.id);
        if (exists) return;

        set({
          cartItems: [...get().cartItems, item],
        });

        get().applyAutoCoupon();
      },

      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((i) => i.id !== id),
        });

        get().applyAutoCoupon();
      },

      clearCart: () =>
        set({
          cartItems: [],
          autoCoupon: null,
          manualCoupon: null,
          autoDiscount: 0,
          manualDiscount: 0,
          finalAmount: 0,
        }),

      isInCart: (id) => {
        return get().cartItems.some((i) => i.id === id);
      },

      totalPrice: () => {
        return get().cartItems.reduce((t, i) => t + i.price, 0);
      },

      // =========================
      // 🎯 AUTO APPLY
      // =========================

      applyAutoCoupon: async () => {
        const { cartItems } = get();

        if (!cartItems.length) {
          set({
            autoCoupon: null,
            autoDiscount: 0,
            finalAmount: 0,
          });
          return;
        }

        const cartTotal = cartItems.reduce((t, i) => t + i.price, 0);
        const courseIds = cartItems.map((i) => i.id);

        try {
          const res = await couponClientService.autoApplyCoupon({
            cartTotal,
            courseIds,
          });

          const data = res.data;

          if (!data) {
            set({
              autoCoupon: null,
              autoDiscount: 0,
            });
          } else {
            set({
              autoCoupon: data.code,
              autoDiscount: data.discount,
            });
          }

          // 🔥 ALWAYS recalc
          get().recalculateTotal();
        } catch (e) {
          console.log("Auto coupon failed", e);

          set({
            autoCoupon: null,
            autoDiscount: 0,
          });

          get().recalculateTotal();
        }
      },

      // =========================
      // 🎯 MANUAL APPLY
      // =========================

      applyManualCoupon: async (code: string) => {
        const { cartItems, autoDiscount } = get();

        if (!cartItems.length) return;

        const cartTotal = cartItems.reduce((t, i) => t + i.price, 0);
        const courseIds = cartItems.map((i) => i.id);

        // 🔥 IMPORTANT: apply after auto
        const base = cartTotal - autoDiscount;

        try {
          const res = await couponClientService.applyCoupon({
            code,
            cartTotal: base,
            courseIds,
          });

          const data = res.data;

          if (!data) throw new Error("Invalid coupon");

          set({
            manualCoupon: data.code,
            manualDiscount: data.discount,
          });

          // 🔥 ALWAYS recalc
          get().recalculateTotal();
        } catch (e) {
          console.log("Manual coupon failed", e);
          throw e;
        }
      },

      // =========================
      // ❌ REMOVE COUPON
      // =========================

      removeCoupon: async () => {
        set({
          manualCoupon: null,
          manualDiscount: 0,
        });

        get().recalculateTotal();
      },

      // =========================
      // 🧮 FINAL CALCULATION
      // =========================

      recalculateTotal: () => {
        const { cartItems, autoDiscount, manualDiscount } = get();

        const original = cartItems.reduce((t, i) => t + i.price, 0);

        const totalDiscount = autoDiscount + manualDiscount;

        const finalAmount = Math.max(original - totalDiscount, 0);

        set({
          finalAmount,
        });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
