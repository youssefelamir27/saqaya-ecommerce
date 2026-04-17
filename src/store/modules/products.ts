import {
  Product,
  ProductsState,
  Category,
  ProductsContext,
} from '@/types/product';
import * as productService from '@/services/productService';

const state = (): ProductsState => ({
  productList: [],
  selectedProduct: null,
  flashSaleProducts: [],
  exploreProducts: [],
  browseCategories: [],
  activeCategory: '',
  loading: false,
  error: null,
});

const getters = {
  productList: (state: ProductsState) => state.productList,
  selectedProduct: (state: ProductsState) => state.selectedProduct,
  flashSaleProducts: (state: ProductsState) => state.flashSaleProducts,
  exploreProducts: (state: ProductsState) => state.exploreProducts,
  browseCategories: (state: ProductsState) => state.browseCategories,
  activeCategory: (state: ProductsState) => state.activeCategory,
  isLoading: (state: ProductsState) => state.loading,
  hasError: (state: ProductsState): boolean => !!state.error,
  errorMessage: (state: ProductsState): string | null => state.error,
};

const mutations = {
  SET_PRODUCT_LIST(state: ProductsState, products: Product[]) {
    state.productList = products;
  },
  SET_SELECTED_PRODUCT(state: ProductsState, product: Product) {
    state.selectedProduct = product;
  },
  SET_FLASH_SALE_PRODUCTS(state: ProductsState, products: Product[]) {
    state.flashSaleProducts = products;
  },
  SET_EXPLORE_PRODUCTS(state: ProductsState, products: Product[]) {
    state.exploreProducts = products;
  },
  SET_BROWSE_CATEGORIES(state: ProductsState, categories: Category[]) {
    state.browseCategories = categories;
  },
  SET_ACTIVE_CATEGORY(state: ProductsState, category: string) {
    state.activeCategory = category;
  },
  SET_LOADING(state: ProductsState, status: boolean) {
    state.loading = status;
  },
  SET_ERROR(state: ProductsState, error: string | null) {
    state.error = error;
  },
};

const actions = {
  async fetchAllProducts({ commit }: ProductsContext) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const allProducts = await productService.fetchAllProducts();
      commit('SET_PRODUCT_LIST', allProducts);
      commit('SET_FLASH_SALE_PRODUCTS', allProducts.slice(0, 10));
      commit('SET_EXPLORE_PRODUCTS', allProducts.slice(0, 8));
    } catch {
      commit('SET_ERROR', 'Failed to fetch products.');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchProductById({ commit }: ProductsContext, id: number) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const product = await productService.fetchProductById(id);
      commit('SET_SELECTED_PRODUCT', product);
    } catch {
      commit('SET_ERROR', 'Failed to fetch product.');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchCategories({ commit }: ProductsContext) {
    try {
      const beautyCategories = await productService.fetchBeautyCategories();
      commit('SET_BROWSE_CATEGORIES', beautyCategories);
      if (beautyCategories.length > 0) {
        commit('SET_ACTIVE_CATEGORY', beautyCategories[0].slug);
      }
    } catch {
      commit('SET_ERROR', 'Failed to fetch categories.');
    }
  },

  filterByCategory({ commit, state }: ProductsContext, slug: string) {
    const filtered = state.productList.filter(
      (p: Product) => p.category === slug
    );
    const products = filtered.length > 0 ? filtered : state.productList;
    commit('SET_EXPLORE_PRODUCTS', products.slice(0, 8));
    commit('SET_FLASH_SALE_PRODUCTS', products.slice(0, 10));
  },

  setActiveCategory({ commit }: ProductsContext, category: string) {
    commit('SET_ACTIVE_CATEGORY', category);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
