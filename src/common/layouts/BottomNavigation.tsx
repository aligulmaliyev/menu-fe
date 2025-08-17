import { Badge } from "@/components/ui/badge";
import { navigation } from "@/constants/navigation";
import { useQrId } from "@/hooks/useQrId";
import { useCartStore } from "@/store/useCart";
import { useLocation, useNavigate } from "react-router";

export default function Bottomnavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getTotalItems } = useCartStore();
  const id = useQrId()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="grid grid-cols-4 gap-1">
        {navigation.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(`${item.path}?id=${id}`)}
              className={`flex flex-col items-center py-2 px-1 transition-colors relative ${active ? "text-[#4EA36C]" : "text-gray-400"
                }`}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.id === "cart" && getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
