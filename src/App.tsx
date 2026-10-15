/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { JournalArticleModal } from './components/JournalArticleModal';
import { DemoAccountModal } from './components/DemoAccountModal';
import { DemoCheckoutModal } from './components/DemoCheckoutModal';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';

import { products } from './data/products';
import { Product, ProductCategory, JournalArticle } from './types';

function MainApp() {
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'detail' | 'journal' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  const [shopFilter, setShopFilter] = useState<{
    category: ProductCategory;
    filterType?: 'new' | 'bestseller';
    search?: string;
  }>({ category: 'All' });

  // Modals & Drawers
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [hostingerGuideOpen, setHostingerGuideOpen] = useState(false);
  const [policyState, setPolicyState] = useState<{ isOpen: boolean; policy: PolicyType }>({
    isOpen: false,
    policy: 'shipping'
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Smooth scroll to top when changing primary pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  // Navigation Handlers
  const handleNavigateHome = () => {
    setActivePage('home');
    setSelectedProduct(null);
  };

  const handleNavigateShop = (category: ProductCategory = 'All', filterType?: 'new' | 'bestseller') => {
    setSelectedCategory(category);
    setShopFilter({ category, filterType, search: '' });
    setActivePage('shop');
    setSelectedProduct(null);
  };

  const handleSearch = (query: string, category: ProductCategory = 'All') => {
    setSelectedCategory(category);
    setShopFilter({ category, search: query });
    setActivePage('shop');
    setSelectedProduct(null);
  };

  const handleNavigateDetail = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('detail');
  };

  const handleNavigateJournal = () => {
    setActivePage('journal');
    setSelectedProduct(null);
  };

  const handleNavigateContact = () => {
    setActivePage('contact');
    setSelectedProduct(null);
  };

  const handleOpenPolicy = (policy: PolicyType) => {
    setPolicyState({ isOpen: true, policy });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4] text-[#242026]">
      {/* 1. Promotional Announcement Bar */}
      <AnnouncementBar
        onOpenHostingerGuide={() => setHostingerGuideOpen(true)}
      />

      {/* 2. Main Header */}
      <Header
        onSearch={handleSearch}
        onOpenAccount={() => setAccountOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateShop={(cat) => handleNavigateShop(cat || 'All')}
        onToggleMobileNav={() => setMobileNavOpen(true)}
      />

      {/* 3. Primary Navigation Row */}
      <Navigation
        activePage={activePage}
        onNavigateHome={handleNavigateHome}
        onNavigateShop={handleNavigateShop}
        onNavigateJournal={handleNavigateJournal}
        onNavigateContact={handleNavigateContact}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      {/* 4. Active Page Content */}
      <div className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              handleNavigateShop(cat);
            }}
            onShopCollection={(cat) => handleNavigateShop(cat || 'All')}
            onExploreBestsellers={() => handleNavigateShop('All', 'bestseller')}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigateDetail={handleNavigateDetail}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onViewAllArticles={handleNavigateJournal}
            onViewAllProducts={() => handleNavigateShop('All')}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={shopFilter.category}
            initialSearch={shopFilter.search}
            initialFilterType={shopFilter.filterType}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
            onNavigateDetail={handleNavigateDetail}
          />
        )}

        {activePage === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onBackToShop={(cat) => handleNavigateShop(cat || 'All')}
            onNavigateDetail={handleNavigateDetail}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activePage === 'journal' && (
          <JournalPage
            onSelectArticle={(art) => setSelectedArticle(art)}
            onExploreProducts={() => handleNavigateShop('All')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </div>

      {/* 5. Sophisticated Deep Plum Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateShop={handleNavigateShop}
        onNavigateContact={handleNavigateContact}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenWishlist={() => {}}
        onOpenCart={() => {}}
        onOpenPolicy={handleOpenPolicy}
        onOpenHostingerGuide={() => setHostingerGuideOpen(true)}
      />

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        onProceedCheckout={() => setCheckoutOpen(true)}
        onExploreProducts={() => handleNavigateShop('All')}
      />

      <WishlistDrawer
        onNavigateDetail={handleNavigateDetail}
        onExploreProducts={() => handleNavigateShop('All')}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigateDetail={handleNavigateDetail}
      />

      <JournalArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onExploreProducts={() => handleNavigateShop('All')}
      />

      <DemoAccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
      />

      <DemoCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onOrderCompleted={() => handleNavigateHome()}
      />

      <HostingerGuideModal
        isOpen={hostingerGuideOpen}
        onClose={() => setHostingerGuideOpen(false)}
      />

      <PolicyModal
        isOpen={policyState.isOpen}
        initialPolicy={policyState.policy}
        onClose={() => setPolicyState({ ...policyState, isOpen: false })}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <MainApp />
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
