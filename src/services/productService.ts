import axios from 'axios';
import type { Product, Category } from '@/types/product';

/**
 * productService — infrastructure layer for DummyJSON API calls
 *
 * Contains all Axios HTTP calls for product and category data.
 * This is the only file that imports axios — all other layers use this service.
 *
 * Architecture flow:
 *   component → composable → store → productService → DummyJSON API
 *
 * The service is pure functions with no state — it only fetches and returns data.
 * Error handling is done in the store (useProductsStore actions).
 */

const BASE_URL = 'https://dummyjson.com';

/**
 * BEAUTY_CATEGORY_SLUGS — the 6 beauty-related category slugs used throughout the app
 * Used both for fetching products and for filtering the full categories list
 */
export const BEAUTY_CATEGORY_SLUGS = [
  'beauty',
  'fragrances',
  'skin-care',
  'sunglasses',
  'womens-bags',
  'womens-jewellery',
];

/**
 * fetchAllProducts — fetches products from all 6 beauty categories in parallel
 *
 * Uses Promise.all for concurrent requests — faster than sequential fetching.
 * flatMap merges all category arrays into a single product array.
 *
 * @returns Promise<Product[]> — merged array of all beauty products
 * @throws Error if any of the 6 requests fail
 */
export async function fetchAllProducts(): Promise<Product[]> {
  const responses = await Promise.all(
    BEAUTY_CATEGORY_SLUGS.map((slug) =>
      axios.get(`${BASE_URL}/products/category/${slug}`)
    )
  );
  return responses.flatMap((res) => res.data.products);
}

/**
 * fetchProductById — fetches a single product by its numeric id
 *
 * Used by DetailView when navigating to /product/:id
 *
 * @param id - numeric product id from the route param
 * @returns Promise<Product> — the full product object
 * @throws Error if the product is not found (404) or network fails
 */
export async function fetchProductById(id: number): Promise<Product> {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
}

/**
 * fetchBeautyCategories — fetches all categories and filters to beauty-related ones
 *
 * The DummyJSON /categories endpoint returns all categories (furniture, groceries etc).
 * We filter to only the 6 slugs defined in BEAUTY_CATEGORY_SLUGS.
 *
 * @returns Promise<Category[]> — array of beauty-related Category objects
 * @throws Error if the request fails
 */
export async function fetchBeautyCategories(): Promise<Category[]> {
  const res = await axios.get(`${BASE_URL}/products/categories`);
  return res.data.filter((cat: Category) =>
    BEAUTY_CATEGORY_SLUGS.includes(cat.slug)
  );
}
