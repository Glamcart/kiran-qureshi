import React from 'react';
import { categories } from '../data/categories';
import { ProductCategory } from '../types';

interface CategorySectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <section aria-labelledby="category-heading" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Centered Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 id="category-heading" className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#38203F] tracking-tight">
          Shop by <span className="text-[#A62970] italic">Category</span>
        </h2>
        
        {/* Short Subtle Berry Underline */}
        <div className="w-12 h-0.5 bg-[#A62970] mx-auto mt-2.5 rounded-full" />
        <p className="text-xs sm:text-sm text-[#777078] mt-2 max-w-md mx-auto">
          Explore thoughtfully formulated beauty rituals designed for your daily routine.
        </p>
      </div>

      {/* 7 Circular Category Items */}
      <div className="flex items-center justify-start md:justify-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 pt-1 px-2 scrollbar-none snap-x">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none snap-center transition-transform hover:-translate-y-1"
            >
              {/* Circular Container with pale blush background */}
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full p-1.5 transition-all duration-300 ${
                  isActive
                    ? 'ring-2 ring-[#A62970] ring-offset-2 ring-offset-[#FFF9F4] shadow-md scale-105'
                    : 'border border-[#EDE2E9] group-hover:border-[#A62970]/50 group-hover:shadow-md'
                } bg-[#F8EAF1] flex items-center justify-center overflow-hidden`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-112 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Label */}
              <span
                className={`mt-3 text-xs sm:text-sm font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'text-[#A62970]'
                    : 'text-[#242026] group-hover:text-[#A62970]'
                }`}
              >
                {cat.name}
              </span>

              {/* Item count tag */}
              <span className="text-[11px] text-[#777078] font-normal">
                {cat.itemCount} items
              </span>
            </button>
          );
        })}
      </div>

    </section>
  );
};
