export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku?: string;
  images?: string;
  material?: string;
  category_id?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
