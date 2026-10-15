import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const BenefitsStrip: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Truck,
    ShieldCheck,
    RotateCcw,
    Headphones
  };

  return (
    <section aria-label="Customer Benefits" className="bg-[#F8EAF1]/60 border-y border-[#EDE2E9] py-8 sm:py-10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {siteConfig.benefits.map((b) => {
            const Icon = iconMap[b.icon] || ShieldCheck;
            return (
              <div key={b.id} className="flex items-center gap-3.5 sm:gap-4 group">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#EDE2E9] flex items-center justify-center text-[#A62970] shrink-0 group-hover:bg-[#A62970] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#242026] group-hover:text-[#A62970] transition-colors leading-tight">
                    {b.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#777078] mt-0.5 leading-normal">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
