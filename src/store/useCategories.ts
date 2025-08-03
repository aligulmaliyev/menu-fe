/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/common/api/axiosInstance";
import { endpoints } from "@/common/api/endpoints";
import type { ICategoryResponse } from "@/models/category";
import { toast } from "sonner";
import { create } from "zustand";

type TCategoryStore = {
  categories: ICategoryResponse[];
  selectedCategory: number | null;
  loading: boolean;
  error: string | null;
  setSelectedCategory: (id: number) => void;
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (categoryId: number) => Promise<ICategoryResponse | null>;
};

export const useCategoriesStore = create<TCategoryStore>()((set) => ({
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  setSelectedCategory: (selectedCategory) => {
    set({ selectedCategory });
  },
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(`${endpoints.categories.getAll}/1`);
      set({ categories: response.data });
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      toast.error("Kategorya siyahısı alınmadı: " + error.message);
    } finally {
      set({ loading: false });
    }
  },
  fetchCategoryById: async (categoryId: number) => {
    try {
      set({ loading: true, error: null });
      const response = await api.get(endpoints.categories.getById(categoryId));
      return response.data;
    } catch (error: any) {
      console.error("Error fetching category by ID:", error);
      toast.error("Kategorya məlumatları alınmadı: " + error.message);
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
