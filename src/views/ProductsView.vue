<template>
  <div class="products-page">
    <div class="products-header">
      <div class="products-header__badge">
        <span class="products-header__bar"></span>
        <span class="products-header__label">All Products</span>
      </div>
      <h1>Explore Our Products</h1>
      <p class="products-header__subtitle">
        Discover our complete collection of beauty, skincare, and fragrance
        products.
      </p>
    </div>

    <div v-if="isLoading" class="loading">Loading all products...</div>

    <div v-else class="products-grid">
      <div
        v-for="product in productList"
        :key="product.id"
        class="product-card"
        @click="goToProduct(product.id)"
      >
        <div class="product-card__image-wrapper">
          <span class="product-card__badge product-card__badge--discount">
            -{{ getDiscount(product) }}%
          </span>

          <div class="product-card__actions">
            <button
              class="product-card__action-btn"
              @click.stop="addToWishlist(product)"
            >
              ♡
            </button>
            <button class="product-card__action-btn" @click.stop>👁</button>
          </div>

          <img :src="product.thumbnail" :alt="product.title" loading="lazy" />

          <button
            class="product-card__cart-btn"
            @click.stop="handleAddToCart(product)"
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

    <div v-if="!isLoading && hasNoProducts" class="no-products">
      No products found.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Product } from '@/types/product';

export default Vue.extend({
  name: 'ProductsView',

  computed: {
    productList(): Product[] {
      return this.$store.getters['products/productList'];
    },
    isLoading(): boolean {
      return this.$store.getters['products/isLoading'];
    },
    hasNoProducts(): boolean {
      return this.productList.length === 0;
    },
  },

  async mounted() {
    if (this.productList.length === 0) {
      await this.fetchAllProducts();
    }
  },

  methods: {
    ...mapActions('products', ['fetchAllProducts']),
    ...mapActions('cart', ['addToCart']),

    handleAddToCart(product: Product): void {
      this.addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    },

    addToWishlist(product: Product): void {
      console.log('Added to wishlist:', product.title);
    },

    goToProduct(id: number): void {
      this.$router.push(`/product/${id}`);
    },

    roundedRating(product: Product): number {
      return Math.round(product.rating);
    },

    getDiscount(product: Product): number {
      return Math.round(product.discountPercentage || 0);
    },

    getDiscountedPrice(product: Product): string {
      return (
        product.price *
        (1 - (product.discountPercentage || 0) / 100)
      ).toFixed(2);
    },
  },
});
</script>
