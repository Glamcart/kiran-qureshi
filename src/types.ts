export type ProductCategory = 
  | 'All'
  | 'Face' 
  | 'Lips' 
  | 'Eyes' 
  | 'Skincare' 
  | 'Brushes' 
  | 'Fragrance' 
  | 'Beauty Tools';

export interface ShadeOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'BESTSELLER' | 'SAVE 20%' | 'SAVE 15%' | 'LIMITED';
  image: string;
  additionalImages?: string[];
  description: string;
  details: string[];
  ingredients: string;
  howToUse: string;
  shades?: ShadeOption[];
  volumeOrWeight?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  content: string[];
}
