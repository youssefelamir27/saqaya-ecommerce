/**
 * useCart.spec.ts — Unit tests for the useCart composable
 *
 * Tests the application layer composable that wraps useCartStore.
 * No mocking needed — cart store has no external dependencies.
 *
 * Test coverage:
 *   - Default state (sideCartItems, cartItemCount, totalUSD, isEmpty)
 *   - addToCart: new item + quantity stacking for existing item
 *   - removeFromCart: removes by id
 *   - updateQuantity: sets exact quantity
 *   - clearCart: empties all items
 *   - cartItemCount: sums all item quantities
 *   - toggleSideCart / openSideCart / closeSideCart: drawer state
 *   - totalUSD: price calculation with discount applied
 *
 * Pattern: setActivePinia(createPinia()) in beforeEach ensures a fresh
 * store instance for every test — prevents state leaking between tests.
 */

import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useCart } from '@/composables/useCart';

// Base mock item — spread and override fields as needed per test
const mockItem = {
  id: 1, title: 'Lipstick', price: 10,
  discountPercentage: 0, thumbnail: '', quantity: 1,
};

describe('useCart composable', () => {
  // Fresh pinia before each test — prevents state leaking between tests
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('exposes empty cart state initially', () => {
    const { sideCartItems, cartItemCount, totalUSD, isEmpty } = useCart();
    expect(sideCartItems.value.length).toBe(0);
    expect(cartItemCount.value).toBe(0);
    expect(totalUSD.value).toBe('0.00');
    expect(isEmpty.value).toBe(true);
  });

  it('addToCart adds item and updates isEmpty', () => {
    const { addToCart, sideCartItems, isEmpty } = useCart();
    addToCart(mockItem);
    expect(sideCartItems.value.length).toBe(1);
    expect(isEmpty.value).toBe(false);
  });

  it('addToCart stacks quantity when same item added again', () => {
    // Adding same product twice should sum quantities, not create two entries
    const { addToCart, sideCartItems } = useCart();
    addToCart({ ...mockItem, quantity: 3 });
    addToCart({ ...mockItem, quantity: 2 });
    expect(sideCartItems.value.length).toBe(1); // still one item
    expect(sideCartItems.value[0]!.quantity).toBe(5); // 3 + 2
  });

  it('removeFromCart removes item by id', () => {
    const { addToCart, removeFromCart, sideCartItems } = useCart();
    addToCart(mockItem);
    removeFromCart(1);
    expect(sideCartItems.value.length).toBe(0);
  });

  it('updateQuantity updates item quantity', () => {
    const { addToCart, updateQuantity, sideCartItems } = useCart();
    addToCart(mockItem);
    updateQuantity(1, 5);
    expect(sideCartItems.value[0]!.quantity).toBe(5);
  });

  it('clearCart empties all items', () => {
    const { addToCart, clearCart, sideCartItems } = useCart();
    addToCart({ ...mockItem, id: 1 });
    addToCart({ ...mockItem, id: 2 });
    clearCart();
    expect(sideCartItems.value.length).toBe(0);
  });

  it('cartItemCount sums all quantities across items', () => {
    // 3 + 2 = 5 total items
    const { addToCart, cartItemCount } = useCart();
    addToCart({ ...mockItem, id: 1, quantity: 3 });
    addToCart({ ...mockItem, id: 2, quantity: 2 });
    expect(cartItemCount.value).toBe(5);
  });

  it('toggleSideCart toggles isSideCartOpen', () => {
    const { toggleSideCart, isSideCartOpen } = useCart();
    expect(isSideCartOpen.value).toBe(false);
    toggleSideCart();
    expect(isSideCartOpen.value).toBe(true);
    toggleSideCart();
    expect(isSideCartOpen.value).toBe(false);
  });

  it('openSideCart and closeSideCart work correctly', () => {
    const { openSideCart, closeSideCart, isSideCartOpen } = useCart();
    openSideCart();
    expect(isSideCartOpen.value).toBe(true);
    closeSideCart();
    expect(isSideCartOpen.value).toBe(false);
  });

  it('totalUSD calculates price correctly with discount', () => {
    // Formula: price * (1 - discountPercentage / 100) * quantity
    // 10 * (1 - 0.5) * 2 = 10.00
    const { addToCart, totalUSD } = useCart();
    addToCart({ ...mockItem, price: 10, discountPercentage: 50, quantity: 2 });
    expect(totalUSD.value).toBe('10.00');
  });
});
