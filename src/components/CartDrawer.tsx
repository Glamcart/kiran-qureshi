import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../data/siteConfig';

interface CartDrawerProps {
  onProceedCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedCheckout,
  onExploreProducts
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingProgress,
    isFreeShipping,
    amountNeededForFreeShipping,
    appliedPromo,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    orderTotal
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromoCode(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Shopping Bag Drawer" className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EDE2E9] flex items-center justify-between bg-[#FCF4F7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#851C5A]" />
              <h2 className="font-editorial text-xl font-semibold text-[#38203F]">
                Your Beauty Bag
              </h2>
              <span className="text-xs font-bold text-[#777078] bg-white px-2 py-0.5 rounded-full border border-[#EDE2E9]">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#777078] hover:text-[#242026] hover:bg-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="px-5 py-3.5 bg-[#F8EAF1]/50 border-b border-[#EDE2E9]">
            <div className="flex items-center justify-between text-xs font-medium text-[#38203F] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#A62970]" />
                {isFreeShipping ? (
                  <strong className="text-[#287A52]">Complimentary Shipping Unlocked!</strong>
                ) : (
                  <span>
                    Add <strong className="text-[#A62970]">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#777078] font-bold">{freeShippingProgress}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#EDE2E9]">
              <div
                className="h-full bg-[#A62970] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FCF4F7] text-[#A62970] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-editorial text-lg font-semibold text-[#38203F] mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#777078] max-w-xs mb-6">
                  Discover our curated rituals, bestsellers, and newly released cosmetics to get started.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreProducts();
                  }}
                  className="bg-[#A62970] hover:bg-[#851C5A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
                >
                  Explore Bestsellers
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedShade || 'default'}`}
                    className="flex gap-3.5 pb-4 border-b border-[#EDE2E9] last:border-none"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FCF4F7] border border-[#EDE2E9] shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info & Quantity */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-editorial text-sm font-semibold text-[#242026] leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedShade)}
                            className="text-[#777078] hover:text-[#B42335] p-1 transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedShade && (
                          <div className="text-[11px] text-[#A62970] font-medium mt-0.5">
                            Shade: {item.selectedShade}
                          </div>
                        )}
                        <div className="text-xs text-[#777078] mt-0.5">
                          ${item.product.price.toFixed(2)} each
                        </div>
                      </div>

                      {/* Stepper & Line Total */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#EDE2E9] rounded-lg bg-[#FCF4F7]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedShade
                              )
                            }
                            className="p-1.5 text-[#777078] hover:text-[#242026]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#242026]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedShade
                              )
                            }
                            className="p-1.5 text-[#777078] hover:text-[#242026]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#38203F] tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EDE2E9] bg-[#FCF4F7] space-y-4">
              
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-[#287A52]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[#287A52]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Promo <strong>{appliedPromo}</strong> (10% off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[11px] text-[#B42335] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo code (e.g. VELOURA10)"
                    className="flex-1 bg-white border border-[#EDE2E9] rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#A62970]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#38203F] text-white rounded-xl text-xs font-semibold hover:bg-[#851C5A] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#777078]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#242026]">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#287A52]">
                    <span>10% Club Savings</span>
                    <span className="tabular-nums font-medium">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#777078]">
                  <span>Shipping</span>
                  <span className="tabular-nums font-medium text-[#242026]">
                    {isFreeShipping ? 'Complimentary' : '$5.99'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#38203F] pt-2 border-t border-[#EDE2E9]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">
                    ${(isFreeShipping ? orderTotal : orderTotal + 5.99).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedCheckout();
                }}
                className="w-full py-3.5 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#777078] text-center">
                <Sparkles className="w-3 h-3 text-[#D7B77A]" />
                <span>Complimentary luxury samples included with every order</span>
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
};
