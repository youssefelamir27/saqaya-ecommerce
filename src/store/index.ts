import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import cart from './modules/cart';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    cart,
  },
  plugins: [
    createPersistedState({
      // only persist cart — products are always fetched fresh from API
      paths: ['cart.sideCartItems'],
    }),
  ],
});
