import { create } from "zustand";
import type { ISingleProductResponse } from "@/models/product";
import type { IBaseCartOptions, ICartItem } from "@/models/cart";

interface CartStore {
  cart: ICartItem[];
  editingCartItem: ICartItem | null;
  setEditingCartItem: (editingItem: ICartItem) => void;
  addToCart: (
    product: ISingleProductResponse,
    options?: IBaseCartOptions
  ) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, options: IBaseCartOptions) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  calculateItemPrice: (item: ICartItem) => number;
  changeCartQuantity: (
    productId: number,
    action: "increase" | "decrease"
  ) => void;
}

export const useCartStore = create<CartStore>()(
    (set, get) => ({
      cart: [],
      editingCartItem: null,
      setEditingCartItem: (editingItem) =>
        set({ editingCartItem: editingItem }),
      addToCart: (
        product: ISingleProductResponse,
        options?: IBaseCartOptions
      ) => {
        console.log({ product, options });
        const defaultOptions = {
          spicy: "non-spicy",
          size: product.sizes?.[0] || null,
          addons: [],
          comment: "",
        } as IBaseCartOptions;

        const cartOptions =
          Object.keys(options as {} || {}).length === 0 ? defaultOptions : options;

 
        const cartItem = {
          product: product,
          quantity: 1,
          ...cartOptions,
        } as ICartItem;
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );
          if (existingItemIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingItemIndex] = {
              ...newCart[existingItemIndex],
              ...cartItem,
              quantity: newCart[existingItemIndex].quantity + 1,
            };
            return { cart: newCart };
          } else {
            return { cart: [...state.cart, cartItem] };
          }
        });
      },
      removeFromCart: (productId) => {
        set((state) => {
          const newCart = state.cart.filter(
            (item) => item.product.id !== productId
          );
          return { cart: newCart };
        });
      },

      updateCartItem: (productId, options) => {
        set((state) => {
          const newCart = [...state.cart];
          const targetIndex = newCart.findIndex(
            (item) => item.product.id == productId
          );
          newCart[targetIndex] = {
            ...newCart[targetIndex],
            ...options,
          };
          return { cart: newCart };
        });
      },

      changeCartQuantity: (productId: number, action) => {
        set((state) => {
          const newCart = [...state.cart];
          const targetIndex = newCart.findIndex(
            (item) => item.product.id == productId
          );

          newCart[targetIndex] = {
            ...newCart[targetIndex],
            quantity:
              action === "increase"
                ? newCart[targetIndex].quantity + 1
                : newCart[targetIndex].quantity - 1,
          } as ICartItem;
          return { cart: newCart };
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        const { cart, calculateItemPrice } = get();

        return cart.reduce((total, item) => {
          const itemPrice = calculateItemPrice(item);
          return total + itemPrice * item.quantity;
        }, 0);
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      calculateItemPrice: (item) => {
        let price = item.product?.price;
        if (item?.size) price += item.size.price;
        if (item?.addons) {
          for (let i = 0; i < item.addons.length; i++) {
            price += item.addons[i].price;
          }
        }
        return price;
      },
    }),
);
