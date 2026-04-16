<template>
  <section class="flash-sales">
    <div class="section-header">
      <div class="section-header__badge">
        <span class="section-header__bar"></span>
        <span class="section-header__label">Today's</span>
      </div>
      <div class="section-header__title-row">
        <h2>Flash Sales</h2>
        <div class="section-header__arrows">
          <button class="section-header__arrow-btn" @click="scrollLeft">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button class="section-header__arrow-btn" @click="scrollRight">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">Loading products...</div>

    <div v-else ref="slider" class="products-slider">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="$emit('go-to-product', product.id)"
      >
        <div class="product-card__image-wrapper">
          <span class="product-card__badge product-card__badge--discount">
            -{{ getDiscount(product) }}%
          </span>
          <div class="product-card__actions">
            <button
              class="product-card__action-btn"
              @click.stop="$emit('add-to-wishlist', product)"
            >
              ♡
            </button>
            <button class="product-card__action-btn" @click.stop>👁</button>
          </div>
          <img :src="product.thumbnail" :alt="product.title" />
          <button
            class="product-card__cart-btn"
            @click.stop="$emit('add-to-cart', product)"
          >
            Add To Cart
          </button>
        </div>
        <div class="product-card__info">
          <p class="product-card__title">{{ product.title }}</p>
          <div class="product-card__price">
            <span class="product-card__price--current"
              >${{ getDiscountedPrice(product) }}</span
            >
            <span class="product-card__price--original"
              >${{ product.price }}</span
            >
          </div>
          <div class="product-card__rating">
            <span
              v-for="star in 5"
              :key="star"
              :class="[
                'product-card__star',
                {
                  'product-card__star--filled': star <= roundedRating(product),
                },
              ]"
              >★</span
            >
            <span class="product-card__rating-num">({{ product.rating }})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="view-all">
      <router-link to="/products" class="view-all__btn"
        >View All Products</router-link
      >
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Product } from '@/types/product';

export default Vue.extend({
  name: 'FlashSale',

  props: {
    // receives data from HomeView via props — no direct Vuex access
    products: {
      type: Array as () => Product[],
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  // emits up to HomeView — component stays decoupled from store
  // go-to-product, add-to-wishlist, add-to-cart

  methods: {
    getDiscount(product: Product): number {
      return Math.round(product.discountPercentage || 0);
    },

    getDiscountedPrice(product: Product): string {
      return (
        product.price *
        (1 - (product.discountPercentage || 0) / 100)
      ).toFixed(2);
    },

    roundedRating(product: Product): number {
      return Math.round(product.rating);
    },

    scrollLeft(): void {
      const el = this.$refs.slider as HTMLElement;
      if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
    },

    scrollRight(): void {
      const el = this.$refs.slider as HTMLElement;
      if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
    },
  },
});
</script>
