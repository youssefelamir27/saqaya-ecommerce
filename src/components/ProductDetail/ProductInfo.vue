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
      <span class="product-detail__rating-count"
        >({{ product.rating }} reviews)</span
      >
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
      <span class="product-detail__discount-badge"
        >-{{ roundedDiscount }}%</span
      >
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
      <button class="product-detail__qty-btn" @click="$emit('decrease')">
        -
      </button>
      <span class="product-detail__qty">{{ quantity }}</span>
      <button class="product-detail__qty-btn" @click="$emit('increase')">
        +
      </button>
      <button class="product-detail__add-btn" @click="$emit('add-to-cart')">
        Add To Cart
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Product } from '@/types/product';

export default Vue.extend({
  name: 'ProductInfo',

  props: {
    //receives full product from ProductDetailView
    product: {
      type: Object as () => Product,
      required: true,
    },
    //receives local quantity from ProductDetailView
    quantity: {
      type: Number,
      required: true,
    },
  },

  // emits increase, decrease, add-to-cart up to ProductDetailView
  // ProductDetailView handles Vuex dispatch — component stays decoupled

  computed: {
    roundedRating(): number {
      return Math.round(this.product.rating);
    },

    roundedDiscount(): number {
      return Math.round(this.product.discountPercentage);
    },

    isLowStock(): boolean {
      return this.product.stock < 10;
    },

    discountedPrice(): string {
      return (
        this.product.price *
        (1 - this.product.discountPercentage / 100)
      ).toFixed(2);
    },
  },
});
</script>
