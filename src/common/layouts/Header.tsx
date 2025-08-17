import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { useLocation } from "react-router";
import { useCartStore } from "@/store/useCart";
import { useServiceStore } from "@/store/useServiceStore";
import { QR_DATA } from "@/constants";
import { useLayoutEffect } from "react";
import type { IQRData } from "@/store/useQRData";

export default function Header() {
  const { getTotalItems } = useCartStore()
  const { callWaiter } = useServiceStore()
  const { pathname } = useLocation();
  const qrData = JSON.parse(localStorage.getItem(QR_DATA) || "{}") as IQRData;

  useLayoutEffect(() => {
    document.title = qrData?.hotelName || "QR Inn"
  }, [])

  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{qrData?.hotelName || "QR Inn"}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={callWaiter}
              variant="outline"
              size="sm"
              className="h-10 px-3 bg-transparent"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Ofsiant</span>
            </Button>
            {pathname === "/cart" && getTotalItems() > 0 && (
              <Badge className="bg-[#4EA36C]">{getTotalItems()} məhsul</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
