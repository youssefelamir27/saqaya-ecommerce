import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  availabilityStatus: string
  shippingInformation: string
  returnPolicy: string
  warrantyInformation: string
  reviews: Review[]
}

interface ProductsState {
  productList: Product[]
  selectedProduct: Product | null
  flashSaleProducts: Product[]
  exploreProducts: Product[]
  browseCategories: { name: string; icon: string }[]
  activeCategory: string
  loading: boolean
  error: string | null
}

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
})

const getters = {
  productList:        (state: ProductsState) => state.productList,
  selectedProduct:    (state: ProductsState) => state.selectedProduct,
  flashSaleProducts:  (state: ProductsState) => state.flashSaleProducts,
  exploreProducts:    (state: ProductsState) => state.exploreProducts,
  browseCategories:   (state: ProductsState) => state.browseCategories,
  activeCategory:     (state: ProductsState) => state.activeCategory,
  isLoading:          (state: ProductsState) => state.loading,
  hasError:           (state: ProductsState) => state.error,
}

const mutations = {
  SET_PRODUCT_LIST(state: ProductsState, products: Product[]) {
    state.productList = products
  },
  SET_SELECTED_PRODUCT(state: ProductsState, product: Product) {
    state.selectedProduct = product
  },
  SET_FLASH_SALE_PRODUCTS(state: ProductsState, products: Product[]) {
    state.flashSaleProducts = products
  },
  SET_EXPLORE_PRODUCTS(state: ProductsState, products: Product[]) {
    state.exploreProducts = products
  },
  SET_ACTIVE_CATEGORY(state: ProductsState, category: string) {
    state.activeCategory = category
  },
  SET_LOADING(state: ProductsState, status: boolean) {
    state.loading = status
  },
  SET_ERROR(state: ProductsState, error: string | null) {
    state.error = error
  },
}

const actions = {
  async fetchAllProducts({ commit }: any) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const [beautyRes, fragranceRes] = await Promise.all([
        axios.get(`${BASE_URL}/products/category/beauty`),
        axios.get(`${BASE_URL}/products/category/fragrances`),
      ])
      const allProducts: Product[] = [
        ...beautyRes.data.products,
        ...fragranceRes.data.products,
      ]
      commit('SET_PRODUCT_LIST', allProducts)
      commit('SET_FLASH_SALE_PRODUCTS', allProducts.slice(0, 10))
      commit('SET_EXPLORE_PRODUCTS', allProducts.slice(0, 8))
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch products.')
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchProductById({ commit }: any, id: number) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`)
      commit('SET_SELECTED_PRODUCT', res.data)
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch product.')
    } finally {
      commit('SET_LOADING', false)
    }
  },

  setActiveCategory({ commit }: any, category: string) {
    commit('SET_ACTIVE_CATEGORY', category)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}