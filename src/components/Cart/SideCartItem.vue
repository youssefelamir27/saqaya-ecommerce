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
        <!-- discountedPrice computed includes quantity multiplication -->
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
/**
 * SideCartItem — pure presentational component for a single cart item
 *
 * Displays one item inside the SideCart drawer with its image, title,
 * discounted price, quantity controls, and a remove button.
 *
 * This component is intentionally decoupled from the store.
 * It receives data via props and communicates changes via emits only.
 * The parent (SideCart) handles all store interactions.
 *
 * @props item - CartItem object containing id, title, price, discount, thumbnail, quantity
 * @emits increase - fires with item.id when + button is clicked
 * @emits decrease - fires with item.id when − button is clicked
 * @emits remove - fires with item.id when ✕ button is clicked
 */

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

/**
 * discountedPrice — total price for this item after discount × quantity
 * Formula: price × (1 - discountPercentage / 100) × quantity
 */
const discountedPrice = computed(() => {
  const price = props.item.price * (1 - props.item.discountPercentage / 100);
  return (price * props.item.quantity).toFixed(2);
});
</script>
