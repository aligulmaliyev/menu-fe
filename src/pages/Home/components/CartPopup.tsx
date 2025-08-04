/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QR_DATA } from "@/constants";
import type { IBaseCartOptions, ICartItem, ISpicy } from "@/models/cart";
import { useCartStore } from "@/store/useCart";
import { useModalStore } from "@/store/useModal";
import { useOrdersStore, type IOrderItem } from "@/store/useOrders";
import type { IQRData } from "@/store/useQRData";
import { ShoppingCart, Plus, Minus, Edit3 } from "lucide-react";

export const CartPopup = () => {
  const { createOrder } = useOrdersStore();
  const {
    isCartPopupOpen,
    setIsCartPopupOpen,
    setIsProductPopupOpen,
    itemOptions,
    setProductId,
    setItemOptions,
  } = useModalStore();

  const {
    cart,
    changeCartQuantity,
    getTotalPrice,
    getTotalItems,
    calculateItemPrice,
    setEditingCartItem,
    clearCart
  } = useCartStore();


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
      const { product, addons, comment, quantity,
        size, spicy 
      } = cartItem
      const addonIds = addons.map(addon => addon.id)
      return {
        productId: product.id,
        quantity: quantity,
        note: comment,
        addonIds,
        size:size.id,
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
    setIsCartPopupOpen(false);
  }

  return (
    <Sheet open={isCartPopupOpen} onOpenChange={setIsCartPopupOpen}>
      <SheetContent side="bottom" className="max-h-10/12">
        <SheetHeader>
          <SheetTitle>Səbətiniz</SheetTitle>
          <SheetDescription>{getTotalItems()} məhsul seçildi</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full overflow-x-auto p-4 pt-0">
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto" />
                <p className="text-gray-500">Səbət boşdur</p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 overflow-x-auto">
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <Card key={`${item.product.id}-${index}`} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.quantity}x{" "}
                            {calculateItemPrice({
                              ...itemOptions,
                              product: item.product,
                            } as ICartItem)?.toFixed(2)} ₼
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openCartItemDetails(item)}
                            className="h-8 w-8 p-0 text-orange-600 border-orange-200"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={item.quantity <= 1}
                            onClick={() => changeCartQuantity(item.product.id, 'decrease')}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => changeCartQuantity(item.product.id, 'increase')}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Cəmi:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {getTotalPrice().toFixed(2)} ₼
                  </span>
                </div>
                <Button
                  onClick={() => {
                    handleOrder()
                  }}
                  className="w-full h-12 text-lg font-semibold"
                >
                  Sifariş Ver
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
