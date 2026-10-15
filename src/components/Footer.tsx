import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, Clock, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { ProductCategory } from '../types';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateShop: (category?: ProductCategory, filterType?: 'new' | 'bestseller') => void;
  onNavigateContact: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenPolicy: (policy: 'shipping' | 'returns' | 'privacy' | 'terms') => void;
  onOpenHostingerGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateContact,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
  onOpenPolicy,
  onOpenHostingerGuide
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Veloura Beauty Footer" className="bg-[#2E1738] text-[#FFF9F4] pt-14 pb-10 border-t border-[#38203F]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <div 
                onClick={onNavigateHome}
                className="cursor-pointer group inline-flex flex-col items-start mb-3"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-editorial text-2xl font-semibold text-white tracking-tight">
                    Veloura
                  </span>
                  <span className="font-editorial italic font-normal text-2xl text-[#D7B77A]">
                    Beauty
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D7B77A] opacity-90" />
                </div>
                <span className="text-[9px] tracking-[0.25em] font-semibold text-[#D8B4C8] uppercase -mt-0.5">
                  Beauty Store
                </span>
              </div>

              <p className="text-xs text-[#D8B4C8]/80 leading-relaxed mb-5 max-w-xs">
                {siteConfig.tagline}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-white/80">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#A62970] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#A62970] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7B77A] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8B4C8]/90">
              <li>
                <button
                  onClick={() => onNavigateShop('All')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShop('All', 'new')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShop('All', 'bestseller')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bestsellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShop('Lips')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lip Rituals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShop('Skincare')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Skincare Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateShop('Fragrance')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Artisanal Fragrance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7B77A] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8B4C8]/90">
              <li>
                <button
                  onClick={onNavigateContact}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: My Account */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7B77A] mb-4">
              My Account
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D8B4C8]/90">
              <li>
                <button
                  onClick={onOpenAccount}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sign In / Register
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWishlist}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  My Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCart}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shopping Bag
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAccount}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Order History (Demo)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenHostingerGuide}
                  className="hover:text-[#D7B77A] text-[#D7B77A]/90 transition-colors cursor-pointer text-left flex items-center gap-1 font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Hostinger Setup Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Store Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D7B77A] mb-4">
              Concierge Studio
            </h4>
            <div className="space-y-3 text-xs text-[#D8B4C8]/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#D7B77A] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#D7B77A] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#D7B77A] shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#D7B77A] shrink-0" />
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8B4C8]/70">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {currentYear} Veloura Beauty. All rights reserved.</span>
            <span>·</span>
            <span>Client-ready for Hostinger static deployment.</span>
          </div>

          {/* Payment Badges & Trust */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[11px] text-[#D8B4C8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7B77A]" />
              <span>256-Bit SSL Demo Gateway</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
