import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import type { CartItem } from '@/types/product';

/**
 * useCart — application layer composable
 *
 * Wraps the cart Pinia store and exposes a clean API to components.
 * Components never import the store directly — they use this composable.
 *
 * Flow: component → useCart → store
 */
export function useCart() {
  const store = useCartStore();

  // expose state as readonly computed refs
  const sideCartItems = computed(() => store.sideCartItems);
  const isSideCartOpen = computed(() => store.isSideCartOpen);
  const cartItemCount = computed(() => store.cartItemCount);
  const totalUSD = computed(() => store.totalUSD);
  const isEmpty = computed(() => store.sideCartItems.length === 0);

  // cart item actions
  function addToCart(product: CartItem): void {
    store.addToCart(product);
  }

  function removeFromCart(productId: number): void {
    store.removeFromCart(productId);
  }

  function updateQuantity(productId: number, quantity: number): void {
    store.updateQuantity(productId, quantity);
  }

  function clearCart(): void {
    store.clearCart();
  }

  // side cart drawer actions
  function toggleSideCart(): void {
    store.toggleSideCart();
  }

  function openSideCart(): void {
    store.openSideCart();
  }

  function closeSideCart(): void {
    store.closeSideCart();
  }

  return {
    // state
    sideCartItems,
    isSideCartOpen,
    cartItemCount,
    totalUSD,
    isEmpty,
    // actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleSideCart,
    openSideCart,
    closeSideCart,
  };
}
