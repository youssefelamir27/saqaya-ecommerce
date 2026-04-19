<template>
  <div class="products-page">
    <div class="products-header">
      <div class="products-header__badge">
        <span class="products-header__bar"></span>
        <span class="products-header__label">All Products</span>
      </div>
      <h1>Explore Our Products</h1>
      <p class="products-header__subtitle">
        Discover our complete collection of beauty, skincare, and fragrance products.
      </p>
    </div>

    <!-- SortDropdown — v-model bound to sortKey, drives sortedProducts computed -->
    <SortDropdown v-model="sortKey" />

    <div v-if="isLoading" class="loading">Loading all products...</div>

    <div v-else class="products-grid">
      <div
        v-for="product in sortedProducts"
        :key="product.id"
        class="product-card"
        @click="goToProduct(product.id)"
      >
        <div class="product-card__image-wrapper">
          <span class="product-card__badge product-card__badge--discount">
            -{{ getDiscount(product) }}%
          </span>
          <div class="product-card__actions">
            <button class="product-card__action-btn" @click.stop="addToWishlist(product)">♡</button>
            <button class="product-card__action-btn" @click.stop>👁</button>
          </div>
          <!-- loading="lazy" improves performance for long product lists -->
          <img :src="product.thumbnail" :alt="product.title" loading="lazy" />
          <button class="product-card__cart-btn" @click.stop="handleAddToCart(product)">
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

    <div v-if="!isLoading && hasNoProducts" class="no-products">No products found.</div>
  </div>
</template>

<script setup lang="ts">
/**
 * ProductsView — full product catalog page
 *
 * Displays all beauty products in a grid with sorting functionality.
 * Products are fetched on mount if not already loaded (avoids redundant API calls
 * when navigating back from DetailView since Pinia state persists).
 *
 * Sorting is handled client-side via the sortedProducts computed —
 * no API calls needed for sorting since all products are already loaded.
 *
 * State is accessed via useProducts() and useCart() composables.
 */

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';
import SortDropdown from '@/components/Products/SortDropdown.vue';
import type { Product } from '@/types/product';

const router = useRouter();

// all state via composables — no direct store access
const { productList, isLoading, fetchAllProducts } = useProducts();
const { addToCart } = useCart();

/** sortKey — currently selected sort option, bound to SortDropdown via v-model */
const sortKey = ref('');

/** hasNoProducts — true when productList is empty after loading */
const hasNoProducts = computed(() => productList.value.length === 0);

/**
 * sortedProducts — client-side sorted product list
 * Spreads productList to avoid mutating store state directly.
 * Returns unsorted list for 'default' or unknown sort keys.
 */
const sortedProducts = computed(() => {
  const list = [...productList.value];
  switch (sortKey.value) {
    case 'price-asc': return list.sort((a, b) => a.price - b.price);
    case 'price-desc': return list.sort((a, b) => b.price - a.price);
    case 'rating-desc': return list.sort((a, b) => b.rating - a.rating);
    case 'rating-asc': return list.sort((a, b) => a.rating - b.rating);
    default: return list;
  }
});

/** handleAddToCart — adds product to cart with quantity 1 */
function handleAddToCart(product: Product): void {
  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    quantity: 1,
  });
}

/** addToWishlist — placeholder for future wishlist feature */
function addToWishlist(product: Product): void {
  console.log('Added to wishlist:', product.title);
}

/** goToProduct — navigates to DetailView with from=products query for breadcrumb */
function goToProduct(id: number): void {
  router.push({ path: `/product/${id}`, query: { from: 'products' } });
}

function roundedRating(product: Product): number {
  return Math.round(product.rating);
}

function getDiscount(product: Product): number {
  return Math.round(product.discountPercentage || 0);
}

function getDiscountedPrice(product: Product): string {
  return (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);
}

/**
 * onMounted — fetches products only if not already loaded
 * Pinia state persists across navigation, so we skip the fetch
 * if products were already loaded (e.g. when returning from DetailView)
 */
onMounted(async () => {
  if (productList.value.length === 0) {
    await fetchAllProducts();
  }
});
</script>
