import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Product } from '../types';

interface WishlistDrawerProps {
  onNavigateDetail: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onNavigateDetail,
  onExploreProducts
}) => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: Product) => {
    const defaultShade = product.shades && product.shades.length > 0 ? product.shades[0].name : undefined;
    addToCart(product, 1, defaultShade);
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Saved Wishlist Drawer" className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EDE2E9] flex items-center justify-between bg-[#FCF4F7]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#A62970] fill-[#A62970]" />
              <h2 className="font-editorial text-xl font-semibold text-[#38203F]">
                Saved Favorites
              </h2>
              <span className="text-xs font-bold text-[#777078] bg-white px-2 py-0.5 rounded-full border border-[#EDE2E9]">
                {savedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full text-[#777078] hover:text-[#242026] hover:bg-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-5">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FCF4F7] text-[#A62970] flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-editorial text-lg font-semibold text-[#38203F] mb-1">
                  No saved beauty items yet
                </h3>
                <p className="text-xs text-[#777078] max-w-xs mb-6">
                  Save your desired lipsticks, perfumes, and skincare favorites by tapping the heart icon on any product.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onExploreProducts();
                  }}
                  className="bg-[#A62970] hover:bg-[#851C5A] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3.5 pb-4 border-b border-[#EDE2E9] last:border-none"
                  >
                    {/* Thumbnail */}
                    <div 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onNavigateDetail(product);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#FCF4F7] border border-[#EDE2E9] shrink-0 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => {
                              setIsWishlistOpen(false);
                              onNavigateDetail(product);
                            }}
                            className="font-editorial text-sm font-semibold text-[#242026] leading-snug hover:text-[#A62970] cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(product.id, product.name)}
                            className="text-[#777078] hover:text-[#B42335] p-1 transition-colors"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-bold text-[#38203F] mt-1 tabular-nums">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Move to Bag button */}
                      <div className="pt-2">
                        <button
                          onClick={() => handleMoveToBag(product)}
                          className="w-full py-1.5 px-3 bg-[#FCF4F7] hover:bg-[#A62970] text-[#851C5A] hover:text-white border border-[#EDE2E9] rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {savedProducts.length > 0 && (
            <div className="p-4 border-t border-[#EDE2E9] bg-[#FCF4F7]">
              <button
                onClick={() => {
                  savedProducts.forEach((p) => {
                    const defaultShade = p.shades && p.shades.length > 0 ? p.shades[0].name : undefined;
                    addToCart(p, 1, defaultShade);
                  });
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 bg-[#38203F] hover:bg-[#851C5A] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
};
