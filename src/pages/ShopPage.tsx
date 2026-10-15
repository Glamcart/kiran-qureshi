import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductCategory } from '../types';
import { categories } from '../data/categories';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  initialCategory?: ProductCategory;
  initialSearch?: string;
  initialFilterType?: 'new' | 'bestseller';
  onOpenQuickView: (product: Product) => void;
  onNavigateDetail: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'All',
  initialSearch = '',
  initialFilterType,
  onOpenQuickView,
  onNavigateDetail
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [curationFilter, setCurationFilter] = useState<'all' | 'new' | 'bestseller'>(initialFilterType || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(80);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

        // Curation filter
        if (curationFilter === 'new' && !p.isNewArrival) return false;
        if (curationFilter === 'bestseller' && !p.isBestseller) return false;

        // Price filter
        if (p.price > maxPrice) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchDesc && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // featured default order
      });
  }, [products, selectedCategory, curationFilter, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setCurationFilter('all');
    setMaxPrice(80);
    setSortBy('featured');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#F8EAF1] via-[#FCF4F7] to-[#FFF9F4] p-6 sm:p-10 rounded-3xl border border-[#EDE2E9] mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A62970] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
            <span>Complete Collection</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#38203F] tracking-tight">
            The Beauty <span className="italic text-[#A62970]">Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#777078] mt-2 max-w-lg leading-relaxed">
            Formulated without compromise. Discover radiant pigments, barrier-loving skincare, and artisanal French fragrances.
          </p>
        </div>

        {/* Live Active Results Badge */}
        <div className="bg-white/90 backdrop-blur-xs px-5 py-3 rounded-2xl border border-[#EDE2E9] shadow-xs text-center shrink-0">
          <div className="text-2xl font-bold text-[#A62970] tabular-nums">
            {filteredProducts.length}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-[#777078] font-semibold">
            Products Found
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white border border-[#EDE2E9] rounded-2xl p-4 sm:p-5 mb-8 shadow-xs space-y-4">
        
        {/* Row 1: Search and Category Tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#A62970] text-white shadow-xs'
                  : 'bg-[#FCF4F7] text-[#777078] hover:text-[#242026] hover:bg-[#F8EAF1]'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#A62970] text-white shadow-xs'
                    : 'bg-[#FCF4F7] text-[#777078] hover:text-[#242026] hover:bg-[#F8EAF1]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#777078] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-full pl-9 pr-4 py-2 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
            />
          </div>
        </div>

        {/* Row 2: Sort, Curation & Price Range */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#EDE2E9] text-xs">
          
          {/* Curation Chips */}
          <div className="flex items-center gap-2">
            <span className="text-[#777078] font-medium hidden sm:inline">Curations:</span>
            <button
              onClick={() => setCurationFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                curationFilter === 'all'
                  ? 'bg-[#38203F] text-white'
                  : 'bg-[#FCF4F7] text-[#777078] hover:text-[#242026]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setCurationFilter('new')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                curationFilter === 'new'
                  ? 'bg-[#38203F] text-white'
                  : 'bg-[#FCF4F7] text-[#777078] hover:text-[#242026]'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setCurationFilter('bestseller')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                curationFilter === 'bestseller'
                  ? 'bg-[#38203F] text-white'
                  : 'bg-[#FCF4F7] text-[#777078] hover:text-[#242026]'
              }`}
            >
              Bestsellers
            </button>
          </div>

          {/* Price Slider */}
          <div className="flex items-center gap-2">
            <span className="text-[#777078] font-medium">Max Price:</span>
            <input
              type="range"
              min="15"
              max="80"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-[#A62970] cursor-pointer"
            />
            <span className="font-bold text-[#38203F] tabular-nums">${maxPrice}</span>
          </div>

          {/* Sort Selector & Reset */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#777078]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FCF4F7] border border-[#EDE2E9] rounded-lg px-2.5 py-1 text-xs font-semibold text-[#38203F] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="p-1.5 text-[#777078] hover:text-[#A62970] transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#EDE2E9] rounded-3xl p-12 text-center my-8">
          <div className="w-16 h-16 rounded-full bg-[#FCF4F7] text-[#A62970] flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="font-editorial text-xl font-semibold text-[#38203F] mb-1">
            No matching beauty finds
          </h3>
          <p className="text-xs text-[#777078] max-w-sm mx-auto mb-6">
            We couldn't find any products matching your specific filters. Try loosening your search criteria or resetting filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onNavigateDetail={onNavigateDetail}
            />
          ))}
        </div>
      )}

    </div>
  );
};
