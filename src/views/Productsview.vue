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

    <!-- SortDropdown wired with v-model -->
    <SortDropdown v-model="sortKey" />

    <div v-if="productsStore.isLoading" class="loading">Loading all products...</div>

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

    <div v-if="!productsStore.isLoading && hasNoProducts" class="no-products">
      No products found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import SortDropdown from '@/components/Products/SortDropdown.vue';
import type { Product } from '@/types/product';

const router = useRouter();
const productsStore = useProductsStore();
const cartStore = useCartStore();

// sortKey drives the sortedProducts computed
const sortKey = ref('');

const hasNoProducts = computed(() => productsStore.productList.length === 0);

// sorted computed — derives from productList + sortKey
// spreads to avoid mutating store state directly
const sortedProducts = computed(() => {
  const list = [...productsStore.productList];
  switch (sortKey.value) {
    case 'price-asc': return list.sort((a, b) => a.price - b.price);
    case 'price-desc': return list.sort((a, b) => b.price - a.price);
    case 'rating-desc': return list.sort((a, b) => b.rating - a.rating);
    case 'rating-asc': return list.sort((a, b) => a.rating - b.rating);
    default: return list;
  }
});

function handleAddToCart(product: Product): void {
  cartStore.addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    quantity: 1,
  });
}

function addToWishlist(product: Product): void {
  console.log('Added to wishlist:', product.title);
}

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

onMounted(async () => {
  if (productsStore.productList.length === 0) {
    await productsStore.fetchAllProducts();
  }
});
</script>
