import axios from 'axios';
import type { Product } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchProductSummary(productId: string): Promise<Product> {
  const { data } = await axios.get(`${API_BASE}/api/products/${productId}`);
  return data.data;
}
