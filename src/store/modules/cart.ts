import { CartItem, CartState, CartContext } from '@/types/product';

const state = (): CartState => ({
  sideCartItems: [],
  isSideCartOpen: false,
});

const getters = {
  sideCartItems: (state: CartState) => state.sideCartItems,
  isSideCartOpen: (state: CartState) => state.isSideCartOpen,
  cartItemCount: (state: CartState) =>
    state.sideCartItems.reduce((total, item) => total + item.quantity, 0),
  totalUSD: (state: CartState) =>
    state.sideCartItems
      .reduce((total, item) => {
        const discounted = item.price * (1 - item.discountPercentage / 100);
        return total + discounted * item.quantity;
      }, 0)
      .toFixed(2),
};

const mutations = {
  ADD_TO_CART(state: CartState, product: CartItem) {
    const existing = state.sideCartItems.find((item) => item.id === product.id);
    if (existing) {
      // update to the exact quantity chosen by the user on the detail page
      existing.quantity += product.quantity;
    } else {
      // spread preserves the quantity passed in from the detail page
      state.sideCartItems.push({ ...product });
    }
  },

  REMOVE_FROM_CART(state: CartState, productId: number) {
    state.sideCartItems = state.sideCartItems.filter(
      (item) => item.id !== productId
    );
  },

  UPDATE_QUANTITY(
    state: CartState,
    { productId, quantity }: { productId: number; quantity: number }
  ) {
    const item = state.sideCartItems.find((item) => item.id === productId);
    if (item) item.quantity = quantity;
  },

  CLEAR_CART(state: CartState) {
    state.sideCartItems = [];
  },

  TOGGLE_SIDE_CART(state: CartState) {
    state.isSideCartOpen = !state.isSideCartOpen;
  },

  OPEN_SIDE_CART(state: CartState) {
    state.isSideCartOpen = true;
  },

  CLOSE_SIDE_CART(state: CartState) {
    state.isSideCartOpen = false;
  },
};

// CartContext imported from types/product.ts — no longer defined here
const actions = {
  addToCart({ commit }: CartContext, product: CartItem) {
    commit('ADD_TO_CART', product);
  },

  removeFromCart({ commit }: CartContext, productId: number) {
    commit('REMOVE_FROM_CART', productId);
  },

  updateQuantity(
    { commit }: CartContext,
    payload: { productId: number; quantity: number }
  ) {
    commit('UPDATE_QUANTITY', payload);
  },

  clearCart({ commit }: CartContext) {
    commit('CLEAR_CART');
  },

  toggleSideCart({ commit }: CartContext) {
    commit('TOGGLE_SIDE_CART');
  },

  closeSideCart({ commit }: CartContext) {
    commit('CLOSE_SIDE_CART');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
