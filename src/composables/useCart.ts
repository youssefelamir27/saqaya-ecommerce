import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import type { CartItem } from '@/types/product';

/**
 * useCart — application layer composable
 *
 * Wraps the cart Pinia store and exposes a clean, typed API to components.
 * This is the ONLY way components should interact with cart state.
 * Components never import useCartStore directly.
 *
 * Architecture flow:
 *   component → useCart() → useCartStore → localStorage (persisted)
 *
 * Exposed state (readonly computed refs):
 *   - sideCartItems: current cart items array
 *   - isSideCartOpen: drawer visibility state
 *   - cartItemCount: total quantity across all items
 *   - totalUSD: total price after discounts as formatted string
 *   - isEmpty: true when cart has no items
 *
 * Exposed actions:
 *   - addToCart, removeFromCart, updateQuantity, clearCart
 *   - toggleSideCart, openSideCart, closeSideCart
 */
export function useCart() {
  const store = useCartStore();

  // ─── State (exposed as readonly computed refs) ───────────────────────────

  /** sideCartItems — reactive array of items currently in the cart */
  const sideCartItems = computed(() => store.sideCartItems);

  /** isSideCartOpen — true when the side cart drawer is visible */
  const isSideCartOpen = computed(() => store.isSideCartOpen);

  /** cartItemCount — total quantity of all items combined */
  const cartItemCount = computed(() => store.cartItemCount);

  /** totalUSD — total price after discounts, e.g. "24.99" */
  const totalUSD = computed(() => store.totalUSD);

  /** isEmpty — true when the cart has no items */
  const isEmpty = computed(() => store.sideCartItems.length === 0);

  // ─── Cart Item Actions ───────────────────────────────────────────────────

  /**
   * addToCart — adds a product to the cart
   * If the product already exists, stacks the quantity on top
   * @param product - CartItem with id, title, price, discount, thumbnail, quantity
   */
  function addToCart(product: CartItem): void {
    store.addToCart(product);
  }

  /**
   * removeFromCart — removes a product from the cart by id
   * @param productId - numeric id of the product to remove
   */
  function removeFromCart(productId: number): void {
    store.removeFromCart(productId);
  }

  /**
   * updateQuantity — sets exact quantity for a specific cart item
   * Used by SideCart +/- buttons and DetailView "Update Cart"
   * @param productId - numeric id of the product to update
   * @param quantity - the new quantity to set
   */
  function updateQuantity(productId: number, quantity: number): void {
    store.updateQuantity(productId, quantity);
  }

  /** clearCart — removes all items from the cart */
  function clearCart(): void {
    store.clearCart();
  }

  // ─── Side Cart Drawer Actions ────────────────────────────────────────────

  /** toggleSideCart — opens the drawer if closed, closes if open */
  function toggleSideCart(): void {
    store.toggleSideCart();
  }

  /** openSideCart — explicitly opens the side cart drawer */
  function openSideCart(): void {
    store.openSideCart();
  }

  /** closeSideCart — explicitly closes the side cart drawer */
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
