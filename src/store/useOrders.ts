import api from "@/common/api/axiosInstance";
import { toast } from "sonner";
import { create } from "zustand";

export interface IOrderItem {
  hotelId: number;
  roomId: number;
  items: [
    {
      productId: number;
      quantity: number;
      note: string;
      addonIds: number[];
    }
  ];
}

type TOrderStore = {
  order: IOrderItem | null;
  loading: boolean;
  error: string | null;
  createOrder: (order: IOrderItem) => Promise<void>;
};

export const useOrdersStore = create<TOrderStore>()((set) => ({
  order: null,
  loading: false,
  error: null,
  createOrder: async (order: IOrderItem) => {
    try {
      set({ loading: true, error: null });
      await api.post(`/orders`, order);
      toast.success("Sifariş uğurla təsdiqləndi.");
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      toast.error("Sifariş uğursuz oldu. Zəhmət olmasa yenidən sınayın.");
    } finally {
      set({ loading: false });
    }
  },
}));
