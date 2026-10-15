import React, { useState } from 'react';
import { X, Check, Truck, CreditCard, ShieldCheck, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

interface DemoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: () => void;
}

export const DemoCheckoutModal: React.FC<DemoCheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderCompleted
}) => {
  const { cart, cartSubtotal, isFreeShipping, discountAmount, orderTotal, clearCart } = useCart();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState({
    firstName: 'Elena',
    lastName: 'Laurent',
    email: 'elena.laurent@example.com',
    address: '450 Madison Avenue, Suite 12B',
    city: 'New York',
    state: 'NY',
    zip: '10022'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentOption, setPaymentOption] = useState<'card_demo' | 'cod_demo'>('card_demo');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const shippingCost = shippingMethod === 'express' ? 12.99 : isFreeShipping ? 0 : 5.99;
  const finalTotal = Math.max(0, orderTotal + shippingCost);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const generatedId = `VB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedId);
    setStep('confirmation');
    clearCart();
  };

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
        aria-labelledby="checkout-title"
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2E9] z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FCF4F7] border-b border-[#EDE2E9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#851C5A]" />
            <h3 id="checkout-title" className="font-editorial text-xl sm:text-2xl font-semibold text-[#38203F]">
              {step === 'confirmation' ? 'Order Confirmed' : 'Veloura Secure Checkout'}
            </h3>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#777078] hover:text-[#242026] hover:bg-white transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center gap-4 px-6 py-3 bg-[#F8EAF1]/50 border-b border-[#EDE2E9] text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-[#A62970]' : 'text-[#287A52]'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-[#A62970] text-white' : 'bg-[#287A52] text-white'}`}>
                1
              </div>
              <span>Shipping Details</span>
            </div>
            <div className="w-8 h-px bg-[#EDE2E9]" />
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#A62970]' : 'text-[#777078]'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#A62970] text-white' : 'bg-slate-200 text-[#777078]'}`}>
                2
              </div>
              <span>Payment Demo</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242026] mb-1">Email for Order Updates</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242026] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#242026] mb-1">ZIP</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full bg-[#FCF4F7] border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A62970]"
                  />
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#242026] mb-2">Delivery Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#A62970] bg-[#FCF4F7]'
                        : 'border-[#EDE2E9] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#242026]">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#A62970]" /> Standard Ground
                      </span>
                      <span>{isFreeShipping ? 'FREE' : '$5.99'}</span>
                    </div>
                    <div className="text-[11px] text-[#777078] mt-0.5">3–5 Business Days</div>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#A62970] bg-[#FCF4F7]'
                        : 'border-[#EDE2E9] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#242026]">
                      <span>Express Priority</span>
                      <span>$12.99</span>
                    </div>
                    <div className="text-[11px] text-[#777078] mt-0.5">1–2 Business Days</div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Demo */}
          {step === 'payment' && (
            <div className="space-y-4">
              {/* Transparent Disclaimer */}
              <div className="p-3 bg-[#FFF4EC] border border-[#F2E5D8] rounded-xl flex items-start gap-2 text-xs text-[#851C5A]">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#A62970] mt-0.5" />
                <div>
                  <strong>Demonstration Storefront:</strong> No real payment card will be charged. To process real transactions, integrate Stripe Elements, PayPal JavaScript SDK, or Shopify Buy SDK with your store credentials.
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label
                  onClick={() => setPaymentOption('card_demo')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentOption === 'card_demo'
                      ? 'border-[#A62970] bg-[#FCF4F7]'
                      : 'border-[#EDE2E9] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#A62970]" />
                    <span className="text-xs font-semibold text-[#242026]">
                      Credit / Debit Card (Demo Mode)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#777078]">Instant Test Approval</span>
                </label>

                <label
                  onClick={() => setPaymentOption('cod_demo')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentOption === 'cod_demo'
                      ? 'border-[#A62970] bg-[#FCF4F7]'
                      : 'border-[#EDE2E9] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#851C5A]" />
                    <span className="text-xs font-semibold text-[#242026]">
                      Cash on Delivery / Studio Invoice (Demo)
                    </span>
                  </div>
                  <span className="text-[10px] text-[#777078]">Pay on Delivery</span>
                </label>
              </div>

              {/* Order Summary box */}
              <div className="p-4 bg-[#FCF4F7] rounded-xl border border-[#EDE2E9] space-y-2 text-xs">
                <div className="font-semibold text-[#38203F] mb-1">Order Summary:</div>
                <div className="flex justify-between text-[#777078]">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#287A52]">
                    <span>Promotional Discount</span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#777078]">
                  <span>Shipping ({shippingMethod})</span>
                  <span className="tabular-nums">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#38203F] pt-2 border-t border-[#EDE2E9]">
                  <span>Total Due</span>
                  <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-3 border border-[#EDE2E9] text-[#777078] hover:text-[#242026] rounded-xl text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D7B77A]" />
                  <span>Place Demo Order (${finalTotal.toFixed(2)})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 'confirmation' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#287A52]/10 text-[#287A52] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-editorial text-2xl font-semibold text-[#38203F]">
                  Thank You for Your Order!
                </h4>
                <p className="text-xs text-[#777078] mt-1">
                  Your demonstration order has been created successfully.
                </p>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-[#FCF4F7] border border-[#EDE2E9] font-mono text-xs font-bold text-[#851C5A]">
                  Order #{orderNumber}
                </div>
              </div>

              <div className="p-4 bg-[#FCF4F7] rounded-2xl text-left border border-[#EDE2E9] text-xs space-y-2 max-w-md mx-auto">
                <div className="font-semibold text-[#242026]">Order Details:</div>
                <div className="flex justify-between text-[#777078]">
                  <span>Customer:</span>
                  <span className="font-medium text-[#242026]">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between text-[#777078]">
                  <span>Email Confirmation:</span>
                  <span className="font-medium text-[#242026]">{formData.email}</span>
                </div>
                <div className="flex justify-between text-[#777078]">
                  <span>Shipping Address:</span>
                  <span className="font-medium text-[#242026]">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between text-[#777078]">
                  <span>Status:</span>
                  <span className="font-medium text-[#287A52]">Preparing Boutique Packaging</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOrderCompleted();
                  }}
                  className="px-8 py-3 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
