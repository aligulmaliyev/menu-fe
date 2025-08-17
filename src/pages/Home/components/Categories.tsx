import { useCategoriesStore } from "@/store/useCategories";
import { useEffect, useRef } from "react";

export const Categories = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { categories, selectedCategory, fetchCategories, setSelectedCategory } = useCategoriesStore()

    useEffect(() => {
        if (scrollRef.current) {
            const activeButton = scrollRef.current.querySelector(
                `[data-category="${selectedCategory}"]`
            ) as HTMLElement;
            if (activeButton) {
                activeButton.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                });
            }
        }
    }, [selectedCategory]);

    useEffect(()=>{
        fetchCategories()
    },[])
    
    return (
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3">
            <div className="relative">
                <div className="text-xs text-gray-400 mb-2 text-center">
                    ← Sürüşdürün →
                </div>
                <div
                    ref={scrollRef}
                    className="flex gap-2 pb-2 overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {categories.map((category) => {
                        return (
                            <button
                                key={category.id}
                                data-category={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${selectedCategory === category.id
                                    ? "bg-[#4EA36C] text-white shadow-md scale-105"
                                    : "bg-white text-gray-600 border hover:bg-gray-50"
                                    }`}
                            >
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
