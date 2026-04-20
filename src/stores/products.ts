import { defineStore } from 'pinia';
import type { Product, Category } from '@/types/product';
import * as productService from '@/services/productService';

/**
 * useProductsStore — Pinia store for product catalog state
 *
 * Manages all product-related state including the product list, selected product,
 * flash sale items, explore products, categories, and loading/error states.
 *
 * API calls are delegated to productService — the store only handles state.
 * In Vue 2 this was a Vuex module with mutations, actions, and getters.
 * In Vue 3 + Pinia, everything is unified into actions and getters.
 *
 * Flow: component → useProducts composable → useProductsStore → productService → API
 * Components should never import this store directly — use useProducts() instead.
 */
export const useProductsStore = defineStore('products', {
  /**
   * state — reactive data for the product catalog
   *
   * @property productList - full list of all fetched products
   * @property selectedProduct - currently viewed product on DetailView
   * @property flashSaleProducts - first 10 products shown in Flash Sale section
   * @property exploreProducts - first 8 products shown in Explore section
   * @property browseCategories - beauty categories fetched from API
   * @property activeCategory - currently selected category slug
   * @property loading - true while any async action is in progress
   * @property error - error message string, null when no error
   */
  state: () => ({
    productList: [] as Product[],
    selectedProduct: null as Product | null,
    flashSaleProducts: [] as Product[],
    exploreProducts: [] as Product[],
    browseCategories: [] as Category[],
    activeCategory: '' as string,
    loading: false as boolean,
    error: null as string | null,
  }),

  /**
   * getters — computed values derived from state
   * Provide consistent boolean/null helpers for error and loading state
   */
  getters: {
    /** isLoading — true while an async action is running */
    isLoading: (state) => state.loading,

    /** hasError — true when error is a non-empty string */
    hasError: (state): boolean => !!state.error,

    /** errorMessage — the current error string, or null if no error */
    errorMessage: (state): string | null => state.error,
  },

  /**
   * actions — async and sync methods that mutate state directly
   * All API calls go through productService — store never calls axios directly
   */
  actions: {
    /**
     * fetchAllProducts — fetches products from all 6 beauty categories in parallel
     * Sets productList, flashSaleProducts, and exploreProducts on success
     */
    async fetchAllProducts() {
      this.loading = true;
      this.error = null;
      try {
        const allProducts = await productService.fetchAllProducts();
        this.productList = allProducts;
        // first 10 used for flash sale section
        this.flashSaleProducts = allProducts.slice(0, 10);
        // first 8 used for explore section
        this.exploreProducts = allProducts.slice(0, 8);
      } catch {
        this.error = 'Failed to fetch products.';
      } finally {
        this.loading = false;
      }
    },

    /**
     * fetchProductById — fetches a single product by id for DetailView
     * @param id - numeric product id from the route param
     */
    async fetchProductById(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const product = await productService.fetchProductById(id);
        this.selectedProduct = product;
      } catch {
        this.error = 'Failed to fetch product.';
      } finally {
        this.loading = false;
      }
    },

    /**
     * fetchCategories — fetches and filters beauty-related categories from API
     * Sets browseCategories and defaults activeCategory to the first slug
     */
    async fetchCategories() {
      try {
        const beautyCategories = await productService.fetchBeautyCategories();
        this.browseCategories = beautyCategories;
        // default to first category on load
        if (beautyCategories.length > 0 && beautyCategories[0]) {
          this.activeCategory = beautyCategories[0].slug;
        }
      } catch {
        this.error = 'Failed to fetch categories.';
      }
    },

    /**
     * filterByCategory — filters exploreProducts and flashSaleProducts by category slug
     * Falls back to full productList if no products match the slug
     * @param slug - category slug to filter by e.g. 'beauty', 'fragrances'
     */
    filterByCategory(slug: string) {
      const filtered = this.productList.filter(
        (p: Product) => p.category === slug
      );
      // fallback to full list if category has no matching products
      const products = filtered.length > 0 ? filtered : this.productList;
      this.exploreProducts = products.slice(0, 8);
      this.flashSaleProducts = products.slice(0, 10);
    },

    /**
     * setActiveCategory — updates the active category highlight in BrowseCategory
     * @param category - category slug to set as active
     */
    setActiveCategory(category: string) {
      this.activeCategory = category;
    },
  },
});
