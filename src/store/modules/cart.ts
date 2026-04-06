interface CartItem {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
  quantity: number
}

interface CartState {
  sideCartItems: CartItem[]
  isSideCartOpen: boolean
}

const state = (): CartState => ({
  sideCartItems: [],
  isSideCartOpen: false,
})

const getters = {
  sideCartItems: (state: CartState) => state.sideCartItems,

  isSideCartOpen: (state: CartState) => state.isSideCartOpen,

  cartItemCount: (state: CartState) =>
    state.sideCartItems.reduce((total, item) => total + item.quantity, 0),

  totalUSD: (state: CartState) =>
    state.sideCartItems
      .reduce((total, item) => {
        const discounted = item.price * (1 - item.discountPercentage / 100)
        return total + discounted * item.quantity
      }, 0)
      .toFixed(2),
}

const mutations = {
  ADD_TO_CART(state: CartState, product: CartItem) {
    const existing = state.sideCartItems.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      state.sideCartItems.push({ ...product, quantity: 1 })
    }
  },

  REMOVE_FROM_CART(state: CartState, productId: number) {
    state.sideCartItems = state.sideCartItems.filter(
      (item) => item.id !== productId
    )
  },

  UPDATE_QUANTITY(
    state: CartState,
    { productId, quantity }: { productId: number; quantity: number }
  ) {
    const item = state.sideCartItems.find((item) => item.id === productId)
    if (item) item.quantity = quantity
  },

  CLEAR_CART(state: CartState) {
    state.sideCartItems = []
  },

  TOGGLE_SIDE_CART(state: CartState) {
    state.isSideCartOpen = !state.isSideCartOpen
  },

  OPEN_SIDE_CART(state: CartState) {
    state.isSideCartOpen = true
  },

  CLOSE_SIDE_CART(state: CartState) {
    state.isSideCartOpen = false
  },
}

const actions = {
  addToCart({ commit }: any, product: CartItem) {
    commit('ADD_TO_CART', product)
    commit('OPEN_SIDE_CART')
  },

  removeFromCart({ commit }: any, productId: number) {
    commit('REMOVE_FROM_CART', productId)
  },

  updateQuantity({ commit }: any, payload: { productId: number; quantity: number }) {
    commit('UPDATE_QUANTITY', payload)
  },

  clearCart({ commit }: any) {
    commit('CLEAR_CART')
  },

  toggleSideCart({ commit }: any) {
    commit('TOGGLE_SIDE_CART')
  },

  closeSideCart({ commit }: any) {
    commit('CLOSE_SIDE_CART')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}