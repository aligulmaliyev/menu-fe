import { Card } from "@/components/ui/card";
import { useServiceStore } from "@/store/useServiceStore";
import { Bell, Wifi, Car, Shirt, MapPin, Clock } from "lucide-react";

export interface Service {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
}
export const Services = () => {
  const {
    callWaiter,
    setShowTaxiModal,
    setShowLaundryModal,
    setShowCleaningModal,
  } = useServiceStore();

  const services: Service[] = [
    {
      id: "waiter",
      name: "Ofsiant Çağır",
      description: "Ofsiant otağınıza gələcək",
      icon: Bell,
      action: callWaiter,
    },
    {
      id: "wifi",
      name: "WiFi Məlumatı",
      description: "Şifrə: Hotel2024",
      icon: Wifi,
      action: () => alert("WiFi Şəbəkəsi: HotelGuest\nŞifrə: Hotel2024"),
    },
    {
      id: "taxi",
      name: "Taksi Çağır",
      description: "Taksi sifariş et",
      icon: Car,
      action: () => setShowTaxiModal(true),
    },
    {
      id: "laundry",
      name: "Camaşırxana",
      description: "Camaşır yuma xidməti",
      icon: Shirt,
      action: () => setShowLaundryModal(true),
    },
    {
      id: "cleaning",
      name: "Təmizlik",
      description: "Otaq təmizliyi",
      icon: MapPin,
      action: () => setShowCleaningModal(true),
    },
    {
      id: "checkout",
      name: "Check-out",
      description: "Oteldən çıxış",
      icon: Clock,
      action: () => alert("Check-out vaxtı: 12:00. Resepsiyaya müraciət edin."),
    },
  ];

  return (
    <>
      <div className="pb-20 px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Xidmətlər</h2>
          <p className="text-gray-600">Hotel xidmətləri və köməkçi funksiyalar</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={service.action}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#e1f7e1]-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="h-6 w-6 text-[#3E8656]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div></>
  );
}
