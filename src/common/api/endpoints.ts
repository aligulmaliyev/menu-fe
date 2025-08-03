export const endpoints = {
  products: {
    getAll: "/products",
    create: "/products",
    getById: (id: number, hotelId: number) =>
      `/products/${id}/hotel/${hotelId}`,
    update: (id: number) => `/products/${id}`,
    delete: (id: number) => `/products/${id}`,
  },
  categories: {
    create: "/categories",
    getAll: "/categories",
    getById: (id: number) => `/categories/${id}`,
    update: (id: number) => `/categories/${id}`,
    delete: (id: number) => `/categories/${id}`,
  },
} as const;

export type Endpoints = typeof endpoints;
