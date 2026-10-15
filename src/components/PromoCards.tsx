import React from 'react';
import { ArrowRight, Sparkles, Flame, Tag } from 'lucide-react';
import { ProductCategory } from '../types';

interface PromoCardsProps {
  onNavigatePromo: (category: ProductCategory, filterType?: 'new' | 'bestseller') => void;
}

export const PromoCards: React.FC<PromoCardsProps> = ({ onNavigatePromo }) => {
  const cards = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      description: 'Meet the latest additions to your beauty routine.',
      cta: 'Discover New',
      category: 'Lips' as ProductCategory,
      filterType: 'new' as const,
      bgColor: 'bg-[#FCF4F7] border-[#EDE2E9]',
      accentColor: 'text-[#A62970]',
      icon: Sparkles,
      image: '/src/assets/images/veloura_promo_lipstick_1792059115078.jpg',
      alt: 'Veloura new velvet matte lipstick and lip tube'
    },
    {
      id: 'bestsellers',
      title: 'Bestsellers',
      description: 'Discover the favorites our beauty community loves.',
      cta: 'Shop Favorites',
      category: 'Eyes' as ProductCategory,
      filterType: 'bestseller' as const,
      bgColor: 'bg-[#FFF5ED] border-[#F2E5D8]',
      accentColor: 'text-[#851C5A]',
      icon: Flame,
      image: '/src/assets/images/veloura_promo_eyeshadow_1792059115808.jpg',
      alt: 'Veloura bestseller glam edit eyeshadow palette'
    },
    {
      id: 'beauty-offers',
      title: 'Beauty Offers',
      description: 'Explore special finds and limited-time savings.',
      cta: 'View Offers',
      category: 'Fragrance' as ProductCategory,
      filterType: undefined,
      bgColor: 'bg-[#F8EAF1] border-[#EDE2E9]',
      accentColor: 'text-[#A62970]',
      icon: Tag,
      image: '/src/assets/images/veloura_promo_perfume_1792059115742.jpg',
      alt: 'Veloura luxury fragrance and beauty promotions'
    }
  ];

  return (
    <section aria-label="Featured Collections" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onNavigatePromo(card.category, card.filterType)}
              className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group flex items-center justify-between ${card.bgColor}`}
            >
              {/* Left Content */}
              <div className="z-10 max-w-[62%] flex flex-col justify-between h-full">
                
                {/* Upper Icon & Eyebrow */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-white/90 shadow-xs flex items-center justify-center text-[#A62970]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#777078]">
                    Collection
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#38203F] mb-1 leading-snug">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#777078] mb-4 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#A62970] group-hover:text-[#851C5A] transition-colors">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Right Image Container */}
              <div className="w-[36%] h-28 sm:h-32 rounded-xl overflow-hidden shadow-xs border border-white/60 bg-white/70 shrink-0">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Subtle decorative background shine */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/40 blur-2xl pointer-events-none" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
