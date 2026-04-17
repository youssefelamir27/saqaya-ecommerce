import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  stock: number;
  category: string;
}

// Vue.extend gives TypeScript proper component typing
const ProductCard = Vue.extend({
  name: 'ProductCard',
  template: `
    <div class="product-card" @click="$emit('click', product.id)">
      <div class="product-card__image-wrapper">
        <span class="product-card__badge product-card__badge--discount">
          -{{ getDiscount() }}%
        </span>
        <img :src="product.thumbnail" :alt="product.title" />
        <button class="product-card__cart-btn" @click.stop="$emit('add-to-cart', product)">
          Add To Cart
        </button>
      </div>
      <div class="product-card__info">
        <p class="product-card__title">{{ product.title }}</p>
        <div class="product-card__price">
          <span class="product-card__price--current">\${{ getDiscountedPrice() }}</span>
          <span class="product-card__price--original">\${{ product.price }}</span>
        </div>
      </div>
    </div>
  `,
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  methods: {
    getDiscount(): number {
      return Math.round(this.product.discountPercentage || 0);
    },
    getDiscountedPrice(): string {
      return (
        this.product.price *
        (1 - (this.product.discountPercentage || 0) / 100)
      ).toFixed(2);
    },
  },
});

const mockProduct: Product = {
  id: 1,
  title: 'Essence Mascara',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.94,
  thumbnail: 'https://cdn.dummyjson.com/product-images/1.webp',
  stock: 5,
  category: 'beauty',
};

describe('ProductCard', () => {
  it('renders product title correctly', () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    expect(wrapper.find('.product-card__title').text()).toBe('Essence Mascara');
  });

  it('renders original price correctly', () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    expect(wrapper.find('.product-card__price--original').text()).toContain('9.99');
  });

  it('renders discounted price correctly', () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    expect(wrapper.find('.product-card__price--current').text()).toContain('9.27');
  });

  it('renders discount badge with correct percentage', () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    expect(wrapper.find('.product-card__badge--discount').text()).toContain('7%');
  });

  it('renders product thumbnail with correct src', () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockProduct.thumbnail);
  });

  it('emits add-to-cart event when Add To Cart button clicked', async () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    await wrapper.find('.product-card__cart-btn').trigger('click');
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
    expect(wrapper.emitted('add-to-cart')![0][0]).toEqual(mockProduct);
  });

  it('emits click event when card is clicked', async () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: { product: mockProduct },
    });
    await wrapper.find('.product-card').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')![0][0]).toBe(mockProduct.id);
  });
});