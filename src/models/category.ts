import type { Statuses } from "@/common/enums/statuses";

export interface ICategoryResponse {
  id: number;
  name: string;
  description: string;
  hotelId:number;
  status: keyof typeof Statuses;
}
