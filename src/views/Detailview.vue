<template>
  <div class="product-detail">
    <div class="product-detail__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <template v-if="breadcrumbFrom === 'products'">
        <router-link to="/products">Products</router-link>
        <span> / </span>
      </template>
      <span class="product-detail__breadcrumb-current">{{ productTitle }}</span>
    </div>

    <div v-if="isLoading" class="loading">Loading product...</div>

    <div v-else-if="hasError" class="product-detail__error">{{ errorMessage }}</div>

    <div v-else-if="selectedProduct" class="product-detail__wrapper">
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

      <ProductInfo
        :product="selectedProduct"
        :quantity="localQuantity"
        :is-in-cart="isInCart"
        @increase="increaseQty"
        @decrease="decreaseQty"
        @add-to-cart="handleAddToCart"
      />
    </div>

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
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';
import ProductInfo from '@/components/ProductDetail/ProductInfo.vue';
import type { CartItem } from '@/types/product';

const route = useRoute();
const router = useRouter();

// use composables instead of stores directly
const { selectedProduct, isLoading, hasError, errorMessage, fetchProductById } = useProducts();
const { sideCartItems, addToCart, updateQuantity } = useCart();

const selectedImage = ref('');
const localQuantity = ref(1);

const productTitle = computed(() =>
  selectedProduct.value ? selectedProduct.value.title : '...'
);

const isInCart = computed(() =>
  sideCartItems.value.some((item: CartItem) => item.id === selectedProduct.value?.id)
);

const hasReviews = computed(() =>
  !!(selectedProduct.value && selectedProduct.value.reviews.length > 0)
);

const breadcrumbFrom = computed(() => {
  const from = route.query.from as string;
  return from === 'products' ? 'products' : 'home';
});

// sync localQuantity from cart when cart changes
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

function selectImage(img: string): void {
  selectedImage.value = img;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString();
}

function increaseQty(): void {
  if (selectedProduct.value && localQuantity.value < selectedProduct.value.stock) {
    localQuantity.value++;
  }
}

function decreaseQty(): void {
  if (localQuantity.value > 1) localQuantity.value--;
}

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
