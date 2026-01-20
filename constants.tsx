
import { Product, Category, Demographic } from './types';

const BRANDS = [
  'LuxView', 'Aura Luxury', 'Titan Noir', 'Maison de Mode', 
  'Rogue Heritage', 'Nordic Minimal', 'Zenith Watches', 
  'Ethereal Gems', 'Luna & Co', 'Heritage Gold'
];

const CATEGORY_DETAILS: Record<Category, { 
  type: 'face' | 'body', 
  materials: string[], 
  features: string[],
  images: string[]
}> = {
  'Eyewear': {
    type: 'face',
    materials: ['Italian Acetate', 'Titanium', '18k Gold Plated', 'Recycled Plastic'],
    features: ['UV400 Protection', 'Polarized Lenses', 'Hand-Polished', 'Anti-Reflective'],
    images: ['1572635196237-14b3f281503f', '1511499767323-afe89d9db310', '1577803645773-f96470509666', '1473496169904-658ba7c44d8a']
  },
  'Jewelry': {
    type: 'face',
    materials: ['925 Sterling Silver', 'Rose Gold', 'Freshwater Pearls', 'Conflict-Free Diamonds'],
    features: ['Limited Edition', 'Adjustable Chain', 'Hand-Set Stones', 'Hypoallergenic'],
    images: ['1535632066927-ab7c9ab60908', '1599643478518-a784e5dc4c8f', '1605100804763-247f67b3f41e', '1515562141207-7a88fb7ce338']
  },
  'Apparel': {
    type: 'body',
    materials: ['Mulberry Silk', 'Organic Cotton', 'Egyptian Linen', 'Merino Wool'],
    features: ['Tailored Fit', 'Breathable Fabric', 'Eco-Dye Process', 'Wrinkle-Resistant'],
    images: ['1566174053879-31528523f8ae', '1591047139829-d91aecb6caea', '1539533377285-a92cc8672018', '1596755094514-f87e34085b2c']
  },
  'Watches': {
    type: 'body',
    materials: ['Stainless Steel', 'Sapphire Crystal', 'Full-Grain Leather', 'Ceramic'],
    features: ['Automatic Movement', 'Waterproof 100m', 'Luminous Dial', 'Swiss Precision'],
    images: ['1524592094714-0f0654e20314', '1522337360788-8b13dee7a37e', '1508685096489-7aac29623b66', '1547996160-81dfa63595aa']
  },
  'Footwear': {
    type: 'body',
    materials: ['Italian Suede', 'Napa Leather', 'Eco-Canvas', 'Memory Foam'],
    features: ['Ergonomic Sole', 'Anti-Slip Grip', 'Hand-Stitched', 'Lightweight Design'],
    images: ['1542291026-7eec264c27ff', '1549298916-b41d501d3772', '1606107557195-0e29a4b5b4aa', '1525966222134-fcfa99b8ae77']
  },
  'Handbags': {
    type: 'body',
    materials: ['Vegan Leather', 'Pebbled Calfskin', 'Velvet', 'Brass Hardware'],
    features: ['Secret Compartment', 'Convertible Strap', 'Reinforced Base', 'RFID Protection'],
    images: ['1584917865391-492920125cc9', '1594032135850-b1d2321c2727', '1591561954957-2f96ca2681d1', '1548036328-c9fa89d128fa']
  }
};

const generateMockProducts = (): Product[] => {
  const products: Product[] = [];
  const demographics: Demographic[] = ['Women', 'Men', 'Child'];
  const categories: Category[] = ['Eyewear', 'Jewelry', 'Apparel', 'Watches', 'Handbags', 'Footwear'];

  demographics.forEach((demo) => {
    categories.forEach((cat) => {
      const detail = CATEGORY_DETAILS[cat];
      for (let i = 1; i <= 10; i++) {
        const id = `${demo.toLowerCase()}-${cat.toLowerCase()}-${i}`;
        const imgId = detail.images[i % detail.images.length];
        const material = detail.materials[i % detail.materials.length];
        const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
        
        products.push({
          id,
          name: `${demo} ${cat} ${i}`,
          brand,
          price: 120 + Math.floor(Math.random() * 1800),
          category: cat,
          demographic: demo,
          imageUrl: `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=600`,
          overlayUrl: '',
          type: detail.type,
          material,
          features: [...detail.features].sort(() => 0.5 - Math.random()).slice(0, 2),
          description: `A masterfully crafted piece from ${brand}, designed for the modern ${demo.toLowerCase()} style. Featuring ${material.toLowerCase()} and signature artisanal detailing.`
        });
      }
    });
  });

  return products;
};

export const MOCK_PRODUCTS: Product[] = generateMockProducts();

export const THEME = {
  primary: '#1A1A1A',
  accent: '#D4AF37',
  background: '#FAFAFA',
  white: '#FFFFFF',
  gray: '#F3F4F6'
};
