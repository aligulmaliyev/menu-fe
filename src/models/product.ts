import { Statuses } from "@/common/enums/statuses";
import type {
  AVAILABILITY_OPTIONS,
  TEMPERATURE_OPTIONS,
} from "@/constants/product";

export interface IProductListResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  status: keyof typeof Statuses;
  availability: AvailabilityType;
  stock: number;
  categoryName: string;
  addons: IBaseProductItem[];
  imageUrl: string;
  isSpicy: boolean;
  sizes: IBaseProductItem[];
}

export interface IBaseProductItem {
  id: number;
  name: string;
  price: number;
}

export interface ISingleProductResponse extends IProductListResponse {
  sizes: IBaseProductItem[];
  weight: string;
  preparationTime: string;
  calories: string;
  temperature: TemperatureType;

  isSpicy: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isChefRecommendation: boolean;
  isNewItem: boolean;
  isPopular: boolean;
  ingredients: string[];
  addons: IBaseProductItem[];
  categoryId: number;
  detailedDescription: string;
}

export type TemperatureType = (typeof TEMPERATURE_OPTIONS)[number]["value"];
export type AvailabilityType = (typeof AVAILABILITY_OPTIONS)[number]["value"];
