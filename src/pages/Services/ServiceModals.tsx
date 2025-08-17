import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Car, MapPin, Shirt } from "lucide-react";
import { useServiceStore } from "@/store/useServiceStore";

export default function ServiceModals() {
  const {
    waiterCallConfirm,
    showLaundryModal,
    showTaxiModal,
    showCleaningModal,
    setWaiterCallConfirm,
    confirmWaiterCall,
    setShowTaxiModal,
    setShowCleaningModal,
    setShowLaundryModal,
  } = useServiceStore();

  return (
    <>
      {/* Waiter Call Confirmation Modal */}
      {waiterCallConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <Bell className="h-16 w-16 text-[#4EA36C] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Ofsiant Çağır</h3>
              <p className="text-gray-600 mb-6">
                Ofsiantun otağınıza gəlməsini istəyirsiniz?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setWaiterCallConfirm(false)}
                  className="flex-1"
                >
                  Ləğv Et
                </Button>
                <Button
                  onClick={confirmWaiterCall}
                  className="flex-1 bg-[#4EA36C] hover:bg-[#3E8656]"
                >
                  Bəli, Çağır
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Taxi Modal */}
      {showTaxiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <Car className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Taksi Çağır</h3>
              <p className="text-gray-600 mb-6">
                Taksi sifariş etmək istəyirsiniz?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTaxiModal(false)}
                  className="flex-1"
                >
                  Ləğv Et
                </Button>
                <Button
                  onClick={() => {
                    setShowTaxiModal(false);
                    alert("Taksi çağırıldı! 5-10 dəqiqə ərzində gələcək.");
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Bəli, Çağır
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Cleaning Modal */}
      {showCleaningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Təmizlik Xidməti</h3>
              <p className="text-gray-600 mb-6">
                Otağınızın təmizlənməsini istəyirsiniz?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCleaningModal(false)}
                  className="flex-1"
                >
                  Ləğv Et
                </Button>
                <Button
                  onClick={() => {
                    setShowCleaningModal(false);
                    alert("Təmizlik işçisi otağınıza yaxınlaşır.");
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  Bəli, Çağır
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Laundry Modal */}
      {showLaundryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <Shirt className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Camaşırxana Xidməti</h3>
              <p className="text-gray-600 mb-6">
                Camaşır yuma xidməti istəyirsiniz?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLaundryModal(false)}
                  className="flex-1"
                >
                  Ləğv Et
                </Button>
                <Button
                  onClick={() => {
                    setShowLaundryModal(false);
                    alert("Camaşırxana işçisi otağınıza yaxınlaşır.");
                  }}
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                >
                  Bəli, Çağır
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
