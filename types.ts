export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  brand: string;
  isAffiliate: boolean;
  affiliateLink: string | null;
  storeName: string | null;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  id: number;
  date: string;
  revenue: number;
  visitors: number;
  orders: number;
}
