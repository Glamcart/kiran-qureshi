import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product, ProductCategory } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
  onNavigateDetail: (product: Product) => void;
  onViewAll: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onOpenQuickView,
  onNavigateDetail,
  onViewAll
}) => {
  const [filter, setFilter] = useState<'all' | 'new' | 'bestseller' | ProductCategory>('all');

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'new') return p.isNewArrival;
    if (filter === 'bestseller') return p.isBestseller;
    return p.category === filter;
  });

  return (
    <section aria-labelledby="featured-finds-heading" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-[#EDE2E9]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#A62970] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
            <span>Curated Selection</span>
          </div>
          <h2 id="featured-finds-heading" className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#38203F]">
            Featured Beauty <span className="italic text-[#A62970]">Finds</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#777078] mt-1.5">
            Thoughtfully selected essentials for your everyday glow.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All Finds' },
            { id: 'bestseller', label: 'Bestsellers' },
            { id: 'new', label: 'New In' },
            { id: 'Lips', label: 'Lips' },
            { id: 'Face', label: 'Face' },
            { id: 'Skincare', label: 'Skincare' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#A62970] text-white shadow-xs'
                  : 'bg-white text-[#777078] hover:text-[#38203F] border border-[#EDE2E9] hover:bg-[#FCF4F7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Column Grid on Desktop, 3-col on Tablet, 2-col on Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {filteredProducts.slice(0, 10).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenQuickView={onOpenQuickView}
            onNavigateDetail={onNavigateDetail}
          />
        ))}
      </div>

      {/* View All CTA */}
      <div className="text-center mt-10">
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#A62970] text-xs font-semibold uppercase tracking-wider text-[#A62970] hover:bg-[#A62970] hover:text-white transition-all shadow-xs hover:shadow cursor-pointer"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
