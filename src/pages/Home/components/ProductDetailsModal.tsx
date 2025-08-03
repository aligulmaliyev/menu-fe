import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ChefHat } from "lucide-react";
import { useModalStore } from "@/store/useModal";
import { useProductsStore } from "@/store/useProducts";
import { useEffect } from "react";
import type { IBaseProductItem } from "@/models/product";
import { useCartStore } from "@/store/useCart";
import type { ICartItem, ISpicy } from "@/models/cart";
import { DialogDescription } from "@radix-ui/react-dialog";

export const ProductDetailsModal = () => {
  const { isProductPopupOpen, setIsProductPopupOpen, productId, itemOptions, setItemOptions } = useModalStore();
  const {
    setEditingCartItem,
    calculateItemPrice,
    updateCartItem,
    editingCartItem,
    cart,
    changeCartQuantity,
    addToCart } = useCartStore()
  const { fetchProductById, product } = useProductsStore()

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, itemOptions);
  };

  useEffect(() => {
    if (productId)
      fetchProductById(productId)
  }, [productId])

  useEffect(() => {
    const isExistingCart = cart.find(cartItem => cartItem.product.id === productId);
    if (isExistingCart) setEditingCartItem(isExistingCart)
  }, [cart])

  return (
    <Dialog open={isProductPopupOpen} onOpenChange={setIsProductPopupOpen}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            {product?.name}
            {editingCartItem && <Badge variant="secondary">Redaktə</Badge>}
          </DialogTitle>
          <DialogDescription>{product?.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 overflow-x-auto">
          <div className="space-y-4">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            {/* Detailed Description */}
            {product?.description && (
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Təfərrüatlı Məlumat
                </Label>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {product?.detailedDescription ? product?.detailedDescription : product?.description}
                </p>
              </div>
            )}

            {/* Ingredients */}
            {product?.ingredients && (
              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Tərkib
                </Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {product?.ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Quantity Control for Cart Items */}
            {editingCartItem && (
              <div>
                <Label>Miqdar</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => changeCartQuantity(editingCartItem.product.id, 'decrease')}
                    disabled={cart.find(item => item.product.id === editingCartItem.product.id)!.quantity <= 1}
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-medium text-lg w-8 text-center">
                    {cart.find(item => item.product.id === editingCartItem.product.id)!.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => changeCartQuantity(editingCartItem.product.id, 'increase')}
                    className="h-8 w-8 p-0 bg-transparent"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {product?.isSpicy && (
              <div>
                <Label>Acılıq Səviyyəsi</Label>
                <RadioGroup
                  value={itemOptions.spicy}
                  onValueChange={(value: ISpicy) =>
                    setItemOptions({ ...itemOptions, spicy: value })
                  }
                  className="mt-2"
                >
                  <div
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={'spicy'} id={'spicy'} />
                    <Label htmlFor='spicy'>Acılı</Label>
                  </div>
                  <div
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={'non-spicy'} id={'non-spicy'} />
                    <Label htmlFor='non-spicy '>Acısız</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {product?.sizes && (
              <div>
                <Label>Ölçü</Label>
                <RadioGroup
                  value={itemOptions?.size?.id?.toString()}
                  onValueChange={(value: string) => {
                    const selectedSize = product.sizes.find(size => size.id === Number(value))!;
                    setItemOptions({ ...itemOptions, size: selectedSize })
                  }
                  }
                  className="mt-2"
                >
                  {product.sizes?.map((size: IBaseProductItem) => (
                    <div key={size.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={size.id?.toString()} id={size.id?.toString()} />
                      <Label htmlFor={size.id?.toString()}>
                        {`${size.name}(+${size.price}₼)`}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {product?.addons && (
              <div>
                <Label>Əlavələr (+1.5₼ hər biri)</Label>
                <div className="mt-2 space-y-2">
                  {product.addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={addon.id?.toString()}
                        checked={itemOptions.addons?.some(a => a.id === addon.id)}
                        onCheckedChange={(checked) => {
                          const currentaddons = itemOptions.addons || [];
                          if (checked) {
                            setItemOptions({
                              ...itemOptions,
                              addons: [...currentaddons, addon],
                            });
                          } else {
                            setItemOptions({
                              ...itemOptions,
                              addons: currentaddons.filter(
                                (e) => e.id !== addon.id
                              ),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={addon.id?.toString()}> {`${addon.name}(+${addon.price}₼)`}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="comment">Aşbaza Qeyd</Label>
              <Textarea
                id="comment"
                value={itemOptions.comment || ""}
                onChange={(e) =>
                  setItemOptions({
                    ...itemOptions,
                    comment: e.target.value,
                  })
                }
                placeholder="Xüsusi istəklərinizi yazın..."
                className="mt-1"
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <ChefHat className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-600">
                Aşbazımız qeydlərinizi nəzərə alacaq
              </span>
            </div>
          </div>
        </ScrollArea>
        <div className="flex-shrink-0 pt-4 border-t">
          {editingCartItem ? (
            <Button onClick={() => {
              updateCartItem(productId!, itemOptions)
              setIsProductPopupOpen(false)
            }
            } className="w-full">
              Dəyişiklikləri Yadda Saxla -{" "}
              {calculateItemPrice({
                ...itemOptions,
                product,
              } as ICartItem)?.toFixed(2)} ₼
            </Button>
          ) : (
            <Button onClick={handleAddToCart} className="w-full">
              Səbətə Əlavə Et -
              {calculateItemPrice({
                ...itemOptions,
                product,
              } as ICartItem)?.toFixed(2)} ₼
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
