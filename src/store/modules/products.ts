import axios from 'axios';
import {
  Product,
  ProductsState,
  Category,
  ProductsContext,
} from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

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

//  ProductsContext imported from types/product.ts — no longer defined here
const actions = {
  async fetchAllProducts({ commit }: ProductsContext) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    try {
      const [
        beautyRes,
        fragranceRes,
        skinCareRes,
        sunglassesRes,
        bagsRes,
        jewelleryRes,
      ] = await Promise.all([
        axios.get(`${BASE_URL}/products/category/beauty`),
        axios.get(`${BASE_URL}/products/category/fragrances`),
        axios.get(`${BASE_URL}/products/category/skin-care`),
        axios.get(`${BASE_URL}/products/category/sunglasses`),
        axios.get(`${BASE_URL}/products/category/womens-bags`),
        axios.get(`${BASE_URL}/products/category/womens-jewellery`),
      ]);
      const allProducts: Product[] = [
        ...beautyRes.data.products,
        ...fragranceRes.data.products,
        ...skinCareRes.data.products,
        ...sunglassesRes.data.products,
        ...bagsRes.data.products,
        ...jewelleryRes.data.products,
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

  async fetchCategories({ commit }: ProductsContext) {
    try {
      const res = await axios.get(`${BASE_URL}/products/categories`);
      const beautyCategories: Category[] = res.data.filter((cat: Category) =>
        [
          'beauty',
          'fragrances',
          'skin-care',
          'sunglasses',
          'womens-bags',
          'womens-jewellery',
        ].includes(cat.slug)
      );
      commit('SET_BROWSE_CATEGORIES', beautyCategories);
      if (beautyCategories.length > 0) {
        commit('SET_ACTIVE_CATEGORY', beautyCategories[0].slug);
      }
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch categories.');
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
