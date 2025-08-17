import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Info } from "lucide-react";
import { Categories } from "./components/Categories";
import { useProductsStore } from "@/store/useProducts";
import { useEffect, useMemo } from "react";
import { ProductDetailsModal } from "./components/ProductDetailsModal";
import { useModalStore } from "@/store/useModal";
import { useCartStore } from "@/store/useCart";
import type { ISingleProductResponse } from "@/models/product";
import { CartPopup } from "./components/CartPopup";
import { useCategoriesStore } from "@/store/useCategories";

export default function Home() {
    const { selectedCategory, categories } = useCategoriesStore()
    const { products, fetchProducts } = useProductsStore()
    const { setIsProductPopupOpen, isProductPopupOpen, isCartPopupOpen, setProductId, setIsCartPopupOpen } = useModalStore()
    const { addToCart, cart, getTotalItems, getTotalPrice } = useCartStore()


    const filteredProducts = useMemo(
        () =>
            products.filter((product) => {
                const categoryName = categories.find(category => category.id === selectedCategory)?.name || "all";
                return categoryName === "all" as any || product.categoryName === categoryName as any;
            }),
        [selectedCategory, products]
    );

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="pb-32">
            {isProductPopupOpen && <ProductDetailsModal />}
            {isCartPopupOpen && <CartPopup />}

            <Categories />

            {/* Menu Items */}
            <div className="px-4 py-6">
                <div className="space-y-4">
                    {filteredProducts?.map((product) => (
                        <Card
                            key={product.id}
                            className="overflow-hidden border-0 shadow-sm bg-white"
                        >
                            <div className="flex">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded-l-lg"
                                    />
                                </div>
                                <div className="flex-1 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                                            {product.name}
                                        </h3>
                                        <Badge
                                            variant="secondary"
                                            className="ml-2 text-lg font-bold text-[#3E8656] bg-[#dff6de]"
                                        >
                                            {product.price.toFixed(2)} ₼
                                        </Badge>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                        {product.description}
                                    </p>
                                    <div className="flex gap-1 mb-3">
                                        {product.isSpicy && (
                                            <Badge variant="outline" className="text-xs">
                                                Acılıq seçimi
                                            </Badge>
                                        )}
                                        {product.sizes && (
                                            <Badge variant="outline" className="text-xs">
                                                Ölçü seçimi
                                            </Badge>
                                        )}
                                        {product.addons && (
                                            <Badge variant="outline" className="text-xs">
                                                Əlavələr
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => addToCart(product as ISingleProductResponse)}
                                            className="flex-1 h-10 bg-[#4EA36C] hover:bg-[#3E8656] text-white font-medium"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Səbətə Əlavə Et
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsProductPopupOpen(true)
                                                setProductId(product.id)
                                            }}
                                            variant="outline"
                                            className="h-10 px-3 border-[#c0ecc0] text-[#3E8656] hover:bg-[#dff6de]"
                                        >
                                            <Info className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Floating Cart Button */}
            {cart.length > 0 && (
                <div className="fixed bottom-20 left-4 right-4 z-40">
                    <div
                        className="bg-gradient-to-r from-[#4EA36C] to-[#3E8656] rounded-2xl shadow-xl cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
                        onClick={() => setIsCartPopupOpen(true)}
                    >
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="bg-white bg-opacity-20 rounded-full p-2">
                                        <ShoppingCart className="h-5 w-5 text-white" />
                                    </div>
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                                        {getTotalItems()}
                                    </Badge>
                                </div>
                                <div className="text-white">
                                    <p className="font-semibold text-sm">Səbətiniz</p>
                                    <p className="text-xs opacity-90">{getTotalItems()} məhsul</p>
                                </div>
                            </div>
                            <div className="text-right text-white">
                                <p className="text-xl font-bold">
                                    {getTotalPrice().toFixed(2)} ₼
                                </p>
                                <p className="text-xs opacity-90">Görüntülə →</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
