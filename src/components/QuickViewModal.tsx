import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigateDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onNavigateDetail
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<string>(
    product?.shades && product.shades.length > 0 ? product.shades[0].name : ''
  );

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShade || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2E9] z-10 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#777078] hover:text-[#242026] flex items-center justify-center shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#FCF4F7] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs bg-white text-[#851C5A] border border-[#EDE2E9]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold uppercase tracking-widest text-[#A62970]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 font-semibold text-[#38203F]">
                  <Star className="w-3.5 h-3.5 fill-[#D7B77A] text-[#D7B77A]" />
                  <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                  <span className="text-[#777078] text-[11px]">({product.reviewCount})</span>
                </div>
              </div>

              {/* Title */}
              <h3 id="quick-view-title" className="font-editorial text-xl sm:text-2xl font-semibold text-[#38203F] mb-1 leading-snug">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-bold text-[#38203F] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#777078] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#777078] line-clamp-3 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Shade Selection (if available) */}
              {product.shades && product.shades.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs font-semibold text-[#242026] mb-2 flex items-center justify-between">
                    <span>Shade:</span>
                    <span className="text-[#A62970] font-medium">{selectedShade}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.shades.map((shade) => (
                      <button
                        key={shade.name}
                        onClick={() => setSelectedShade(shade.name)}
                        className={`w-7 h-7 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                          selectedShade === shade.name
                            ? 'ring-2 ring-[#A62970] ring-offset-2 scale-110 shadow-xs'
                            : 'border border-[#EDE2E9] hover:scale-105'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                        title={shade.name}
                        aria-label={`Select shade ${shade.name}`}
                      >
                        {selectedShade === shade.name && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EDE2E9] space-y-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#EDE2E9] rounded-xl bg-[#FCF4F7] px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#777078] hover:text-[#242026]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold tabular-nums text-[#242026]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#777078] hover:text-[#242026]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to bag button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`p-3 rounded-xl border border-[#EDE2E9] transition-colors ${
                    isFavorited
                      ? 'bg-[#A62970] text-white'
                      : 'bg-[#FCF4F7] text-[#777078] hover:text-[#A62970]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Full details link */}
              <button
                onClick={() => {
                  onClose();
                  onNavigateDetail(product);
                }}
                className="w-full text-center text-xs font-semibold text-[#851C5A] hover:underline flex items-center justify-center gap-1 pt-1"
              >
                <span>View Full Product Experience & Ingredients</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
