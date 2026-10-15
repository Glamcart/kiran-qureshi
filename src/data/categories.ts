import { ProductCategory } from '../types';

export interface CategoryItem {
  id: ProductCategory;
  name: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export const categories: CategoryItem[] = [
  {
    id: 'Face',
    name: 'Face',
    tagline: 'Flawless veil & radiant glow',
    image: '/src/assets/images/veloura_product_powder_1792059158722.jpg',
    itemCount: 4
  },
  {
    id: 'Lips',
    name: 'Lips',
    tagline: 'Velvet mattes & glass tints',
    image: '/src/assets/images/veloura_promo_lipstick_1792059115078.jpg',
    itemCount: 6
  },
  {
    id: 'Eyes',
    name: 'Eyes',
    tagline: 'Curated palettes & lift mascaras',
    image: '/src/assets/images/veloura_promo_eyeshadow_1792059115808.jpg',
    itemCount: 5
  },
  {
    id: 'Skincare',
    name: 'Skincare',
    tagline: 'Pure botanicals & active hydrators',
    image: '/src/assets/images/veloura_product_serum_1792059115641.jpg',
    itemCount: 8
  },
  {
    id: 'Brushes',
    name: 'Brushes',
    tagline: 'Vegan bristles & precision handles',
    image: '/src/assets/images/veloura_product_brushes_1792059157440.jpg',
    itemCount: 3
  },
  {
    id: 'Fragrance',
    name: 'Fragrance',
    tagline: 'Artisanal Grasse perfume notes',
    image: '/src/assets/images/veloura_promo_perfume_1792059115742.jpg',
    itemCount: 4
  },
  {
    id: 'Beauty Tools',
    name: 'Beauty Tools',
    tagline: 'Micro-pore sponges & sculptors',
    image: '/src/assets/images/veloura_product_sponge_1792059158522.jpg',
    itemCount: 3
  }
];
