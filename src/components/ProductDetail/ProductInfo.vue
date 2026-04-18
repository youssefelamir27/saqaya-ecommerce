<template>
  <div class="product-detail__info">
    <h1>{{ product.title }}</h1>

    <!-- Rating Row -->
    <div class="product-detail__rating-row">
      <span
        v-for="star in 5"
        :key="star"
        :class="[
          'product-detail__star',
          { 'product-detail__star--filled': star <= roundedRating },
        ]"
        >★</span
      >
      <span class="product-detail__rating-count">
        ({{ product.rating }} reviews)
      </span>
      <span
        class="product-detail__stock"
        :class="{ 'product-detail__stock--low': isLowStock }"
      >
        {{ product.availabilityStatus }}
      </span>
    </div>

    <!-- Price Row -->
    <div class="product-detail__price-row">
      <span class="product-detail__price-current">${{ discountedPrice }}</span>
      <span class="product-detail__price-original">${{ product.price }}</span>
      <span class="product-detail__discount-badge">-{{ roundedDiscount }}%</span>
    </div>

    <p class="product-detail__description">{{ product.description }}</p>
    <hr class="product-detail__divider" />

    <!-- Meta Info -->
    <div class="product-detail__meta">
      <p><strong>Brand:</strong> {{ product.brand }}</p>
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p><strong>Shipping:</strong> {{ product.shippingInformation }}</p>
      <p><strong>Return Policy:</strong> {{ product.returnPolicy }}</p>
      <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
    </div>

    <!-- Quantity Row -->
    <div class="product-detail__quantity-row">
      <button class="product-detail__qty-btn" @click="$emit('decrease')">-</button>
      <span class="product-detail__qty">{{ quantity }}</span>
      <button class="product-detail__qty-btn" @click="$emit('increase')">+</button>
      <!-- dynamic button — style and text change based on cart state -->
      <button
        :class="[
          'product-detail__add-btn',
          isInCart
            ? 'product-detail__add-btn--update'
            : 'product-detail__add-btn--add',
        ]"
        @click="$emit('add-to-cart')"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '@\/types/product';

const props = defineProps<{
  product: Product;
  quantity: number;
  isInCart?: boolean;
}>();

defineEmits<{
  decrease: [];
  increase: [];
  'add-to-cart': [];
}>();

const roundedRating = computed(() => Math.round(props.product.rating));
const roundedDiscount = computed(() => Math.round(props.product.discountPercentage));
const isLowStock = computed(() => props.product.stock < 10);
const discountedPrice = computed(() =>
  (props.product.price * (1 - props.product.discountPercentage / 100)).toFixed(2)
);
// button text — clean template + easy to test
const buttonText = computed(() => (props.isInCart ? 'Update Cart' : 'Add To Cart'));
</script>
