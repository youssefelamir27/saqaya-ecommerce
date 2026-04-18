<template>
  <div class="product-detail">
    <!-- Breadcrumb uses route query to know where user came from -->
    <div class="product-detail__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <template v-if="breadcrumbFrom === 'products'">
        <router-link to="/products">Products</router-link>
        <span> / </span>
      </template>
      <span class="product-detail__breadcrumb-current">{{ productTitle }}</span>
    </div>

    <div v-if="productsStore.isLoading" class="loading">Loading product...</div>

    <div v-else-if="productsStore.hasError" class="product-detail__error">
      {{ productsStore.errorMessage }}
    </div>

    <div v-else-if="productsStore.selectedProduct" class="product-detail__wrapper">
      <div class="product-detail__images">
        <img
          :src="selectedImage"
          :alt="productsStore.selectedProduct.title"
          class="product-detail__main-image"
        />
        <div class="product-detail__thumbnails">
          <img
            v-for="(img, index) in productsStore.selectedProduct.images"
            :key="index"
            :src="img"
            :alt="productsStore.selectedProduct.title"
            :class="[
              'product-detail__thumb',
              { 'product-detail__thumb--active': selectedImage === img },
            ]"
            @click="selectImage(img)"
          />
        </div>
      </div>

      <ProductInfo
        :product="productsStore.selectedProduct"
        :quantity="localQuantity"
        :is-in-cart="isInCart"
        @increase="increaseQty"
        @decrease="decreaseQty"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <div v-if="productsStore.selectedProduct && hasReviews" class="reviews">
      <h2 class="reviews__title">Customer Reviews</h2>
      <div class="reviews__grid">
        <div
          v-for="(review, index) in productsStore.selectedProduct.reviews"
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import ProductInfo from '@/components/ProductDetail/ProductInfo.vue';
import type { CartItem } from '@/types/product';

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const selectedImage = ref('');
const localQuantity = ref(1);

const productTitle = computed(() =>
  productsStore.selectedProduct ? productsStore.selectedProduct.title : '...'
);

const isInCart = computed(() =>
  cartStore.sideCartItems.some(
    (item: CartItem) => item.id === productsStore.selectedProduct?.id
  )
);

const hasReviews = computed(() =>
  !!(productsStore.selectedProduct && productsStore.selectedProduct.reviews.length > 0)
);

const breadcrumbFrom = computed(() => {
  const from = route.query.from as string;
  return from === 'products' ? 'products' : 'home';
});

// sync localQuantity from cart when cart changes
watch(
  () => cartStore.sideCartItems,
  () => {
    if (isInCart.value) {
      const cartItem = cartStore.sideCartItems.find(
        (item: CartItem) => item.id === productsStore.selectedProduct?.id
      );
      if (cartItem) localQuantity.value = cartItem.quantity;
    }
  },
  { deep: true }
);

// onMounted replaces beforeRouteEnter — no top-level await needed
onMounted(async () => {
  const id = Number(route.params.id);
  await productsStore.fetchProductById(id);
  if (productsStore.hasError) {
    router.replace({ name: 'ErrorPage' });
    return;
  }
  if (productsStore.selectedProduct) {
    selectedImage.value = productsStore.selectedProduct.thumbnail;
  }
});

// replaces beforeRouteUpdate
onBeforeRouteUpdate(async (to) => {
  const newId = Number(to.params.id);
  selectedImage.value = '';
  localQuantity.value = 1;
  await productsStore.fetchProductById(newId);
  if (productsStore.hasError) {
    router.push({ name: 'ErrorPage' });
    return false;
  }
  if (productsStore.selectedProduct) {
    selectedImage.value = productsStore.selectedProduct.thumbnail;
  }
});

function selectImage(img: string): void {
  selectedImage.value = img;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

function increaseQty(): void {
  if (productsStore.selectedProduct && localQuantity.value < productsStore.selectedProduct.stock) {
    localQuantity.value++;
  }
}

function decreaseQty(): void {
  if (localQuantity.value > 1) localQuantity.value--;
}

function handleAddToCart(): void {
  if (!productsStore.selectedProduct) return;
  if (isInCart.value) {
    cartStore.updateQuantity(productsStore.selectedProduct.id, localQuantity.value);
  } else {
    cartStore.addToCart({
      id: productsStore.selectedProduct.id,
      title: productsStore.selectedProduct.title,
      price: productsStore.selectedProduct.price,
      discountPercentage: productsStore.selectedProduct.discountPercentage,
      thumbnail: productsStore.selectedProduct.thumbnail,
      quantity: localQuantity.value,
    });
  }
}
</script>
