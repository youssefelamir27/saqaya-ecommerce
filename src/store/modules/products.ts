import axios from 'axios';
import { ActionContext } from 'vuex';
import { Product, ProductsState } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

const state = (): ProductsState => ({
  productList: [],
  selectedProduct: null,
  flashSaleProducts: [],
  exploreProducts: [],
  browseCategories: [
    { name: 'Beauty', icon: '💄' },
    { name: 'Lipstick', icon: '💋' },
    { name: 'Fragrance', icon: '🌸' },
    { name: 'Perfume', icon: '🫧' },
    { name: 'Skincare', icon: '🧴' },
    { name: 'Tools', icon: '🪞' },
  ],
  activeCategory: 'Beauty',
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
// proper type for action context — replaces { commit }: any
type ProductsContext = ActionContext<ProductsState, Record<string, unknown>>;
const actions = {
  // ProductsContext used everywhere instead of any
  async fetchAllProducts({ commit }: ProductsContext) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const [beautyRes, fragranceRes] = await Promise.all([
        axios.get(`${BASE_URL}/products/category/beauty`),
        axios.get(`${BASE_URL}/products/category/fragrances`),
      ]);
      const allProducts: Product[] = [
        ...beautyRes.data.products,
        ...fragranceRes.data.products,
      ];
      commit('SET_PRODUCT_LIST', allProducts);
      commit('SET_FLASH_SALE_PRODUCTS', allProducts.slice(0, 10));
      commit('SET_EXPLORE_PRODUCTS', allProducts.slice(0, 8));
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch products.');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchProductById({ commit }: ProductsContext, id: number) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      commit('SET_SELECTED_PRODUCT', res.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch product.');
    } finally {
      commit('SET_LOADING', false);
    }
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
