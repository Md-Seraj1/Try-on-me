
export type Category = 'Jewelry' | 'Eyewear' | 'Apparel' | 'Watches' | 'Handbags' | 'Footwear';
export type Demographic = 'Men' | 'Women' | 'Child' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  demographic: Demographic;
  imageUrl: string;
  overlayUrl: string;
  type: 'face' | 'body';
  material: string;
  features: string[];
  description: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export type AppScreen = 'SPLASH' | 'ONBOARDING' | 'AUTH' | 'HOME' | 'PRODUCT_LIST' | 'TRY_ON' | 'PROFILE';
