import { computed } from 'vue';
import { useProductsStore } from '@/stores/products';

/**
 * useProducts — application layer composable
 *
 * Wraps the products Pinia store and exposes a clean API to components.
 * Components never import the store directly — they use this composable.
 *
 * Flow: component → useProducts → store → service
 */
export function useProducts() {
  const store = useProductsStore();

  // expose state as readonly computed refs
  const productList = computed(() => store.productList);
  const selectedProduct = computed(() => store.selectedProduct);
  const flashSaleProducts = computed(() => store.flashSaleProducts);
  const exploreProducts = computed(() => store.exploreProducts);
  const browseCategories = computed(() => store.browseCategories);
  const activeCategory = computed(() => store.activeCategory);
  const isLoading = computed(() => store.isLoading);
  const hasError = computed(() => store.hasError);
  const errorMessage = computed(() => store.errorMessage);

  // actions
  async function fetchAllProducts(): Promise<void> {
    await store.fetchAllProducts();
  }

  async function fetchProductById(id: number): Promise<void> {
    await store.fetchProductById(id);
  }

  async function fetchCategories(): Promise<void> {
    await store.fetchCategories();
  }

  function filterByCategory(slug: string): void {
    store.filterByCategory(slug);
  }

  function setActiveCategory(category: string): void {
    store.setActiveCategory(category);
  }

  return {
    // state
    productList,
    selectedProduct,
    flashSaleProducts,
    exploreProducts,
    browseCategories,
    activeCategory,
    isLoading,
    hasError,
    errorMessage,
    // actions
    fetchAllProducts,
    fetchProductById,
    fetchCategories,
    filterByCategory,
    setActiveCategory,
  };
}
