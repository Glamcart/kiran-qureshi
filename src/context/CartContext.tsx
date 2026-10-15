import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { siteConfig } from '../data/siteConfig';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, shade?: string) => void;
  updateQuantity: (productId: string, quantity: number, shade?: string) => void;
  removeFromCart: (productId: string, shade?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  totalItemCount: number;
  freeShippingProgress: number;
  isFreeShipping: boolean;
  amountNeededForFreeShipping: number;
  promoCode: string;
  appliedPromo: string | null;
  discountAmount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  orderTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'veloura_cart_items';
const PROMO_STORAGE_KEY = 'veloura_applied_promo';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode] = useState(siteConfig.promoCode);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving promo to localStorage', e);
    }
  }, [appliedPromo]);

  const addToCart = (product: Product, quantity = 1, shade?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedShade === shade
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedShade: shade }];
      }
    });

    const shadeText = shade ? ` (${shade})` : '';
    showToast(`Added ${product.name}${shadeText} to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number, shade?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, shade);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedShade === shade) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, shade?: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedShade === shade)
      )
    );
    showToast('Item removed from your bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === siteConfig.promoCode) {
      setAppliedPromo(clean);
      showToast('10% off promotional code applied!', 'success');
      return true;
    } else {
      showToast('Invalid promotional code. Try VELOURA10', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promotional code removed', 'info');
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const discountAmount = appliedPromo
    ? Number((cartSubtotal * (siteConfig.promoDiscountPercentage / 100)).toFixed(2))
    : 0;

  const isFreeShipping = cartSubtotal >= siteConfig.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(
    0,
    Number((siteConfig.freeShippingThreshold - cartSubtotal).toFixed(2))
  );

  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / siteConfig.freeShippingThreshold) * 100)
  );

  const orderTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        totalItemCount,
        freeShippingProgress,
        isFreeShipping,
        amountNeededForFreeShipping,
        promoCode,
        appliedPromo,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        orderTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
