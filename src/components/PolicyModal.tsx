import React, { useState } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export type PolicyType = 'shipping' | 'returns' | 'privacy' | 'terms';

interface PolicyModalProps {
  isOpen: boolean;
  initialPolicy?: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialPolicy = 'shipping',
  onClose
}) => {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(initialPolicy);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-modal-title"
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2E9] z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 bg-[#FCF4F7] border-b border-[#EDE2E9] flex items-center justify-between">
          <h3 id="policy-modal-title" className="font-editorial text-2xl font-semibold text-[#38203F]">
            Store Policies & Information
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777078] hover:text-[#242026] hover:bg-white transition-colors"
            aria-label="Close policy modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#EDE2E9] bg-white overflow-x-auto scrollbar-none px-4">
          <button
            onClick={() => setActivePolicy('shipping')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activePolicy === 'shipping'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping Policy</span>
          </button>

          <button
            onClick={() => setActivePolicy('returns')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activePolicy === 'returns'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Returns & Exchanges</span>
          </button>

          <button
            onClick={() => setActivePolicy('privacy')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activePolicy === 'privacy'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActivePolicy('terms')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activePolicy === 'terms'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto text-xs leading-relaxed text-[#777078] space-y-4">
          {activePolicy === 'shipping' && (
            <div>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">Complimentary Domestic Delivery</h4>
              <p className="mb-3">
                At Veloura Beauty, we provide complimentary standard shipping on all qualifying United States orders over <strong>${siteConfig.freeShippingThreshold.toFixed(2)}</strong>. For orders below this threshold, a flat-rate shipping charge of $5.99 is applied at checkout.
              </p>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">Delivery Timeframes</h4>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li><strong>Standard Ground:</strong> 3–5 business days across continental USA.</li>
                <li><strong>Express Priority:</strong> 1–2 business days via FedEx/UPS Express.</li>
                <li><strong>Boutique Handling:</strong> Orders placed before 1:00 PM EST are packaged the same business day in sustainable blush tissue and signature boxes.</li>
              </ul>
            </div>
          )}

          {activePolicy === 'returns' && (
            <div>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">30-Day Hassle-Free Returns</h4>
              <p className="mb-3">
                We believe your beauty routine should bring pure joy. If you are not completely enchanted with any formulation or shade, you may return the item within 30 days of receipt for a full refund or exchange.
              </p>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">How to Initiate a Return</h4>
              <p>
                Simply email our concierge team at <strong>{siteConfig.contact.email}</strong> with your order number. We will provide a prepaid domestic return label within 24 hours.
              </p>
            </div>
          )}

          {activePolicy === 'privacy' && (
            <div>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">Commitment to Your Privacy</h4>
              <p className="mb-3">
                Veloura Beauty respects your privacy. We never sell, rent, or trade your personal data with third-party advertisers. Information collected during checkout or newsletter registration is used solely for order fulfillment and customized beauty updates.
              </p>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">Secure Encryption</h4>
              <p>
                All data transmission is encrypted using industry-standard 256-bit SSL protocols.
              </p>
            </div>
          )}

          {activePolicy === 'terms' && (
            <div>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">Terms and Conditions of Use</h4>
              <p className="mb-3">
                By browsing and shopping on Veloura Beauty, you agree to our general terms of service. All editorial photography, formulas, branding, and text are original properties of Veloura Beauty.
              </p>
              <p>
                Product pricing, promotional discounts, and catalog availability are subject to change.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FCF4F7] border-t border-[#EDE2E9] text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#38203F] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
