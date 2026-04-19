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

    <!-- Loading state — shown while HomeView fetches products -->
    <div v-if="isLoading" class="loading">Loading products...</div>

    <!-- sliderRef used for programmatic scroll via scrollLeft/scrollRight -->
    <div v-else ref="sliderRef" class="products-slider">
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
            <span class="product-card__price--current">${{ getDiscountedPrice(product) }}</span>
            <span class="product-card__price--original">${{ product.price }}</span>
          </div>
          <div class="product-card__rating">
            <span
              v-for="star in 5"
              :key="star"
              :class="['product-card__star', { 'product-card__star--filled': star <= roundedRating(product) }]"
              >★</span
            >
            <span class="product-card__rating-num">({{ product.rating }})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="view-all">
      <router-link to="/products" class="view-all__btn">View All Products</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * FlashSale — horizontally scrollable flash sale product slider
 *
 * Displays up to 10 products in a horizontally scrollable row.
 * Shows a loading state while HomeView is fetching products from the API.
 *
 * Pure presentational component — no store access.
 * Receives data via props from HomeView, communicates actions via emits.
 *
 * @props products - array of Product objects to display (first 10 from store)
 * @props isLoading - true while HomeView is fetching products (default: false)
 * @emits go-to-product - fires with product id when card is clicked
 * @emits add-to-cart - fires with full product when "Add To Cart" is clicked
 * @emits add-to-wishlist - fires with full product when wishlist button is clicked
 */

import { ref } from 'vue';
import type { Product } from '@/types/product';

withDefaults(
  defineProps<{
    products: Product[];
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  }
);

defineEmits<{
  'go-to-product': [id: number];
  'add-to-wishlist': [product: Product];
  'add-to-cart': [product: Product];
}>();

/**
 * sliderRef — template ref for the scrollable products slider container
 * In Vue 3, ref() replaces this.$refs — name must match ref="sliderRef" in template
 */
const sliderRef = ref<HTMLElement | null>(null);

/** getDiscount — returns rounded discount percentage for the badge */
function getDiscount(product: Product): number {
  return Math.round(product.discountPercentage || 0);
}

/** getDiscountedPrice — calculates final price after discount */
function getDiscountedPrice(product: Product): string {
  return (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);
}

/** roundedRating — rounds rating for star icon display */
function roundedRating(product: Product): number {
  return Math.round(product.rating);
}

/** scrollLeft — smoothly scrolls the slider 300px to the left */
function scrollLeft(): void {
  sliderRef.value?.scrollBy({ left: -300, behavior: 'smooth' });
}

/** scrollRight — smoothly scrolls the slider 300px to the right */
function scrollRight(): void {
  sliderRef.value?.scrollBy({ left: 300, behavior: 'smooth' });
}
</script>
