import { Home, ShoppingCart, Settings, MessageSquare } from "lucide-react";

export const navigation = [
  {
    id: "menu",
    label: "Menyu",
    icon: Home,
    path: "/",
  },
  {
    id: "cart",
    label: "Səbət",
    icon: ShoppingCart,
    path: "/cart",
  },
  {
    id: "services",
    label: "Xidmətlər",
    icon: Settings,
    path: "/services",
  },
  {
    id: "feedback",
    label: "Rəy",
    icon: MessageSquare,
    path: "/feedback",
  },
];
