/**
 * Products.store.spec.ts — Unit tests for the products Pinia store
 *
 * Tests the useProductsStore directly — no composable layer involved.
 * productService is fully mocked — no real API calls are made.
 *
 * Test coverage:
 *   - State defaults: productList, selectedProduct, hasError, errorMessage,
 *     isLoading, activeCategory, browseCategories
 *   - Direct state mutations (Pinia allows direct state access in tests)
 *   - fetchAllProducts: success + failure paths
 *   - fetchProductById: success + failure paths
 *   - setActiveCategory: updates state
 *   - fetchCategories: success + failure paths
 *   - filterByCategory: filters by slug, falls back to full list
 *
 * Pattern: setActivePinia(createPinia()) in beforeEach ensures a fresh
 * store instance for every test — prevents state leaking between tests.
 */

import { setActivePinia, createPinia } from 'pinia';
import { useProductsStore } from '@/stores/Products';
import * as productService from '@/services/productService';
import { beforeEach, describe, it, expect, vi } from 'vitest';

// Mock the service layer — store actions call these functions
vi.mock('@/services/productService');
const mockedService = productService as unknown as {
  fetchAllProducts: ReturnType<typeof vi.fn>;
  fetchProductById: ReturnType<typeof vi.fn>;
  fetchBeautyCategories: ReturnType<typeof vi.fn>;
};

const mockProduct = {
  id: 1, title: 'Lipstick', description: 'A lipstick',
  price: 12.99, discountPercentage: 10, rating: 4.5,
  stock: 50, brand: 'Maybelline', category: 'beauty',
  thumbnail: 'url', images: ['url1'],
  availabilityStatus: 'In Stock', shippingInformation: '3 days',
  returnPolicy: '30 days', warrantyInformation: '1 year', reviews: [],
};

describe('products store', () => {
  // Fresh pinia + clear mocks before each test
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  // ── State defaults ─────────────────────────────────────────────────────────

  describe('state defaults', () => {
    it('productList is empty initially', () => {
      const store = useProductsStore();
      expect(store.productList.length).toBe(0);
    });

    it('selectedProduct is null initially', () => {
      const store = useProductsStore();
      expect(store.selectedProduct).toBeNull();
    });

    it('hasError is false initially', () => {
      const store = useProductsStore();
      expect(store.hasError).toBe(false);
    });

    it('errorMessage is null initially', () => {
      const store = useProductsStore();
      expect(store.errorMessage).toBeNull();
    });

    it('isLoading is false initially', () => {
      const store = useProductsStore();
      expect(store.isLoading).toBe(false);
    });

    it('activeCategory is empty string initially', () => {
      const store = useProductsStore();
      expect(store.activeCategory).toBe('');
    });

    it('browseCategories is empty array initially', () => {
      const store = useProductsStore();
      expect(store.browseCategories.length).toBe(0);
    });
  });

  // ── Direct state mutations ─────────────────────────────────────────────────
  // Pinia allows direct state mutation in tests — no commit() needed

  describe('direct state mutations', () => {
    it('setting productList updates state', () => {
      const store = useProductsStore();
      store.productList = [mockProduct];
      expect(store.productList.length).toBe(1);
    });

    it('setting selectedProduct updates state', () => {
      const store = useProductsStore();
      store.selectedProduct = mockProduct;
      expect(store.selectedProduct).toEqual(mockProduct);
    });

    it('setting error updates hasError and errorMessage', () => {
      const store = useProductsStore();
      store.error = 'Failed to fetch products.';
      expect(store.hasError).toBe(true);
      expect(store.errorMessage).toBe('Failed to fetch products.');
    });

    it('clearing error resets hasError', () => {
      const store = useProductsStore();
      store.error = 'some error';
      store.error = null;
      expect(store.hasError).toBe(false);
      expect(store.errorMessage).toBeNull();
    });

    it('setting activeCategory updates state', () => {
      const store = useProductsStore();
      store.activeCategory = 'Fragrance';
      expect(store.activeCategory).toBe('Fragrance');
    });

    it('setting flashSaleProducts updates state', () => {
      const store = useProductsStore();
      store.flashSaleProducts = [mockProduct];
      expect(store.flashSaleProducts.length).toBe(1);
    });

    it('setting exploreProducts updates state', () => {
      const store = useProductsStore();
      store.exploreProducts = [mockProduct];
      expect(store.exploreProducts.length).toBe(1);
    });

    it('setting browseCategories updates state', () => {
      const store = useProductsStore();
      store.browseCategories = [
        { slug: 'beauty', name: 'Beauty', url: '...' },
        { slug: 'fragrances', name: 'Fragrances', url: '...' },
      ];
      expect(store.browseCategories.length).toBe(2);
    });
  });

  // ── Actions ────────────────────────────────────────────────────────────────

  describe('actions', () => {
    it('fetchAllProducts sets productList on success', async () => {
      mockedService.fetchAllProducts.mockResolvedValueOnce([mockProduct]);
      const store = useProductsStore();
      await store.fetchAllProducts();
      expect(store.productList.length).toBe(1);
      expect(store.isLoading).toBe(false);
      expect(store.hasError).toBe(false);
    });

    it('fetchAllProducts sets error on failure', async () => {
      mockedService.fetchAllProducts.mockRejectedValueOnce(new Error('Network error'));
      const store = useProductsStore();
      await store.fetchAllProducts();
      expect(store.hasError).toBe(true);
      expect(store.errorMessage).toBe('Failed to fetch products.');
      expect(store.isLoading).toBe(false);
    });

    it('fetchProductById sets selectedProduct on success', async () => {
      mockedService.fetchProductById.mockResolvedValueOnce(mockProduct);
      const store = useProductsStore();
      await store.fetchProductById(1);
      expect(store.selectedProduct).toEqual(mockProduct);
      expect(store.isLoading).toBe(false);
    });

    it('fetchProductById sets error on failure', async () => {
      mockedService.fetchProductById.mockRejectedValueOnce(new Error('Not found'));
      const store = useProductsStore();
      await store.fetchProductById(999);
      expect(store.hasError).toBe(true);
      expect(store.errorMessage).toBe('Failed to fetch product.');
      expect(store.isLoading).toBe(false);
    });

    it('setActiveCategory updates activeCategory', () => {
      const store = useProductsStore();
      store.setActiveCategory('Skincare');
      expect(store.activeCategory).toBe('Skincare');
    });

    it('fetchCategories sets browseCategories on success', async () => {
      const mockCategories = [
        { slug: 'beauty', name: 'Beauty', url: '...' },
        { slug: 'fragrances', name: 'Fragrances', url: '...' },
        { slug: 'skin-care', name: 'Skin Care', url: '...' },
      ];
      mockedService.fetchBeautyCategories.mockResolvedValueOnce(mockCategories);
      const store = useProductsStore();
      await store.fetchCategories();
      expect(store.browseCategories.length).toBe(3);
      // first category slug set as activeCategory by default
      expect(store.activeCategory).toBe('beauty');
    });

    it('fetchCategories sets error on failure', async () => {
      mockedService.fetchBeautyCategories.mockRejectedValueOnce(new Error('Network error'));
      const store = useProductsStore();
      await store.fetchCategories();
      expect(store.hasError).toBe(true);
    });

    it('filterByCategory filters products by matching slug', () => {
      const store = useProductsStore();
      store.productList = [mockProduct]; // mockProduct.category = 'beauty'
      store.filterByCategory('beauty');
      expect(store.exploreProducts).toContainEqual(mockProduct);
      expect(store.flashSaleProducts).toContainEqual(mockProduct);
    });

    it('filterByCategory falls back to full productList when no match', () => {
      // No products match 'nonexistent-category' — falls back to full list
      const store = useProductsStore();
      store.productList = [mockProduct];
      store.filterByCategory('nonexistent-category');
      expect(store.exploreProducts).toContainEqual(mockProduct);
      expect(store.flashSaleProducts).toContainEqual(mockProduct);
    });
  });
});
