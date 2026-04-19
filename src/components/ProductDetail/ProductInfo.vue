<template>
  <div class="product-detail__info">
    <h1>{{ product.title }}</h1>

    <!-- Rating Row — star icons filled based on rounded rating -->
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
      <!-- stock--low class applied when stock < 10 -->
      <span
        class="product-detail__stock"
        :class="{ 'product-detail__stock--low': isLowStock }"
      >
        {{ product.availabilityStatus }}
      </span>
    </div>

    <!-- Price Row — shows discounted price, original, and discount badge -->
    <div class="product-detail__price-row">
      <span class="product-detail__price-current">${{ discountedPrice }}</span>
      <span class="product-detail__price-original">${{ product.price }}</span>
      <span class="product-detail__discount-badge">-{{ roundedDiscount }}%</span>
    </div>

    <p class="product-detail__description">{{ product.description }}</p>
    <hr class="product-detail__divider" />

    <!-- Meta Info — product details from API -->
    <div class="product-detail__meta">
      <p><strong>Brand:</strong> {{ product.brand }}</p>
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p><strong>Shipping:</strong> {{ product.shippingInformation }}</p>
      <p><strong>Return Policy:</strong> {{ product.returnPolicy }}</p>
      <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
    </div>

    <!-- Quantity Row — quantity controlled by parent (DetailView) -->
    <div class="product-detail__quantity-row">
      <button class="product-detail__qty-btn" @click="$emit('decrease')">-</button>
      <span class="product-detail__qty">{{ quantity }}</span>
      <button class="product-detail__qty-btn" @click="$emit('increase')">+</button>
      <!--
        Dynamic button — text and style change based on isInCart:
        "Add To Cart" (not in cart) vs "Update Cart" (already in cart)
      -->
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
/**
 * ProductInfo — product detail information panel
 *
 * Displays all product details for the DetailView: title, rating, price,
 * description, meta info, and quantity controls.
 *
 * This is a pure presentational component — no store access.
 * Quantity state and cart logic live in DetailView, communicated via emits.
 *
 * @props product - full Product object from the API
 * @props quantity - current quantity value controlled by DetailView
 * @props isInCart - whether this product is already in the cart
 *
 * @emits decrease - fires when − button clicked (DetailView decrements localQuantity)
 * @emits increase - fires when + button clicked (DetailView increments localQuantity)
 * @emits add-to-cart - fires when cart button clicked (DetailView handles add/update)
 */

import { computed } from 'vue';
import type { Product } from '@/types/product';

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

/** roundedRating — product rating rounded to nearest integer for star display */
const roundedRating = computed(() => Math.round(props.product.rating));

/** roundedDiscount — discount percentage rounded for the badge display */
const roundedDiscount = computed(() => Math.round(props.product.discountPercentage));

/** isLowStock — true when stock is below 10 units, triggers low stock styling */
const isLowStock = computed(() => props.product.stock < 10);

/** discountedPrice — final price after applying discount percentage */
const discountedPrice = computed(() =>
  (props.product.price * (1 - props.product.discountPercentage / 100)).toFixed(2)
);

/**
 * buttonText — dynamic label for the cart action button
 * "Update Cart" when product is already in cart, "Add To Cart" otherwise
 */
const buttonText = computed(() => (props.isInCart ? 'Update Cart' : 'Add To Cart'));
</script>
