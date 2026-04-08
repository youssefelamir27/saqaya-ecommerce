<template>
  <div>
    <!-- Overlay -->
    <div v-if="isSideCartOpen" class="side-cart-overlay" @click="handleClose">
      <!-- Drawer -->
      <div
        class="side-cart"
        @click.stop
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <!-- Header -->
        <div class="side-cart__header">
          <h2 class="side-cart__title">My Cart</h2>
          <button
            class="side-cart__close"
            @click="handleClose"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <hr class="side-cart__divider" />

        <!-- Empty state -->
        <div v-if="isEmpty" class="side-cart__empty">
          <span class="side-cart__empty-icon">🛒</span>
          <p class="side-cart__empty-text">Your cart is empty</p>
          <button class="side-cart__shop-btn" @click="goToProducts">
            Shop Now
          </button>
        </div>

        <!-- Items list -->
        <div v-else class="side-cart__body">
          <div class="side-cart__items">
            <side-cart-item
              v-for="item in sideCartItems"
              :key="item.id"
              :item="item"
              @increase="handleIncrease"
              @decrease="handleDecrease"
              @remove="removeFromCart"
            />
          </div>

          <hr class="side-cart__divider" />

          <!-- Total -->
          <div class="side-cart__total-row">
            <span class="side-cart__total-label">Total:</span>
            <span class="side-cart__total-value">${{ totalUSD }}</span>
          </div>

          <!-- Actions -->
          <div class="side-cart__actions">
            <router-link
              to="/cart"
              class="side-cart__view-btn"
              @click.native="handleClose"
            >
              View Cart
            </router-link>
            <button class="side-cart__checkout-btn">Checkout</button>
          </div>

          <button class="side-cart__clear" @click="clearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import SideCartItem from './SideCartItem.vue';

interface CartItem {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  quantity: number;
}

export default Vue.extend({
  name: 'SideCart',

  components: { SideCartItem },

  computed: {
    isSideCartOpen(): boolean {
      return this.$store.getters['cart/isSideCartOpen'];
    },
    sideCartItems(): CartItem[] {
      return this.$store.getters['cart/sideCartItems'];
    },
    totalUSD(): string {
      return this.$store.getters['cart/totalUSD'];
    },
    isEmpty(): boolean {
      return this.sideCartItems.length === 0;
    },
  },

  methods: {
    ...mapActions('cart', [
      'closeSideCart',
      'removeFromCart',
      'updateQuantity',
      'clearCart',
    ]),

    lockScroll(): void {
      document.body.style.overflow = 'hidden';
    },

    unlockScroll(): void {
      document.body.style.overflow = '';
    },

    handleClose(): void {
      this.closeSideCart();
      this.unlockScroll();
    },

    goToProducts(): void {
      this.closeSideCart();
      this.unlockScroll();
      this.$router.push('/products');
    },

    handleIncrease(productId: number): void {
      const item = this.sideCartItems.find((i: CartItem) => i.id === productId);
      if (item) {
        this.updateQuantity({ productId, quantity: item.quantity + 1 });
      }
    },

    handleDecrease(productId: number): void {
      const item = this.sideCartItems.find((i: CartItem) => i.id === productId);
      if (!item) return;
      if (item.quantity === 1) {
        this.removeFromCart(productId);
      } else {
        this.updateQuantity({ productId, quantity: item.quantity - 1 });
      }
    },
  },
});
</script>
