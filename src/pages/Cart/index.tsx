import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { IBaseCartOptions, ICartItem, ISpicy } from "@/models/cart";
import { useCartStore } from "@/store/useCart";
import { useModalStore } from "@/store/useModal";
import { ShoppingCart, Plus, Minus, Edit3, X } from "lucide-react";
import { useNavigate } from "react-router";
import { ProductDetailsModal } from "../Home/components/ProductDetailsModal";
import { useOrdersStore, type IOrderItem } from "@/store/useOrders";
import { QR_DATA } from "@/constants";
import type { IQRData } from "@/store/useQRData";

export const Cart = () => {
  const navigate = useNavigate();
  const { createOrder } = useOrdersStore()

  const {
    cart,
    changeCartQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    calculateItemPrice,
    setEditingCartItem,
    clearCart
  } = useCartStore();

  const { setItemOptions, setIsProductPopupOpen, isProductPopupOpen, setProductId } =
    useModalStore();

  const openCartItemDetails = (cartItem: ICartItem) => {
    setEditingCartItem(cartItem);
    setIsProductPopupOpen(true)
    setProductId(cartItem.product.id)
    setItemOptions({
      spicy: cartItem?.spicy as ISpicy,
      size: cartItem?.size,
      addons: cartItem.addons || [],
      comment: cartItem?.comment || "",
    } as IBaseCartOptions)
  };

  const handleOrder = async () => {
    const qrData = JSON.parse(localStorage.getItem(QR_DATA) || '') as IQRData
    const products = cart.map((cartItem: ICartItem) => {
      const { product, addons, comment, quantity, size, spicy } = cartItem
      const addonIds = addons.map(addon => addon.id)
      return {
        productId: product.id,
        quantity: quantity,
        note: comment,
        addonIds,
        size: size.id,
        spicy
      }
    })
    const requestModel = {
      hotelId: qrData.hotelId,
      roomId: qrData.roomId,
      items: products,
    } as unknown as IOrderItem

    await createOrder(requestModel)
    clearCart()
  }

  return (
    <>
      {isProductPopupOpen && <ProductDetailsModal />}
      <div className="pb-20 px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sifarişləriniz</h2>
          <p className="text-gray-600">
            {cart.length === 0
              ? "Səbət boşdur"
              : `${getTotalItems()} məhsul seçildi`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Səbət boşdur</p>
              <p className="text-sm text-gray-400 mt-1">
                Məhsul əlavə etmək üçün menyu baxın
              </p>
              <Button onClick={() => navigate("/")} className="mt-4">
                Menyuya Qayıt
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <Card key={`${item.product.id}-${index}`} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.product.description}
                        </p>
                        <div className="mt-2 space-y-1">
                          {item.spicy && (
                            <p className="text-xs text-gray-500">
                              Acılıq: {item.spicy == 'spicy' ? "Acılı" : "Acısız"}
                            </p>
                          )}
                          {item.size && (
                            <p className="text-xs text-gray-500">
                              Ölçü: {item.size.name}
                            </p>
                          )}
                          {item.addons &&
                            item.addons.length > 0 && (
                              <p className="text-xs text-gray-500">
                                Əlavələr:
                                {item.addons.map(addon => addon.name).join(", ")}
                              </p>
                            )}
                          {item.comment && (
                            <p className="text-xs text-gray-500">
                              Qeyd: {item.comment}
                            </p>
                          )}
                        </div>
                        <p className="text-lg font-semibold text-orange-600 mt-2">
                          {calculateItemPrice(item).toFixed(
                            2
                          )}
                          ₼
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openCartItemDetails(item)}
                          className="h-8 w-8 p-0 text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => changeCartQuantity(item.product.id, 'decrease')}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium text-lg w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => changeCartQuantity(item.product.id, 'increase')}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {(
                            calculateItemPrice(item) *
                            item.quantity
                          ).toFixed(2)}
                          ₼
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Cəmi:</span>
                <span className="text-2xl font-bold text-orange-600">
                  {getTotalPrice().toFixed(2)} ₼
                </span>
              </div>
              <Button
                onClick={handleOrder}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                Sifariş Ver
              </Button>
            </div>
          </>
        )}
      </div></>
  );
}
