import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Shade Matching Advice',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your inquiry has been received by our beauty concierge team', 'success');
  };

  const faqs = [
    {
      q: 'How does complimentary shipping work?',
      a: 'All orders of $59 or more placed within the United States automatically receive complimentary standard shipping at checkout, delivered within 3–5 business days.'
    },
    {
      q: 'How can I get personalized shade matching assistance?',
      a: 'Send a bare-faced photo in natural morning daylight to concierge@velourabeauty.com, and our senior colorists will recommend your exact foundation, powder, and lipstick nuances within 24 hours.'
    },
    {
      q: 'Are all Veloura Beauty formulas clean and cruelty-free?',
      a: 'Yes. Every Veloura formulation is 100% Leaping Bunny certified cruelty-free, vegan, and free of parabens, sulfates, phthalates, and synthetic micro-plastics.'
    },
    {
      q: 'What is your returns policy?',
      a: 'We offer an unconditional 30-day return policy. If a formulation does not suit your skin, simply request a prepaid return label via email.'
    },
    {
      q: 'Can this store be deployed to Hostinger static hosting?',
      a: 'Absolutely! Veloura Beauty was engineered specifically for Hostinger static and shared hosting. Build the project using npm run build and upload the dist/ directory directly to your public_html/ folder.'
    }
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A62970] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
          <span>Client Concierge</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#38203F] tracking-tight">
          We’re Here to <span className="italic text-[#A62970]">Help</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#777078] mt-2 leading-relaxed">
          Whether you need personalized shade matching, ingredient advice, or help with an order, our beauty specialists look forward to assisting you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* Left Column: Contact Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FCF4F7] border border-[#EDE2E9] rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-editorial text-xl font-semibold text-[#38203F]">
              Boutique Studio
            </h3>

            <div className="space-y-4 text-xs text-[#777078]">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white border border-[#EDE2E9] flex items-center justify-center text-[#A62970] shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#242026] block mb-0.5">Physical Studio Address</strong>
                  <span>{siteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white border border-[#EDE2E9] flex items-center justify-center text-[#A62970] shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#242026] block mb-0.5">Concierge Email</strong>
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#A62970] transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white border border-[#EDE2E9] flex items-center justify-center text-[#A62970] shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#242026] block mb-0.5">Client Services Hotline</strong>
                  <span>{siteConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white border border-[#EDE2E9] flex items-center justify-center text-[#A62970] shrink-0 shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-[#242026] block mb-0.5">Concierge Hours</strong>
                  <span>{siteConfig.contact.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#EDE2E9] rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#38203F] mb-1">
              Send a Note
            </h3>
            <p className="text-xs text-[#777078] mb-6">
              Our specialists typically reply within 2 to 4 business hours.
            </p>

            {isSubmitted ? (
              <div className="bg-[#287A52]/10 border border-[#287A52]/20 rounded-2xl p-6 text-center text-[#287A52] space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-[#287A52]" />
                <h4 className="font-semibold text-base">Message Sent Successfully</h4>
                <p className="text-xs text-[#777078]">
                  Thank you, {formData.name}. A concierge specialist will reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-xs font-bold text-[#A62970] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#242026] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Camille Moreau"
                      className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3.5 py-2.5 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#242026] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="camille@example.com"
                      className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3.5 py-2.5 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">Inquiry Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3.5 py-2.5 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
                  >
                    <option>Shade Matching Advice</option>
                    <option>Order Status & Delivery</option>
                    <option>Clean Formulations & Allergies</option>
                    <option>Press & Partnerships</option>
                    <option>General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">How can we assist you?</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your skin tone, questions about shades, or feedback..."
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl p-3.5 text-xs text-[#242026] focus:outline-none focus:border-[#A62970]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* FAQ Accordion */}
      <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto pt-6">
        <div className="text-center mb-8">
          <h2 id="faq-heading" className="font-editorial text-2xl sm:text-3xl font-semibold text-[#38203F]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#777078] mt-1">
            Instant answers regarding ordering, formulations, and store policies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EDE2E9] rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#242026] hover:text-[#A62970]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#777078] transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#A62970]' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-[#777078] leading-relaxed border-t border-[#EDE2E9]/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
