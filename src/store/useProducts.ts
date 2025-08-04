/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/common/api/axiosInstance";
import { endpoints } from "@/common/api/endpoints";
import type {
  IProductListResponse,
  ISingleProductResponse,
} from "@/models/product";
import { toast } from "sonner";
import { create } from "zustand";
import { type IQRData } from "./useQRData";
import { QR_DATA } from "@/constants";

type TProductStore = {
  products: IProductListResponse[];
  product: ISingleProductResponse | null;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (
    productId: number
  ) => Promise<ISingleProductResponse | null>;
};

export const useProductsStore = create<TProductStore>()((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  fetchProducts: async () => {
    try {
      const qrData = JSON.parse(localStorage.getItem(QR_DATA) || "") as IQRData;
      set({ loading: true, error: null });
      const response = await api.get(
        `${endpoints.products.getAll}/${qrData.hotelId}`
      );
      set({ products: response.data });
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast.error("Yemək siyahısı alınmadı: " + error.message);
    } finally {
      set({ loading: false });
    }
  },
  fetchProductById: async (productId: number) => {
    try {
      const qrData = JSON.parse(localStorage.getItem(QR_DATA) || "") as IQRData;
      set({ loading: true, error: null });
      const response = await api.get(
        endpoints.products.getById(productId, qrData.hotelId)
      );
      set({ product: response.data });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching product by ID:", error);
      toast.error("Yemək məlumatları alınmadı: " + error.message);
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
