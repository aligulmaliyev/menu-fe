import type { IBaseProductItem, ISingleProductResponse } from "./product";

export interface ICartItem extends IBaseCartOptions {
  product: ISingleProductResponse;
  quantity: number;
}

export type ISpicy =  "spicy" | "non-spicy";

export interface IBaseCartOptions {
  spicy: ISpicy;
  size: IBaseProductItem;
  addons: IBaseProductItem[];
  comment: string;
}
