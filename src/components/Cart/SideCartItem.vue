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
          :aria-label="`Decrease quantity of ${item.title}`"
          @click="$emit('decrease', item.id)"
        >
          −
        </button>
        <span class="side-cart-item__qty">{{ item.quantity }}</span>
        <button
          class="side-cart-item__qty-btn"
          :aria-label="`Increase quantity of ${item.title}`"
          @click="$emit('increase', item.id)"
        >
          +
        </button>
      </div>
    </div>
    <button
      class="side-cart-item__remove"
      :aria-label="`Remove ${item.title} from cart`"
      @click="$emit('remove', item.id)"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CartItem } from '@/types/product';

const props = defineProps<{
  item: CartItem;
}>();

defineEmits<{
  increase: [id: number];
  decrease: [id: number];
  remove: [id: number];
}>();

// computed replaces computed option — same logic, no this needed
const discountedPrice = computed(() => {
  const price = props.item.price * (1 - props.item.discountPercentage / 100);
  return (price * props.item.quantity).toFixed(2);
});
</script>
