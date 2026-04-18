import { defineStore } from 'pinia';
import type { Product, Category } from '@/types/product';
import * as productService from '@/services/productService';

// defineStore replaces Vuex's namespaced module
// first arg is the store id — used for devtools and persistence
export const useProductsStore = defineStore('products', {
  // state replaces Vuex state() — same pattern
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

  // getters replace Vuex getters — computed values derived from state
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state): boolean => !!state.error,
    errorMessage: (state): string | null => state.error,
  },

  // actions replace both Vuex actions AND mutations
  // no commit() needed — just mutate state directly
  actions: {
    async fetchAllProducts() {
      this.loading = true;
      this.error = null;
      try {
        const allProducts = await productService.fetchAllProducts();
        this.productList = allProducts;
        this.flashSaleProducts = allProducts.slice(0, 10);
        this.exploreProducts = allProducts.slice(0, 8);
      } catch {
        this.error = 'Failed to fetch products.';
      } finally {
        this.loading = false;
      }
    },

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
    async fetchCategories() {
  try {
    const beautyCategories = await productService.fetchBeautyCategories();
    this.browseCategories = beautyCategories;
    if (beautyCategories.length > 0 && beautyCategories[0]) {
      this.activeCategory = beautyCategories[0].slug;
    }
  } catch {
    this.error = 'Failed to fetch categories.';
  }
},

    filterByCategory(slug: string) {
      const filtered = this.productList.filter(
        (p: Product) => p.category === slug
      );
      const products = filtered.length > 0 ? filtered : this.productList;
      this.exploreProducts = products.slice(0, 8);
      this.flashSaleProducts = products.slice(0, 10);
    },

    setActiveCategory(category: string) {
      this.activeCategory = category;
    },
  },
});
