export interface Shop {
  id: string;
  reg_no: string;
  shop_name: string;
  shop_owner_name: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
  services: string[];
  google_maps_url: string;
  youtube_link?: string;
  image: string;
  categories: string[];
  rating: number;
  review_count: number;
  created_at: string;
}

export interface User {
  userid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin' | 'shop_owner';
}

export interface Review {
  id: string;
  shop_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export const CATEGORIES = [
  { id: 'grocery', name: 'Grocery', icon: 'ShoppingCart' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'clothing', name: 'Clothing', icon: 'Shirt' },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'Pill' },
  { id: 'restaurant', name: 'Restaurant', icon: 'UtensilsCrossed' },
  { id: 'hardware', name: 'Hardware', icon: 'Wrench' },
  { id: 'bakery', name: 'Bakery', icon: 'Croissant' },
  { id: 'salon', name: 'Salon', icon: 'Scissors' },
  { id: 'automotive', name: 'Automotive', icon: 'Car' },
  { id: 'jewelry', name: 'Jewelry', icon: 'Gem' },
  { id: 'services', name: 'Services', icon: 'Briefcase' },
  { id: 'other', name: 'Other', icon: 'Store' },
] as const;
