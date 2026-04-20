/**
 * SideCart.spec.ts — Unit tests for the SideCart component
 *
 * Tests the slide-in cart drawer component.
 * useCart composable is mocked with Vue ref() so state changes
 * are reactive and the component re-renders correctly between tests.
 * useRouter is handled via createMemoryHistory router plugin.
 *
 * Test coverage:
 *   - Does not render when isSideCartOpen is false
 *   - Renders drawer when isSideCartOpen is true
 *   - Shows empty state when isEmpty is true
 *   - Shows cart body with items when isEmpty is false
 *   - Displays correct totalUSD
 *   - Calls closeSideCart when close button is clicked
 *   - Calls closeSideCart when overlay is clicked
 *   - Calls clearCart when Clear Cart button is clicked
 *   - Calls closeSideCart when Shop Now is clicked
 *   - handleIncrease: calls updateQuantity with quantity + 1
 *   - handleDecrease: calls updateQuantity with quantity - 1 when quantity > 1
 *   - handleDecrease: calls removeFromCart when quantity is 1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import SideCart from '@/components/Cart/SideCart.vue';
import type { CartItem } from '@/types/product';

// ── Reactive mock state using ref() ───────────────────────────────────────────
// Plain objects don't trigger Vue reactivity — ref() is required
// so the component re-renders when values change between tests.

const mockCloseSideCart = vi.fn();
const mockClearCart = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockUpdateQuantity = vi.fn();

const isSideCartOpen = ref(false);
const isEmpty = ref(true);
const sideCartItems = ref<CartItem[]>([]);
const totalUSD = ref('0.00');

vi.mock('@/composables/useCart', () => ({
  useCart: () => ({
    isSideCartOpen,
    isEmpty,
    sideCartItems,
    totalUSD,
    closeSideCart: mockCloseSideCart,
    clearCart: mockClearCart,
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
  }),
}));

// Router needed for <router-link> in the component template
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/products', component: { template: '<div />' } },
    { path: '/cart', component: { template: '<div />' } },
  ],
});

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('SideCart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset reactive state before each test
    isSideCartOpen.value = false;
    isEmpty.value = true;
    sideCartItems.value = [];
    totalUSD.value = '0.00';
  });

  it('does not render drawer when isSideCartOpen is false', () => {
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    expect(wrapper.find('.side-cart-overlay').exists()).toBe(false);
  });

  it('renders drawer when isSideCartOpen is true', () => {
    isSideCartOpen.value = true;
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    expect(wrapper.find('.side-cart-overlay').exists()).toBe(true);
    expect(wrapper.find('.side-cart').exists()).toBe(true);
  });

  it('shows empty state when isEmpty is true', () => {
    isSideCartOpen.value = true;
    isEmpty.value = true;
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    expect(wrapper.find('.side-cart__empty').exists()).toBe(true);
    expect(wrapper.find('.side-cart__empty-text').text()).toBe('Your cart is empty');
    expect(wrapper.find('.side-cart__body').exists()).toBe(false);
  });

  it('shows cart body when isEmpty is false', () => {
    isSideCartOpen.value = true;
    isEmpty.value = false;
    sideCartItems.value = [
      { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 },
    ];
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    expect(wrapper.find('.side-cart__body').exists()).toBe(true);
    expect(wrapper.find('.side-cart__empty').exists()).toBe(false);
  });

  it('displays correct totalUSD', () => {
    isSideCartOpen.value = true;
    isEmpty.value = false;
    totalUSD.value = '24.99';
    sideCartItems.value = [
      { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 },
    ];
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    expect(wrapper.find('.side-cart__total-value').text()).toBe('$24.99');
  });

  it('calls closeSideCart when close button is clicked', async () => {
    isSideCartOpen.value = true;
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    await wrapper.find('.side-cart__close').trigger('click');
    expect(mockCloseSideCart).toHaveBeenCalledOnce();
  });

  it('calls closeSideCart when overlay is clicked', async () => {
    isSideCartOpen.value = true;
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    await wrapper.find('.side-cart-overlay').trigger('click');
    expect(mockCloseSideCart).toHaveBeenCalledOnce();
  });

  it('calls clearCart when Clear Cart button is clicked', async () => {
    isSideCartOpen.value = true;
    isEmpty.value = false;
    sideCartItems.value = [
      { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 },
    ];
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    await wrapper.find('.side-cart__clear').trigger('click');
    expect(mockClearCart).toHaveBeenCalledOnce();
  });

  it('calls closeSideCart when Shop Now is clicked on empty state', async () => {
    isSideCartOpen.value = true;
    isEmpty.value = true;
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    await wrapper.find('.side-cart__shop-btn').trigger('click');
    expect(mockCloseSideCart).toHaveBeenCalledOnce();
  });

  it('calls updateQuantity with quantity + 1 when SideCartItem emits increase', async () => {
    isSideCartOpen.value = true;
    isEmpty.value = false;
    sideCartItems.value = [
      { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 2 },
    ];
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    const sideCartItem = wrapper.findComponent({ name: 'SideCartItem' });
    await sideCartItem.vm.$emit('increase', 1);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3); // 2 + 1
  });

  it('calls updateQuantity with quantity - 1 when SideCartItem emits decrease and quantity > 1', async () => {
    isSideCartOpen.value = true;
    isEmpty.value = false;
    sideCartItems.value = [
      { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 2 },
    ];
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    const sideCartItem = wrapper.findComponent({ name: 'SideCartItem' });
    await sideCartItem.vm.$emit('decrease', 1);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1); // 2 - 1
  });

  it('calls removeFromCart when SideCartItem emits decrease and quantity is 1', async () => {
    isSideCartOpen.value = true;
    isEmpty.value = false;
    sideCartItems.value = [
      { id: 1, title: 'Lipstick', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 },
    ];
    const wrapper = mount(SideCart, { global: { plugins: [router] } });
    const sideCartItem = wrapper.findComponent({ name: 'SideCartItem' });
    await sideCartItem.vm.$emit('decrease', 1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1); // remove instead of 0 quantity
  });
});
