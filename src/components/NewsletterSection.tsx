import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);

    // Simulate clean subscription with friendly notice
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      showToast('Welcome to the Beauty Club! 10% off code sent to your inbox.', 'success');
    }, 700);
  };

  return (
    <section aria-labelledby="newsletter-heading" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FCF4F7] via-[#F8EAF1] to-[#FCF4F7] border border-[#EDE2E9] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
        
        {/* Decorative background image blended gracefully at far right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <img
            src="/src/assets/images/veloura_product_brushes_1792059157440.jpg"
            alt=""
            className="w-full h-full object-cover object-left mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Icon + Heading + Copy */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 lg:max-w-xl">
            {/* Circular Berry Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A62970] text-[#FFF9F4] flex items-center justify-center shrink-0 shadow-md">
              <Mail className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#851C5A] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
                <span>Veloura Privilege</span>
              </div>
              <h2 id="newsletter-heading" className="font-editorial text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#38203F] tracking-tight">
                Join the <span className="text-[#A62970] italic">Beauty Club</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#777078] mt-1.5 leading-relaxed">
                Get beauty inspiration, secret new arrivals, and special member-only offers delivered straight to your inbox.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-auto lg:min-w-[420px]">
            {isSubmitted ? (
              <div className="bg-white/90 border border-[#287A52]/30 rounded-2xl p-4 flex items-center gap-3 text-sm text-[#287A52]">
                <div className="w-7 h-7 rounded-full bg-[#287A52]/10 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>Thank you for subscribing! Your 10% welcome coupon is <strong>VELOURA10</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-white border border-[#EDE2E9] focus:border-[#A62970] focus:ring-2 focus:ring-[#A62970]/10 rounded-full px-5 py-3 text-xs sm:text-sm text-[#242026] placeholder:text-[#777078]/70 focus:outline-none shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#A62970] hover:bg-[#851C5A] disabled:bg-[#A62970]/70 text-white px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow shrink-0 cursor-pointer"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}

            <p className="text-[11px] text-[#777078] mt-2.5 text-center sm:text-left">
              By joining you agree to receive editorial newsletters. Unsubscribe at any time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
