import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import productsModule from '@/store/modules/products';

const localVue = createLocalVue();
localVue.use(Vuex);

function createStore() {
  return new Vuex.Store({
    modules: { products: { ...productsModule } },
  });
}

const mockProduct = {
  id: 1, title: 'Lipstick', description: 'A lipstick',
  price: 12.99, discountPercentage: 10, rating: 4.5,
  stock: 50, brand: 'Maybelline', category: 'beauty',
  thumbnail: 'url', images: ['url1'],
  availabilityStatus: 'In Stock', shippingInformation: '3 days',
  returnPolicy: '30 days', warrantyInformation: '1 year', reviews: [],
};

describe('products store', () => {
  describe('mutations', () => {
    it('SET_PRODUCT_LIST updates productList', () => {
      const store = createStore();
      store.commit('products/SET_PRODUCT_LIST', [mockProduct]);
      expect(store.getters['products/productList'].length).toBe(1);
    });

    it('SET_SELECTED_PRODUCT updates selectedProduct', () => {
      const store = createStore();
      store.commit('products/SET_SELECTED_PRODUCT', mockProduct);
      expect(store.getters['products/selectedProduct']).toEqual(mockProduct);
    });

    it('SET_LOADING toggles isLoading', () => {
      const store = createStore();
      store.commit('products/SET_LOADING', true);
      expect(store.getters['products/isLoading']).toBe(true);
      store.commit('products/SET_LOADING', false);
      expect(store.getters['products/isLoading']).toBe(false);
    });

    it('SET_ERROR sets hasError to true and stores message', () => {
      const store = createStore();
      store.commit('products/SET_ERROR', 'Failed to fetch products.');
      expect(store.getters['products/hasError']).toBe(true);
      expect(store.getters['products/errorMessage']).toBe('Failed to fetch products.');
    });

    it('SET_ERROR with null clears error state', () => {
      const store = createStore();
      store.commit('products/SET_ERROR', 'some error');
      store.commit('products/SET_ERROR', null);
      expect(store.getters['products/hasError']).toBe(false);
      expect(store.getters['products/errorMessage']).toBeNull();
    });

    it('SET_ACTIVE_CATEGORY updates activeCategory', () => {
      const store = createStore();
      store.commit('products/SET_ACTIVE_CATEGORY', 'Fragrance');
      expect(store.getters['products/activeCategory']).toBe('Fragrance');
    });

    it('SET_FLASH_SALE_PRODUCTS updates flashSaleProducts', () => {
      const store = createStore();
      store.commit('products/SET_FLASH_SALE_PRODUCTS', [mockProduct]);
      expect(store.getters['products/flashSaleProducts'].length).toBe(1);
    });

    it('SET_EXPLORE_PRODUCTS updates exploreProducts', () => {
      const store = createStore();
      store.commit('products/SET_EXPLORE_PRODUCTS', [mockProduct]);
      expect(store.getters['products/exploreProducts'].length).toBe(1);
    });
  });

  describe('getters defaults', () => {
    it('hasError is false initially', () => {
      const store = createStore();
      expect(store.getters['products/hasError']).toBe(false);
    });

    it('errorMessage is null initially', () => {
      const store = createStore();
      expect(store.getters['products/errorMessage']).toBeNull();
    });

    it('selectedProduct is null initially', () => {
      const store = createStore();
      expect(store.getters['products/selectedProduct']).toBeNull();
    });

    it('activeCategory defaults to Beauty', () => {
      const store = createStore();
      expect(store.getters['products/activeCategory']).toBe('Beauty');
    });

    it('browseCategories has 6 default categories', () => {
      const store = createStore();
      expect(store.getters['products/browseCategories'].length).toBe(6);
    });

    it('isLoading is false initially', () => {
      const store = createStore();
      expect(store.getters['products/isLoading']).toBe(false);
    });
  });
});