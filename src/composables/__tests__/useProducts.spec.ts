import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProducts } from '@/composables/useProducts';
import * as productService from '@/services/productService';

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

describe('useProducts composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('exposes default state correctly', () => {
    const { productList, selectedProduct, isLoading, hasError, errorMessage } = useProducts();
    expect(productList.value.length).toBe(0);
    expect(selectedProduct.value).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(hasError.value).toBe(false);
    expect(errorMessage.value).toBeNull();
  });

  it('fetchAllProducts sets productList on success', async () => {
    mockedService.fetchAllProducts.mockResolvedValueOnce([mockProduct]);
    const { fetchAllProducts, productList, isLoading, hasError } = useProducts();
    await fetchAllProducts();
    expect(productList.value.length).toBe(1);
    expect(isLoading.value).toBe(false);
    expect(hasError.value).toBe(false);
  });

  it('fetchAllProducts sets error on failure', async () => {
    mockedService.fetchAllProducts.mockRejectedValueOnce(new Error('Network error'));
    const { fetchAllProducts, hasError, errorMessage } = useProducts();
    await fetchAllProducts();
    expect(hasError.value).toBe(true);
    expect(errorMessage.value).toBe('Failed to fetch products.');
  });

  it('fetchProductById sets selectedProduct on success', async () => {
    mockedService.fetchProductById.mockResolvedValueOnce(mockProduct);
    const { fetchProductById, selectedProduct } = useProducts();
    await fetchProductById(1);
    expect(selectedProduct.value).toEqual(mockProduct);
  });

  it('fetchProductById sets error on failure', async () => {
    mockedService.fetchProductById.mockRejectedValueOnce(new Error('Not found'));
    const { fetchProductById, hasError, errorMessage } = useProducts();
    await fetchProductById(999);
    expect(hasError.value).toBe(true);
    expect(errorMessage.value).toBe('Failed to fetch product.');
  });

  it('setActiveCategory updates activeCategory', () => {
    const { setActiveCategory, activeCategory } = useProducts();
    setActiveCategory('beauty');
    expect(activeCategory.value).toBe('beauty');
  });

  it('filterByCategory filters exploreProducts by slug', async () => {
  const { filterByCategory, exploreProducts } = useProducts();
  const { useProductsStore } = await import('@/stores/products');
  const store = useProductsStore();
  store.productList = [mockProduct];
  filterByCategory('beauty');
  expect(exploreProducts.value).toContainEqual(mockProduct);
});

  it('fetchCategories sets browseCategories on success', async () => {
    const mockCategories = [
      { slug: 'beauty', name: 'Beauty', url: '...' },
      { slug: 'fragrances', name: 'Fragrances', url: '...' },
    ];
    mockedService.fetchBeautyCategories.mockResolvedValueOnce(mockCategories);
    const { fetchCategories, browseCategories, activeCategory } = useProducts();
    await fetchCategories();
    expect(browseCategories.value.length).toBe(2);
    expect(activeCategory.value).toBe('beauty');
  });

  it('fetchCategories sets error on failure', async () => {
    mockedService.fetchBeautyCategories.mockRejectedValueOnce(new Error('Network error'));
    const { fetchCategories, hasError } = useProducts();
    await fetchCategories();
    expect(hasError.value).toBe(true);
  });
});
