import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import SideCart from '@/components/Cart/SideCart.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

// factory function — creates a fresh store for each test
function createStore(cartState = {}) {
  return new Vuex.Store({
    modules: {
      cart: {
        namespaced: true,
        state: {
          sideCartItems: [],
          isSideCartOpen: false,
          ...cartState,
        },
        getters: {
          isSideCartOpen: (state: any) => state.isSideCartOpen,
          sideCartItems: (state: any) => state.sideCartItems,
          totalUSD: (state: any) =>
            state.sideCartItems
              .reduce((total: number, item: any) => {
                return total + item.price * (1 - item.discountPercentage / 100) * item.quantity;
              }, 0)
              .toFixed(2),
          cartItemCount: (state: any) =>
            state.sideCartItems.reduce((total: number, item: any) => total + item.quantity, 0),
        },
        actions: {
          closeSideCart: jest.fn(),
          removeFromCart: jest.fn(),
          updateQuantity: jest.fn(),
          clearCart: jest.fn(),
        },
      },
    },
  });
}

describe('SideCart.vue', () => {
  it('does not render when isSideCartOpen is false', () => {
    const store = createStore({ isSideCartOpen: false });
    const wrapper = shallowMount(SideCart, { localVue, store });
    expect(wrapper.find('.side-cart-overlay').exists()).toBe(false);
  });

  it('renders when isSideCartOpen is true', () => {
    const store = createStore({ isSideCartOpen: true });
    const wrapper = shallowMount(SideCart, { localVue, store });
    expect(wrapper.find('.side-cart-overlay').exists()).toBe(true);
  });

  it('shows empty state when cart has no items', () => {
    const store = createStore({ isSideCartOpen: true, sideCartItems: [] });
    const wrapper = shallowMount(SideCart, { localVue, store });
    expect(wrapper.find('.side-cart__empty').exists()).toBe(true);
  });

  it('shows items list when cart has items', () => {
    const store = createStore({
      isSideCartOpen: true,
      sideCartItems: [
        { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 },
      ],
    });
    const wrapper = shallowMount(SideCart, { localVue, store });
    expect(wrapper.find('.side-cart__body').exists()).toBe(true);
    expect(wrapper.find('.side-cart__empty').exists()).toBe(false);
  });

  it('displays correct totalUSD', () => {
    const store = createStore({
      isSideCartOpen: true,
      sideCartItems: [
        { id: 1, title: 'Lipstick', price: 20, discountPercentage: 0, thumbnail: '', quantity: 2 },
      ],
    });
    const wrapper = shallowMount(SideCart, { localVue, store });
    expect(wrapper.find('.side-cart__total-value').text()).toContain('40.00');
  });

  it('renders My Cart title', () => {
    const store = createStore({ isSideCartOpen: true });
    const wrapper = shallowMount(SideCart, { localVue, store });
    expect(wrapper.find('.side-cart__title').text()).toBe('My Cart');
  });
});