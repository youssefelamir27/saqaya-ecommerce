<template>
  <div class="product-detail">
    <!-- Breadcrumb — middle crumb only shown when coming from products page -->
    <div class="product-detail__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <template v-if="breadcrumbFrom === 'products'">
        <router-link to="/products">Products</router-link>
        <span> / </span>
      </template>
      <span class="product-detail__breadcrumb-current">{{ productTitle }}</span>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading">Loading product...</div>

    <!-- Error state — shown when product fetch fails -->
    <div v-else-if="hasError" class="product-detail__error">{{ errorMessage }}</div>

    <!-- Product content -->
    <div v-else-if="selectedProduct" class="product-detail__wrapper">
      <!-- Image gallery — main image + clickable thumbnails -->
      <div class="product-detail__images">
        <img
          :src="selectedImage"
          :alt="selectedProduct.title"
          class="product-detail__main-image"
        />
        <div class="product-detail__thumbnails">
          <img
            v-for="(img, index) in selectedProduct.images"
            :key="index"
            :src="img"
            :alt="selectedProduct.title"
            :class="['product-detail__thumb', { 'product-detail__thumb--active': selectedImage === img }]"
            @click="selectImage(img)"
          />
        </div>
      </div>

      <!--
        ProductInfo — handles rating, price, meta, and quantity controls.
        localQuantity is managed here and passed down as a prop.
        Cart actions are handled here via handleAddToCart.
      -->
      <ProductInfo
        :product="selectedProduct"
        :quantity="localQuantity"
        :is-in-cart="isInCart"
        @increase="increaseQty"
        @decrease="decreaseQty"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Customer reviews — only shown when product has reviews -->
    <div v-if="selectedProduct && hasReviews" class="reviews">
      <h2 class="reviews__title">Customer Reviews</h2>
      <div class="reviews__grid">
        <div
          v-for="(review, index) in selectedProduct.reviews"
          :key="index"
          class="reviews__card"
        >
          <div class="reviews__header">
            <strong>{{ review.reviewerName }}</strong>
            <div>
              <span
                v-for="star in 5"
                :key="star"
                :class="['reviews__star', { 'reviews__star--filled': star <= review.rating }]"
                >★</span
              >
            </div>
          </div>
          <p class="reviews__comment">{{ review.comment }}</p>
          <p class="reviews__date">{{ formatDate(review.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DetailView — product detail page
 *
 * Fetches and displays a single product by id from the route param (/product/:id).
 * Manages the image gallery selection and quantity controls locally.
 * Handles both "Add to Cart" (new item) and "Update Cart" (existing item) flows.
 *
 * Breadcrumb shows "Home / Product" or "Home / Products / Product"
 * based on the ?from= query param set by the navigating page.
 *
 * Cart state is synced via a watcher — when quantity changes in the SideCart,
 * localQuantity updates automatically to stay in sync.
 *
 * Vue Router hooks used:
 *   - onMounted: initial product fetch (replaces beforeRouteEnter)
 *   - onBeforeRouteUpdate: re-fetch when navigating between products
 *     without unmounting the component (e.g. related products)
 */

import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';
import ProductInfo from '@/components/ProductDetail/ProductInfo.vue';
import type { CartItem } from '@/types/product';

const route = useRoute();
const router = useRouter();

// all product and cart state via composables — no direct store access
const { selectedProduct, isLoading, hasError, errorMessage, fetchProductById } = useProducts();
const { sideCartItems, addToCart, updateQuantity } = useCart();

/** selectedImage — currently displayed main image (defaults to thumbnail on load) */
const selectedImage = ref('');

/** localQuantity — quantity chosen by the user before adding/updating cart */
const localQuantity = ref(1);

/** productTitle — shown in breadcrumb, shows '...' while loading */
const productTitle = computed(() =>
  selectedProduct.value ? selectedProduct.value.title : '...'
);

/** isInCart — true when the current product exists in the cart */
const isInCart = computed(() =>
  sideCartItems.value.some((item: CartItem) => item.id === selectedProduct.value?.id)
);

/** hasReviews — true when the product has at least one review */
const hasReviews = computed(() =>
  !!(selectedProduct.value && selectedProduct.value.reviews.length > 0)
);

/**
 * breadcrumbFrom — determines breadcrumb trail from route query
 * ?from=products → shows Home / Products / Title
 * ?from=home (or missing) → shows Home / Title
 */
const breadcrumbFrom = computed(() => {
  const from = route.query.from as string;
  return from === 'products' ? 'products' : 'home';
});

/**
 * watch cartItems — keeps localQuantity in sync with the cart
 * When the user changes quantity from the SideCart drawer,
 * localQuantity updates automatically without a page refresh
 */
watch(
  () => sideCartItems.value,
  () => {
    if (isInCart.value) {
      const cartItem = sideCartItems.value.find(
        (item: CartItem) => item.id === selectedProduct.value?.id
      );
      if (cartItem) localQuantity.value = cartItem.quantity;
    }
  },
  { deep: true }
);

/**
 * onMounted — fetches product on initial page load
 * Replaces Vue 2's beforeRouteEnter hook.
 * Redirects to ErrorPage if product fetch fails.
 */
onMounted(async () => {
  const id = Number(route.params.id);
  await fetchProductById(id);
  if (hasError.value) {
    router.replace({ name: 'ErrorPage' });
    return;
  }
  if (selectedProduct.value) {
    selectedImage.value = selectedProduct.value.thumbnail;
  }
});

/**
 * onBeforeRouteUpdate — re-fetches product when navigating between product pages
 * Replaces Vue 2's beforeRouteUpdate hook.
 * Called when route changes but the component is not unmounted (same route, different id).
 */
onBeforeRouteUpdate(async (to) => {
  const newId = Number(to.params.id);
  selectedImage.value = '';
  localQuantity.value = 1;
  await fetchProductById(newId);
  if (hasError.value) {
    router.push({ name: 'ErrorPage' });
    return false;
  }
  if (selectedProduct.value) {
    selectedImage.value = selectedProduct.value.thumbnail;
  }
});

/** selectImage — updates the main displayed image when a thumbnail is clicked */
function selectImage(img: string): void {
  selectedImage.value = img;
}

/** formatDate — formats ISO date string to locale date e.g. "4/15/2024" */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

/** increaseQty — increments localQuantity up to product stock limit */
function increaseQty(): void {
  if (selectedProduct.value && localQuantity.value < selectedProduct.value.stock) {
    localQuantity.value++;
  }
}

/** decreaseQty — decrements localQuantity with minimum of 1 */
function decreaseQty(): void {
  if (localQuantity.value > 1) localQuantity.value--;
}

/**
 * handleAddToCart — adds or updates the product in the cart
 * If already in cart: calls updateQuantity (sets exact value)
 * If not in cart: calls addToCart (adds as new item)
 */
function handleAddToCart(): void {
  if (!selectedProduct.value) return;
  if (isInCart.value) {
    updateQuantity(selectedProduct.value.id, localQuantity.value);
  } else {
    addToCart({
      id: selectedProduct.value.id,
      title: selectedProduct.value.title,
      price: selectedProduct.value.price,
      discountPercentage: selectedProduct.value.discountPercentage,
      thumbnail: selectedProduct.value.thumbnail,
      quantity: localQuantity.value,
    });
  }
}
</script>
