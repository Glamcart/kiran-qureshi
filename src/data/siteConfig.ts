export const siteConfig = {
  brandName: 'Veloura Beauty',
  descriptor: 'BEAUTY STORE',
  tagline: 'Your destination for thoughtfully selected makeup, skincare, and beauty essentials.',
  freeShippingThreshold: 59.00,
  promoDiscountPercentage: 10,
  promoCode: 'VELOURA10',
  announcements: [
    { text: 'Complimentary Shipping on Orders $59+', icon: 'truck' },
    { text: 'Enjoy 10% Off Your First Order with code VELOURA10', icon: 'sparkles' },
    { text: 'Complimentary Deluxe Samples with Every Order', icon: 'gift' }
  ],
  socialLinks: {
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com'
  },
  contact: {
    email: 'concierge@velourabeauty.com',
    phone: '+1 (800) 835-6872',
    address: '450 Madison Avenue, Suite 12B, New York, NY 10022',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM EST'
  },
  benefits: [
    {
      id: 'shipping',
      title: 'Complimentary Shipping',
      description: 'On all qualifying orders $59+',
      icon: 'Truck'
    },
    {
      id: 'security',
      title: 'Secure Checkout',
      description: 'Protected 256-bit SSL encryption',
      icon: 'ShieldCheck'
    },
    {
      id: 'returns',
      title: 'Easy 30-Day Returns',
      description: 'Hassle-free return policy',
      icon: 'RotateCcw'
    },
    {
      id: 'support',
      title: 'Here to Help',
      description: 'Dedicated beauty concierge',
      icon: 'Headphones'
    }
  ],
  hostingerDeployment: {
    targetDir: 'public_html',
    buildCommand: 'npm run build',
    outputFolder: 'dist',
    htaccessContent: `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`
  }
};
