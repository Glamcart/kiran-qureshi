import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, Instagram, Facebook, HelpCircle } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface AnnouncementBarProps {
  onOpenHostingerGuide?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenHostingerGuide }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Cycle secondary messages on very narrow screens
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % siteConfig.announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside aria-label="Store Announcements" className="bg-gradient-to-r from-[#851C5A] via-[#A62970] to-[#851C5A] text-[#FFF9F4] text-[11px] sm:text-xs font-medium tracking-wide border-b border-[#A62970]/30 transition-all">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-8 sm:h-9 flex items-center justify-between">
        
        {/* Left: Free Shipping threshold */}
        <div className="hidden sm:flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#D7B77A] shrink-0" />
          <span>Complimentary Shipping on Orders ${siteConfig.freeShippingThreshold}+</span>
        </div>

        {/* Center: First order discount code / Rotator on mobile */}
        <div className="flex-1 sm:flex-initial flex items-center justify-center text-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D7B77A] shrink-0" />
            <span className="sm:hidden">
              {siteConfig.announcements[currentIdx].text}
            </span>
            <span className="hidden sm:inline">
              Enjoy 10% Off Your First Order with code <strong className="underline underline-offset-2 tracking-wider text-white">VELOURA10</strong>
            </span>
          </div>
        </div>

        {/* Right: Social icons & Hostinger deployment badge */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2.5 text-white/80 pr-2 border-r border-white/20">
            <a 
              href={siteConfig.socialLinks.instagram} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="Follow Veloura Beauty on Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href={siteConfig.socialLinks.facebook} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors"
              aria-label="Follow Veloura Beauty on Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>

          {onOpenHostingerGuide && (
            <button
              onClick={onOpenHostingerGuide}
              className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-[#D7B77A] hover:text-white transition-colors tracking-wider"
              title="View Hostinger static deployment guide"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Hostinger Guide</span>
            </button>
          )}
        </div>

      </div>
    </aside>
  );
};
