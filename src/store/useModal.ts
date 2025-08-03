import type { IBaseCartOptions } from "@/models/cart";
import { create } from "zustand";

interface IModalStore {
  // Product popup
  isProductPopupOpen: boolean;
  productId: number | null;
  setIsProductPopupOpen: (open: boolean) => void;
  setProductId: (productId: number) => void;
  itemOptions: IBaseCartOptions;
  setItemOptions: (options: IBaseCartOptions) => void;

  // Cart popup
  isCartPopupOpen: boolean;
  setIsCartPopupOpen: (open: boolean) => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  // Product popup
  isProductPopupOpen: false,
  productId: null,
  setIsProductPopupOpen: (open) => set({ isProductPopupOpen: open }),
  setProductId: (productId) => set({ productId }),
  itemOptions: {} as IBaseCartOptions,
  setItemOptions: (options) => set({ itemOptions: options }),

  // Cart popup
  isCartPopupOpen: false,
  setIsCartPopupOpen: (open) => set({ isCartPopupOpen: open }),
}));
