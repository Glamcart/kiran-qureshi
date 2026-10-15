import React from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onNavigateDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onNavigateDetail
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultShade = product.shades && product.shades.length > 0 ? product.shades[0].name : undefined;
    addToCart(product, 1, defaultShade);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenQuickView(product);
  };

  return (
    <div
      onClick={() => onNavigateDetail(product)}
      className="group relative bg-white border border-[#EDE2E9] rounded-2xl overflow-hidden hover:border-[#A62970]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
    >
      {/* Upper Area: Image + Badges */}
      <div className="relative w-full aspect-square bg-[#FCF4F7] overflow-hidden">
        
        {/* Top-Left Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs bg-white text-[#851C5A] border border-[#EDE2E9]">
            {product.badge}
          </span>
        )}

        {/* Top-Right Wishlist Heart */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-[#A62970] text-white shadow-sm'
              : 'bg-white/90 text-[#777078] hover:text-[#A62970] hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex">
          <button
            onClick={handleQuickView}
            className="w-full py-2 bg-white/95 hover:bg-white text-[#38203F] hover:text-[#A62970] rounded-xl text-xs font-semibold shadow-md border border-[#EDE2E9] backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Descriptor */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#777078]">
              {product.category}
            </span>
            
            {/* Rating */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#38203F]">
              <Star className="w-3 h-3 fill-[#D7B77A] text-[#D7B77A]" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-editorial text-sm sm:text-base font-semibold text-[#242026] group-hover:text-[#A62970] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Short Subtitle */}
          <p className="text-[11px] text-[#777078] line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#EDE2E9]/60">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-[#38203F] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#777078] line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-3 bg-[#FCF4F7] hover:bg-[#A62970] text-[#851C5A] hover:text-white border border-[#EDE2E9] hover:border-[#A62970] rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group/btn shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
