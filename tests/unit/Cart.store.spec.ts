import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import cartModule from '@/store/modules/cart';

const localVue = createLocalVue();
localVue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    modules: { cart: { ...cartModule } },
  });
}

const mockItem = {
  id: 1, title: 'Lipstick', price: 10,
  discountPercentage: 0, thumbnail: '', quantity: 1,
};

describe('cart store', () => {
  describe('ADD_TO_CART mutation', () => {
    it('adds new item to empty cart', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', mockItem);
      expect(store.getters['cart/sideCartItems'].length).toBe(1);
    });

    it('increments quantity when same item added again', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', mockItem);
      store.commit('cart/ADD_TO_CART', mockItem);
      expect(store.getters['cart/sideCartItems'].length).toBe(1);
      expect(store.getters['cart/sideCartItems'][0].quantity).toBe(2);
    });

    it('adds multiple different items separately', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 1 });
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 2 });
      expect(store.getters['cart/sideCartItems'].length).toBe(2);
    });
  });

  describe('REMOVE_FROM_CART mutation', () => {
    it('removes correct item by id', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 1 });
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 2 });
      store.commit('cart/REMOVE_FROM_CART', 1);
      expect(store.getters['cart/sideCartItems'].length).toBe(1);
      expect(store.getters['cart/sideCartItems'][0].id).toBe(2);
    });

    it('does nothing when removing non-existent id', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', mockItem);
      store.commit('cart/REMOVE_FROM_CART', 999);
      expect(store.getters['cart/sideCartItems'].length).toBe(1);
    });
  });

  describe('UPDATE_QUANTITY mutation', () => {
    it('updates quantity of correct item', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', mockItem);
      store.commit('cart/UPDATE_QUANTITY', { productId: 1, quantity: 5 });
      expect(store.getters['cart/sideCartItems'][0].quantity).toBe(5);
    });
  });

  describe('CLEAR_CART mutation', () => {
    it('empties the entire cart', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', mockItem);
      store.commit('cart/CLEAR_CART');
      expect(store.getters['cart/sideCartItems'].length).toBe(0);
    });
  });

  describe('TOGGLE_SIDE_CART mutation', () => {
    it('toggles from false to true', () => {
      const store = createStore();
      store.commit('cart/TOGGLE_SIDE_CART');
      expect(store.getters['cart/isSideCartOpen']).toBe(true);
    });

    it('toggles from true back to false', () => {
      const store = createStore();
      store.commit('cart/OPEN_SIDE_CART');
      store.commit('cart/TOGGLE_SIDE_CART');
      expect(store.getters['cart/isSideCartOpen']).toBe(false);
    });
  });

  describe('cartItemCount getter', () => {
    it('returns 0 for empty cart', () => {
      const store = createStore();
      expect(store.getters['cart/cartItemCount']).toBe(0);
    });

    it('sums quantities across multiple items', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 1 });
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 1 }); // qty = 2
      store.commit('cart/ADD_TO_CART', { ...mockItem, id: 2 }); // qty = 1
      expect(store.getters['cart/cartItemCount']).toBe(3);
    });
  });

  describe('totalUSD getter', () => {
    it('returns 0.00 for empty cart', () => {
      const store = createStore();
      expect(store.getters['cart/totalUSD']).toBe('0.00');
    });

    it('calculates total with no discount', () => {
      const store = createStore();
      store.commit('cart/ADD_TO_CART', { ...mockItem, price: 10, discountPercentage: 0 });
      store.commit('cart/ADD_TO_CART', { ...mockItem, price: 10, discountPercentage: 0 }); // qty = 2
      expect(store.getters['cart/totalUSD']).toBe('20.00');
    });

    it('applies discount correctly', () => {
      const store = createStore();
      // 10 * (1 - 0.5) * 1 = 5.00
      store.commit('cart/ADD_TO_CART', { ...mockItem, price: 10, discountPercentage: 50 });
      expect(store.getters['cart/totalUSD']).toBe('5.00');
    });

    it('calculates total for multiple different items', () => {
      const store = createStore();
      // item1: 10 * 1 * 1 = 10
      // item2: 20 * (1 - 0.25) * 1 = 15
      // total = 25
      store.commit('cart/ADD_TO_CART', { id: 1, title: 'A', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 });
      store.commit('cart/ADD_TO_CART', { id: 2, title: 'B', price: 20, discountPercentage: 25, thumbnail: '', quantity: 1 });
      expect(store.getters['cart/totalUSD']).toBe('25.00');
    });
  });
});