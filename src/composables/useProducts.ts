import { computed } from 'vue';
import { useProductsStore } from '@/stores/Products';
/**
 * useProducts — application layer composable
 *
 * Wraps the products Pinia store and exposes a clean, typed API to components.
 * This is the ONLY way components should interact with product state.
 * Components never import useProductsStore directly.
 *
 * Architecture flow:
 *   component → useProducts() → useProductsStore → productService → DummyJSON API
 *
 * Exposed state (readonly computed refs):
 *   - productList: full list of all fetched products
 *   - selectedProduct: currently viewed product (DetailView)
 *   - flashSaleProducts: first 10 products for Flash Sale section
 *   - exploreProducts: first 8 products for Explore section
 *   - browseCategories: beauty categories from API
 *   - activeCategory: currently selected category slug
 *   - isLoading: true while any async action is running
 *   - hasError: true when an error occurred
 *   - errorMessage: the error string, or null
 *
 * Exposed actions:
 *   - fetchAllProducts, fetchProductById, fetchCategories
 *   - filterByCategory, setActiveCategory
 */
export function useProducts() {
  const store = useProductsStore();

  // ─── State (exposed as readonly computed refs) ───────────────────────────

  /** productList — full list of all products fetched from the API */
  const productList = computed(() => store.productList);

  /** selectedProduct — the product currently being viewed on DetailView */
  const selectedProduct = computed(() => store.selectedProduct);

  /** flashSaleProducts — first 10 products displayed in the Flash Sale section */
  const flashSaleProducts = computed(() => store.flashSaleProducts);

  /** exploreProducts — first 8 products displayed in the Explore section */
  const exploreProducts = computed(() => store.exploreProducts);

  /** browseCategories — beauty-related categories fetched from the API */
  const browseCategories = computed(() => store.browseCategories);

  /** activeCategory — the currently selected category slug e.g. 'beauty' */
  const activeCategory = computed(() => store.activeCategory);

  /** isLoading — true while an async fetch action is in progress */
  const isLoading = computed(() => store.isLoading);

  /** hasError — true when the last action resulted in an error */
  const hasError = computed(() => store.hasError);

  /** errorMessage — the current error string, or null if no error */
  const errorMessage = computed(() => store.errorMessage);

  // ─── Actions ─────────────────────────────────────────────────────────────

  /**
   * fetchAllProducts — fetches products from all 6 beauty categories in parallel
   * Populates productList, flashSaleProducts, and exploreProducts
   */
  async function fetchAllProducts(): Promise<void> {
    await store.fetchAllProducts();
  }

  /**
   * fetchProductById — fetches a single product for the DetailView
   * @param id - numeric product id from the route param (/product/:id)
   */
  async function fetchProductById(id: number): Promise<void> {
    await store.fetchProductById(id);
  }

  /**
   * fetchCategories — fetches and filters beauty categories from the API
   * Populates browseCategories and sets the first category as active
   */
  async function fetchCategories(): Promise<void> {
    await store.fetchCategories();
  }

  /**
   * filterByCategory — filters exploreProducts and flashSaleProducts by slug
   * Falls back to full productList if no products match
   * @param slug - category slug e.g. 'beauty', 'fragrances', 'skin-care'
   */
  function filterByCategory(slug: string): void {
    store.filterByCategory(slug);
  }

  /**
   * setActiveCategory — updates the active category highlight in BrowseCategory
   * @param category - category slug to set as active
   */
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
