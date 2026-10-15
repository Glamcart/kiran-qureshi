import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroSectionProps {
  onShopCollection: (category?: ProductCategory) => void;
  onExploreBestsellers: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopCollection,
  onExploreBestsellers
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#F8EAF1] via-[#FCF4F7] to-[#F8EAF1] border-b border-[#EDE2E9]">
      
      {/* Decorative Champagne Curves & Subtle Star Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="absolute -top-12 -left-12 w-96 h-96 text-[#D7B77A]/20"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 100 C 60 20, 140 20, 180 100 C 140 180, 60 180, 20 100 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
        </svg>

        <svg
          className="absolute bottom-0 right-1/3 w-80 h-80 text-[#A62970]/10"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[420px] lg:h-[460px] flex flex-col lg:flex-row items-center justify-between gap-8 py-8 lg:py-0">
          
          {/* Left Text Column: ~48% on desktop */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center text-left z-10 lg:pr-4">
            
            {/* Elegant Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#A62970]" />
              <span className="text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase text-[#851C5A] font-serif italic">
                Your Beauty, Your Ritual
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#38203F] leading-[1.12] tracking-tight mb-4 text-balance">
              Discover Your{' '}
              <span className="italic font-semibold text-[#A62970] drop-shadow-xs">
                Signature Glow
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-[#777078] max-w-lg mb-7 font-normal leading-relaxed">
              Elevate your everyday routine with thoughtfully selected makeup, skincare, and beauty essentials crafted to celebrate your authentic radiance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
              <button
                onClick={() => onShopCollection('All')}
                className="bg-[#A62970] hover:bg-[#851C5A] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreBestsellers}
                className="text-xs sm:text-sm font-semibold text-[#38203F] hover:text-[#A62970] transition-colors flex items-center gap-1.5 py-2 cursor-pointer group"
              >
                <span>Explore Bestsellers</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Reassurance Micro-Copy */}
            <div className="flex items-center gap-2 text-xs text-[#777078]/90 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#287A52]" />
              <span>Beautiful essentials. Everyday confidence. Clean & cruelty-free.</span>
            </div>

          </div>

          {/* Right Image Column: ~52% on desktop */}
          <div className="w-full lg:w-[52%] lg:h-full flex items-center justify-center lg:justify-end relative">
            
            {/* Soft Ambient Glow backdrop */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#A62970]/15 to-[#D7B77A]/20 blur-3xl -z-0" />

            {/* Model Photograph Container */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none lg:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-white group">
              <img
                src="/src/assets/images/veloura_beauty_hero_1792059114921.jpg"
                alt="Veloura Beauty signature campaign model with luminous glowing skin"
                className="w-full h-full object-cover object-top sm:object-[center_20%] lg:object-[center_18%] group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
                fetchPriority="high"
              />

              {/* Editorial Badge Overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#EDE2E9] shadow-md flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A62970] animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#777078]">
                    New Season Edit
                  </span>
                  <span className="text-xs font-semibold text-[#38203F]">
                    Radiant Autumn Glow 2026
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
