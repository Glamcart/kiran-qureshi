import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCategory } from '../types';

interface HeaderProps {
  onSearch: (query: string, category?: ProductCategory) => void;
  onOpenAccount: () => void;
  onNavigateHome: () => void;
  onNavigateShop: (category?: ProductCategory) => void;
  onToggleMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onOpenAccount,
  onNavigateHome,
  onNavigateShop,
  onToggleMobileNav
}) => {
  const { totalItemCount, cartSubtotal, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory);
  };

  return (
    <header className="bg-white border-b border-[#EDE2E9] sticky top-0 z-30 transition-shadow">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Mobile menu button */}
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden p-2 text-[#38203F] hover:text-[#A62970] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A62970]"
          aria-label="Open mobile navigation drawer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Left: Original Veloura Beauty Wordmark */}
        <div 
          onClick={onNavigateHome}
          className="cursor-pointer group flex flex-col items-start select-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#38203F] group-hover:text-[#A62970] transition-colors tracking-tight">
              Veloura
            </span>
            <span className="font-editorial italic font-normal text-2xl sm:text-3xl lg:text-[34px] text-[#A62970]">
              Beauty
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D7B77A] ml-0.5 opacity-80" />
          </div>
          <span className="text-[10px] tracking-[0.24em] font-semibold text-[#777078] uppercase group-hover:text-[#851C5A] transition-colors -mt-1 pl-0.5">
            Beauty Store
          </span>
        </div>

        {/* Center: Search Field with Category Selector */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center bg-[#FCF4F7] rounded-full border border-[#EDE2E9] focus-within:border-[#A62970] focus-within:ring-2 focus-within:ring-[#A62970]/10 transition-all overflow-hidden p-1"
        >
          <label htmlFor="header-category-select" className="sr-only">Filter by category</label>
          <select
            id="header-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
            className="bg-transparent text-xs font-medium text-[#777078] px-3 py-2 border-r border-[#EDE2E9] focus:outline-none cursor-pointer hover:text-[#242026]"
          >
            <option value="All">All Categories</option>
            <option value="Face">Face</option>
            <option value="Lips">Lips</option>
            <option value="Eyes">Eyes</option>
            <option value="Skincare">Skincare</option>
            <option value="Brushes">Brushes</option>
            <option value="Fragrance">Fragrance</option>
            <option value="Beauty Tools">Beauty Tools</option>
          </select>

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your beauty favorites..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#242026] px-3.5 py-1.5 focus:outline-none placeholder:text-[#777078]/70"
          />

          <button
            type="submit"
            className="bg-[#A62970] hover:bg-[#851C5A] text-white p-2.5 rounded-full transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-sm hover:shadow"
            aria-label="Search beauty store"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Right: Actions (Account, Wishlist, Bag) */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          
          {/* Mobile search trigger */}
          <button
            onClick={() => onNavigateShop()}
            className="md:hidden p-2 text-[#38203F] hover:text-[#A62970] transition-colors"
            aria-label="Search catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-2 text-left group p-1.5 rounded-lg hover:bg-[#FCF4F7] transition-colors focus:outline-none"
            aria-label="User Account"
          >
            <div className="w-9 h-9 rounded-full bg-[#F8EAF1] text-[#A62970] flex items-center justify-center group-hover:bg-[#A62970] group-hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden xl:flex flex-col">
              <span className="text-xs font-semibold text-[#242026] group-hover:text-[#A62970] leading-none transition-colors">
                Account
              </span>
              <span className="text-[11px] text-[#777078] mt-0.5 leading-none">
                Sign In / Join
              </span>
            </div>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-[#38203F] hover:text-[#A62970] rounded-full hover:bg-[#FCF4F7] transition-colors focus:outline-none"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#A62970] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 pl-2 sm:pl-3 pr-3.5 py-1.5 bg-[#F8EAF1]/70 hover:bg-[#F8EAF1] border border-[#EDE2E9] rounded-full transition-all group focus:outline-none cursor-pointer"
            aria-label={`Shopping bag, ${totalItemCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#851C5A] group-hover:scale-105 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-[#851C5A] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalItemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] uppercase font-semibold text-[#777078] tracking-wider leading-none">
                My Bag
              </span>
              <span className="text-xs font-bold text-[#38203F] mt-0.5 leading-none tabular-nums">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
          </button>

        </div>

      </div>
    </header>
  );
};
