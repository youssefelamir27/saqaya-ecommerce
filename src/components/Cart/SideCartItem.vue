<template>
  <div class="side-cart-item">
    <img
      class="side-cart-item__image"
      :src="item.thumbnail"
      :alt="item.title"
    />

    <div class="side-cart-item__info">
      <p class="side-cart-item__title">{{ item.title }}</p>

      <div class="side-cart-item__price-row">
        <span class="side-cart-item__price">${{ discountedPrice }}</span>
      </div>

      <div class="side-cart-item__controls">
        <button
          class="side-cart-item__qty-btn"
          @click="$emit('decrease', item.id)"
          :aria-label="`Decrease quantity of ${item.title}`"
        >
          −
        </button>
        <span class="side-cart-item__qty">{{ item.quantity }}</span>
        <button
          class="side-cart-item__qty-btn"
          @click="$emit('increase', item.id)"
          :aria-label="`Increase quantity of ${item.title}`"
        >
          +
        </button>
      </div>
    </div>

    <button
      class="side-cart-item__remove"
      @click="$emit('remove', item.id)"
      :aria-label="`Remove ${item.title} from cart`"
    >
      ✕
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CartItem } from '@/types/product';

export default Vue.extend({
  name: 'SideCartItem',

  props: {
    item: {
      type: Object as () => CartItem,
      required: true,
    },
  },
  computed: {
    discountedPrice(): string {
      const price = this.item.price * (1 - this.item.discountPercentage / 100);
      return (price * this.item.quantity).toFixed(2);
    },
  },
});
</script>
