import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { PromoCards } from '../components/PromoCards';
import { CategorySection } from '../components/CategorySection';
import { ProductGrid } from '../components/ProductGrid';
import { BenefitsStrip } from '../components/BenefitsStrip';
import { JournalSection } from '../components/JournalSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { Product, ProductCategory, JournalArticle } from '../types';

interface HomePageProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onShopCollection: (category?: ProductCategory) => void;
  onExploreBestsellers: () => void;
  onOpenQuickView: (product: Product) => void;
  onNavigateDetail: (product: Product) => void;
  onSelectArticle: (article: JournalArticle) => void;
  onViewAllArticles: () => void;
  onViewAllProducts: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onShopCollection,
  onExploreBestsellers,
  onOpenQuickView,
  onNavigateDetail,
  onSelectArticle,
  onViewAllArticles,
  onViewAllProducts
}) => {
  return (
    <main>
      {/* 1. Large Editorial Beauty Hero */}
      <HeroSection
        onShopCollection={onShopCollection}
        onExploreBestsellers={onExploreBestsellers}
      />

      {/* 2. Three Promotional Collection Cards */}
      <PromoCards
        onNavigatePromo={(category, filterType) => {
          onShopCollection(category);
        }}
      />

      {/* 3. Shop by Category (7 Circular items) */}
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          onSelectCategory(category);
          onShopCollection(category);
        }}
      />

      {/* 4. Featured Beauty Finds (5 Cards Per Row on Desktop) */}
      <ProductGrid
        products={products}
        onOpenQuickView={onOpenQuickView}
        onNavigateDetail={onNavigateDetail}
        onViewAll={onViewAllProducts}
      />

      {/* 5. Trust and Shopping Benefits Strip */}
      <BenefitsStrip />

      {/* 6. Editorial Beauty Journal ("The Beauty Edit") */}
      <JournalSection
        onSelectArticle={onSelectArticle}
        onViewAllArticles={onViewAllArticles}
      />

      {/* 7. Newsletter / Beauty Club Section */}
      <NewsletterSection />
    </main>
  );
};
