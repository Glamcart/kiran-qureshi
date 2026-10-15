import React, { useState } from 'react';
import { ChevronDown, ArrowRight, X, Sparkles, Phone, Mail } from 'lucide-react';
import { ProductCategory } from '../types';
import { categories } from '../data/categories';
import { siteConfig } from '../data/siteConfig';

interface NavigationProps {
  activePage: string;
  onNavigateHome: () => void;
  onNavigateShop: (category?: ProductCategory, filterType?: 'new' | 'bestseller') => void;
  onNavigateJournal: () => void;
  onNavigateContact: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activePage,
  onNavigateHome,
  onNavigateShop,
  onNavigateJournal,
  onNavigateContact,
  mobileOpen,
  onCloseMobile
}) => {
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation Row */}
      <nav aria-label="Main Navigation" className="hidden lg:block bg-white border-b border-[#EDE2E9] shadow-xs">
        <div className="max-w-[1360px] mx-auto px-6 h-12 flex items-center justify-between">
          
          <ul className="flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-[#242026]">
            {/* Home */}
            <li>
              <button
                onClick={onNavigateHome}
                className={`py-3 relative hover:text-[#A62970] transition-colors cursor-pointer ${
                  activePage === 'home' ? 'text-[#A62970]' : ''
                }`}
              >
                Home
                {activePage === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A62970]" />
                )}
              </button>
            </li>

            {/* Shop with Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  onNavigateShop('All');
                  setShopDropdownOpen(false);
                }}
                className={`flex items-center gap-1 py-3 hover:text-[#A62970] transition-colors cursor-pointer ${
                  activePage === 'shop' ? 'text-[#A62970]' : ''
                }`}
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                {activePage === 'shop' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A62970]" />
                )}
              </button>

              {/* Mega Dropdown */}
              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#EDE2E9] rounded-b-xl shadow-xl p-4 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] font-bold tracking-widest text-[#777078] uppercase mb-2 pb-1 border-b border-[#EDE2E9]">
                    Shop By Category
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => {
                        onNavigateShop('All');
                        setShopDropdownOpen(false);
                      }}
                      className="text-left px-3 py-2 text-xs font-medium text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>All Products</span>
                      <ArrowRight className="w-3 h-3 text-[#A62970]" />
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onNavigateShop(cat.id);
                          setShopDropdownOpen(false);
                        }}
                        className="text-left px-3 py-2 text-xs font-medium text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] rounded-lg transition-colors flex items-center justify-between group"
                      >
                        <span className="capitalize">{cat.name}</span>
                        <span className="text-[10px] text-[#777078] group-hover:text-[#A62970]">
                          {cat.itemCount} items
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* New Arrivals */}
            <li>
              <button
                onClick={() => onNavigateShop('All', 'new')}
                className="py-3 relative hover:text-[#A62970] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>New Arrivals</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A62970]" />
              </button>
            </li>

            {/* Bestsellers */}
            <li>
              <button
                onClick={() => onNavigateShop('All', 'bestseller')}
                className="py-3 hover:text-[#A62970] transition-colors cursor-pointer"
              >
                Bestsellers
              </button>
            </li>

            {/* Makeup */}
            <li>
              <button
                onClick={() => onNavigateShop('Lips')}
                className="py-3 hover:text-[#A62970] transition-colors cursor-pointer"
              >
                Makeup
              </button>
            </li>

            {/* Skincare */}
            <li>
              <button
                onClick={() => onNavigateShop('Skincare')}
                className="py-3 hover:text-[#A62970] transition-colors cursor-pointer"
              >
                Skincare
              </button>
            </li>

            {/* Fragrance */}
            <li>
              <button
                onClick={() => onNavigateShop('Fragrance')}
                className="py-3 hover:text-[#A62970] transition-colors cursor-pointer"
              >
                Fragrance
              </button>
            </li>

            {/* Beauty Journal */}
            <li>
              <button
                onClick={onNavigateJournal}
                className={`py-3 relative hover:text-[#A62970] transition-colors cursor-pointer ${
                  activePage === 'journal' ? 'text-[#A62970]' : ''
                }`}
              >
                Beauty Journal
                {activePage === 'journal' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A62970]" />
                )}
              </button>
            </li>

            {/* Contact */}
            <li>
              <button
                onClick={onNavigateContact}
                className={`py-3 relative hover:text-[#A62970] transition-colors cursor-pointer ${
                  activePage === 'contact' ? 'text-[#A62970]' : ''
                }`}
              >
                Contact
                {activePage === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A62970]" />
                )}
              </button>
            </li>
          </ul>

          {/* Right: SHOP NOW CTA Button */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigateShop('All')}
              className="bg-[#A62970] hover:bg-[#851C5A] text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside aria-label="Mobile Navigation Drawer" className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#EDE2E9] flex items-center justify-between bg-[#FCF4F7]">
              <div>
                <span className="font-editorial text-2xl font-semibold text-[#38203F]">
                  Veloura
                </span>
                <span className="font-editorial italic text-2xl text-[#A62970] ml-1">
                  Beauty
                </span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-full text-[#777078] hover:text-[#242026] hover:bg-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onNavigateHome();
                    onCloseMobile();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] transition-colors"
                >
                  Home
                </button>

                <div className="pt-2 pb-1">
                  <span className="px-3 text-[11px] font-bold uppercase tracking-widest text-[#777078]">
                    Categories
                  </span>
                </div>

                <button
                  onClick={() => {
                    onNavigateShop('All');
                    onCloseMobile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] transition-colors flex items-center justify-between"
                >
                  <span>All Collections</span>
                  <ArrowRight className="w-4 h-4 text-[#A62970]" />
                </button>

                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigateShop(cat.id);
                      onCloseMobile();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#777078] hover:text-[#A62970] hover:bg-[#FCF4F7] transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-[#777078]/70">{cat.itemCount}</span>
                  </button>
                ))}

                <div className="pt-3 pb-1">
                  <span className="px-3 text-[11px] font-bold uppercase tracking-widest text-[#777078]">
                    Curations
                  </span>
                </div>

                <button
                  onClick={() => {
                    onNavigateShop('All', 'new');
                    onCloseMobile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D7B77A]" />
                  <span>New Arrivals</span>
                </button>

                <button
                  onClick={() => {
                    onNavigateShop('All', 'bestseller');
                    onCloseMobile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] transition-colors"
                >
                  Bestsellers
                </button>

                <button
                  onClick={() => {
                    onNavigateJournal();
                    onCloseMobile();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] transition-colors"
                >
                  The Beauty Journal
                </button>

                <button
                  onClick={() => {
                    onNavigateContact();
                    onCloseMobile();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#242026] hover:bg-[#FCF4F7] hover:text-[#A62970] transition-colors"
                >
                  Concierge & Contact
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-5 border-t border-[#EDE2E9] bg-[#FCF4F7] space-y-2 text-xs text-[#777078]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A62970]" />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A62970]" />
                <span>{siteConfig.contact.phone}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
