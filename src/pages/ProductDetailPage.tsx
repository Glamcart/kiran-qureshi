import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingBag, Truck, ShieldCheck, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBackToShop: (category?: ProductCategory) => void;
  onNavigateDetail: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBackToShop,
  onNavigateDetail,
  onOpenQuickView
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<string>(
    product.shades && product.shades.length > 0 ? product.shades[0].name : ''
  );
  const [activeTab, setActiveTab] = useState<'details' | 'ritual' | 'ingredients' | 'shipping'>('details');

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShade || undefined);
  };

  // Related products from same category or featured
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 5);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[#777078] mb-6 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => onBackToShop('All')}
          className="hover:text-[#A62970] transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-[#EDE2E9]" />
        <button
          onClick={() => onBackToShop(product.category)}
          className="hover:text-[#A62970] transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 text-[#EDE2E9]" />
        <span className="font-semibold text-[#38203F] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* Left Column: Gallery (5 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FCF4F7] border border-[#EDE2E9] shadow-sm">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-xs bg-white text-[#851C5A] border border-[#EDE2E9]">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnail preview strip */}
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#A62970] bg-[#FCF4F7] p-1 cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {product.category === 'Lips' && (
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#EDE2E9] bg-[#FCF4F7] p-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <img
                  src="/src/assets/images/veloura_journal_lips_1792059215872.jpg"
                  alt="Veloura lip shade application"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold uppercase tracking-widest text-[#A62970]">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-[#38203F]">
                <div className="flex items-center text-[#D7B77A]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-[#D7B77A]' : 'opacity-40'
                      }`}
                    />
                  ))}
                </div>
                <span className="tabular-nums font-bold">{product.rating.toFixed(1)}</span>
                <span className="text-[#777078]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#38203F] tracking-tight mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#777078] mb-4">
              {product.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#EDE2E9]">
              <span className="text-2xl sm:text-3xl font-bold text-[#38203F] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm sm:text-base text-[#777078] line-through tabular-nums">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-[#287A52] bg-[#287A52]/10 px-2.5 py-0.5 rounded-full">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#242026] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Shade Selection (if available) */}
            {product.shades && product.shades.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-[#FCF4F7] border border-[#EDE2E9]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#242026] mb-3">
                  <span>Selected Shade:</span>
                  <span className="text-[#A62970] font-bold">{selectedShade}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.name}
                      onClick={() => setSelectedShade(shade.name)}
                      className={`w-9 h-9 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                        selectedShade === shade.name
                          ? 'ring-2 ring-[#A62970] ring-offset-2 ring-offset-white scale-110 shadow-sm'
                          : 'border border-white/60 hover:scale-105'
                      }`}
                      style={{ backgroundColor: shade.hex }}
                      title={shade.name}
                      aria-label={`Select shade ${shade.name}`}
                    >
                      {selectedShade === shade.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Volume/Weight */}
            {product.volumeOrWeight && (
              <div className="text-xs text-[#777078] mb-6">
                <strong>Format:</strong> {product.volumeOrWeight}
              </div>
            )}
          </div>

          {/* Action Module */}
          <div className="space-y-4 pt-4 border-t border-[#EDE2E9]">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[#EDE2E9] rounded-2xl bg-[#FCF4F7] px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#777078] hover:text-[#242026]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold tabular-nums text-[#242026]">
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

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#A62970] hover:bg-[#851C5A] text-white rounded-2xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className={`p-4 rounded-2xl border border-[#EDE2E9] transition-colors ${
                  isFavorited
                    ? 'bg-[#A62970] text-white'
                    : 'bg-[#FCF4F7] text-[#777078] hover:text-[#A62970]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Reassurance Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#777078]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#A62970]" />
                <span>Free shipping over $59</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#287A52]" />
                <span>30-day effortless returns</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Product Details Tabs / Accordion */}
      <div className="bg-white border border-[#EDE2E9] rounded-3xl p-6 sm:p-8 mb-16 shadow-xs">
        <div className="flex border-b border-[#EDE2E9] overflow-x-auto scrollbar-none gap-6 sm:gap-8 mb-6 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            Formulation & Highlights
          </button>
          <button
            onClick={() => setActiveTab('ritual')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'ritual'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            How to Apply
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'ingredients'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            Ingredients Transparency
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'shipping'
                ? 'border-[#A62970] text-[#A62970]'
                : 'border-transparent text-[#777078] hover:text-[#242026]'
            }`}
          >
            Delivery & Returns
          </button>
        </div>

        <div className="text-xs sm:text-sm text-[#777078] leading-relaxed">
          {activeTab === 'details' && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A62970] mt-1.5 shrink-0" />
                  <span className="text-[#242026]">{detail}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'ritual' && (
            <div>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">The Studio Ritual</h4>
              <p>{product.howToUse}</p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h4 className="font-semibold text-sm text-[#38203F] mb-2">Full Ingredient Transparency</h4>
              <p className="font-mono text-xs bg-[#FCF4F7] p-4 rounded-xl border border-[#EDE2E9] text-[#777078] leading-normal">
                {product.ingredients}
              </p>
              <p className="text-[11px] text-[#777078] mt-2">
                100% cruelty-free, paraben-free, dermatologist formulated.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-[#38203F]">Fast, Complimentary USA Shipping</h4>
              <p>
                Qualifying orders over $59 ship free via standard carrier ground (3–5 business days). Express overnight delivery is available during checkout.
              </p>
              <h4 className="font-semibold text-sm text-[#38203F] pt-2">Love It or Return It</h4>
              <p>
                We offer a complete 30-day happiness guarantee on all Veloura Beauty formulas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Strip */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A62970] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D7B77A]" />
                <span>Harmonious Pairs</span>
              </div>
              <h2 id="related-heading" className="font-editorial text-2xl sm:text-3xl font-semibold text-[#38203F]">
                Complete Your <span className="italic text-[#A62970]">Ritual</span>
              </h2>
            </div>
            <button
              onClick={() => onBackToShop(product.category)}
              className="text-xs font-bold text-[#A62970] hover:underline"
            >
              View More in {product.category} →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenQuickView={onOpenQuickView}
                onNavigateDetail={onNavigateDetail}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
