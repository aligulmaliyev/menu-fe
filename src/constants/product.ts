export const TEMPERATURE_OPTIONS: Record<string, string>[] = [
  { label: "İsti", value: "hot" },
  { label: "Soyuq", value: "cold" },
  { label: "Otaq temperaturu", value: "room" },
] as const;

export const SIZE_OPTIONS: Record<string, string>[] = [
  { label: "Kiçik", value: "Kiçik" },
  { label: "Orta", value: "Orta" },
  { label: "Böyük", value: "Böyük" },
] as const;

export const AVAILABILITY_OPTIONS: Record<string, string>[] = [
  { label: "Səhər", value: "breakfast" },
  { label: "Nahar", value: "lunch" },
  { label: "Axşam", value: "dinner" },
  { label: "Bütün gün", value: "all-day" },
] as const;

export const defaultValues = {
  addons: [
    {
      name: "",
      price: "",
    },
  ],
  ingredients: [
    {
      name: "",
    },
  ],
};
