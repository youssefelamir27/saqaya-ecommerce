<template>
  <section class="explore-products">
    <div class="section-header__badge">
      <span class="section-header__bar"></span>
      <span class="section-header__label">Our Products</span>
    </div>
    <div class="section-header__title-row">
      <h2>Explore Our Products</h2>
      <div class="section-header__arrows">
        <button class="section-header__arrow-btn" @click="scrollLeft">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button class="section-header__arrow-btn" @click="scrollRight">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    <!-- sliderRef used for programmatic scroll via scrollLeft/scrollRight -->
    <div ref="sliderRef" class="products-grid">
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
 * ExploreProducts — scrollable product grid for the home page
 *
 * Displays up to 8 products in a horizontally scrollable grid.
 * Arrow buttons trigger smooth scroll via a template ref on the container.
 *
 * Pure presentational component — receives data via props, communicates via emits.
 * No store access — HomeView handles all cart and navigation logic.
 *
 * @props products - array of Product objects to display (first 8 from store)
 * @emits go-to-product - fires with product id when card is clicked
 * @emits add-to-cart - fires with full product when "Add To Cart" is clicked
 * @emits add-to-wishlist - fires with full product when wishlist button is clicked
 */

import { ref } from 'vue';
import type { Product } from '@/types/product';

defineProps<{
  products: Product[];
}>();

defineEmits<{
  'go-to-product': [id: number];
  'add-to-wishlist': [product: Product];
  'add-to-cart': [product: Product];
}>();

/**
 * sliderRef — template ref for the scrollable products grid container
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

/** scrollLeft — smoothly scrolls the product slider 300px to the left */
function scrollLeft(): void {
  sliderRef.value?.scrollBy({ left: -300, behavior: 'smooth' });
}

/** scrollRight — smoothly scrolls the product slider 300px to the right */
function scrollRight(): void {
  sliderRef.value?.scrollBy({ left: 300, behavior: 'smooth' });
}
</script>
