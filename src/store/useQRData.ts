import api from "@/common/api/axiosInstance";
import { QR_DATA } from "@/constants";
import { toast } from "sonner";
import { create } from "zustand";

export interface IQRData {
  id: string;
  hotelId: number;
  roomId: number;
  hotelName: string;
}

interface IQRDataStore {
  qrData: IQRData | null;
  setQrData: (qrData: IQRData) => void;
  fetchQrData: (id: string) => Promise<void>;
}

export const useQRDataStore = create<IQRDataStore>((set) => ({
  qrData: null,
  setQrData: (qrData: IQRData) => set({ qrData }),
  fetchQrData: async (id: string) => {
    try {
      const response = await api.get(`/qr-codes/${id}`);
      if (response?.data) {
        set({ qrData: response.data });
        localStorage.setItem(QR_DATA, JSON.stringify(response.data));
      }
    } catch (error: any) {
      toast.error("Xəta baş verdi: " + error.message);
      throw error;
    }
  },
}));
