import axios from 'axios';
import { Product, Category } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export const BEAUTY_CATEGORY_SLUGS = [
  'beauty',
  'fragrances',
  'skin-care',
  'sunglasses',
  'womens-bags',
  'womens-jewellery',
];

export async function fetchAllProducts(): Promise<Product[]> {
  const responses = await Promise.all(
    BEAUTY_CATEGORY_SLUGS.map((slug) =>
      axios.get(`${BASE_URL}/products/category/${slug}`)
    )
  );
  return responses.flatMap((res) => res.data.products);
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
}

export async function fetchBeautyCategories(): Promise<Category[]> {
  const res = await axios.get(`${BASE_URL}/products/categories`);
  return res.data.filter((cat: Category) =>
    BEAUTY_CATEGORY_SLUGS.includes(cat.slug)
  );
}
