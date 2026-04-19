import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { beforeEach, describe, it, expect } from 'vitest';

const mockItem = {
  id: 1, title: 'Lipstick', price: 10,
  discountPercentage: 0, thumbnail: '', quantity: 1,
};

describe('cart store', () => {
  // create a fresh pinia before each test — prevents state leaking between tests
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('addToCart action', () => {
    it('adds new item to empty cart', () => {
      const store = useCartStore();
      store.addToCart(mockItem);
      expect(store.sideCartItems.length).toBe(1);
    });

    it('adds new item with correct quantity', () => {
      const store = useCartStore();
      store.addToCart({ ...mockItem, quantity: 3 });
      expect(store.sideCartItems[0].quantity).toBe(3);
    });

    it('stacks quantity when same item added again', () => {
      const store = useCartStore();
      store.addToCart({ ...mockItem, quantity: 4 });
      store.addToCart({ ...mockItem, quantity: 3 });
      expect(store.sideCartItems.length).toBe(1);
      expect(store.sideCartItems[0].quantity).toBe(7);
    });

    it('adds multiple different items separately', () => {
      const store = useCartStore();
      store.addToCart({ ...mockItem, id: 1 });
      store.addToCart({ ...mockItem, id: 2 });
      expect(store.sideCartItems.length).toBe(2);
    });
  });

  describe('removeFromCart action', () => {
    it('removes correct item by id', () => {
      const store = useCartStore();
      store.addToCart({ ...mockItem, id: 1 });
      store.addToCart({ ...mockItem, id: 2 });
      store.removeFromCart(1);
      expect(store.sideCartItems.length).toBe(1);
      expect(store.sideCartItems[0].id).toBe(2);
    });

    it('does nothing when removing non-existent id', () => {
      const store = useCartStore();
      store.addToCart(mockItem);
      store.removeFromCart(999);
      expect(store.sideCartItems.length).toBe(1);
    });
  });

  describe('updateQuantity action', () => {
    it('updates quantity of correct item', () => {
      const store = useCartStore();
      store.addToCart(mockItem);
      store.updateQuantity(1, 5);
      expect(store.sideCartItems[0].quantity).toBe(5);
    });
  });

  describe('clearCart action', () => {
    it('empties the entire cart', () => {
      const store = useCartStore();
      store.addToCart(mockItem);
      store.clearCart();
      expect(store.sideCartItems.length).toBe(0);
    });
  });

  describe('toggleSideCart action', () => {
    it('toggles from false to true', () => {
      const store = useCartStore();
      store.toggleSideCart();
      expect(store.isSideCartOpen).toBe(true);
    });

    it('toggles from true back to false', () => {
      const store = useCartStore();
      store.openSideCart();
      store.toggleSideCart();
      expect(store.isSideCartOpen).toBe(false);
    });
  });

  describe('cartItemCount getter', () => {
    it('returns 0 for empty cart', () => {
      const store = useCartStore();
      expect(store.cartItemCount).toBe(0);
    });

    it('sums quantities across multiple items', () => {
      const store = useCartStore();
      store.addToCart({ ...mockItem, id: 1, quantity: 2 });
      store.addToCart({ ...mockItem, id: 2, quantity: 1 });
      expect(store.cartItemCount).toBe(3);
    });
  });

  describe('totalUSD getter', () => {
    it('returns 0.00 for empty cart', () => {
      const store = useCartStore();
      expect(store.totalUSD).toBe('0.00');
    });

    it('calculates total with no discount', () => {
      const store = useCartStore();
      store.addToCart({ ...mockItem, price: 10, discountPercentage: 0, quantity: 2 });
      expect(store.totalUSD).toBe('20.00');
    });

    it('applies discount correctly', () => {
      const store = useCartStore();
      // 10 * (1 - 0.5) * 1 = 5.00
      store.addToCart({ ...mockItem, price: 10, discountPercentage: 50, quantity: 1 });
      expect(store.totalUSD).toBe('5.00');
    });

    it('calculates total for multiple different items', () => {
      const store = useCartStore();
      store.addToCart({ id: 1, title: 'A', price: 10, discountPercentage: 0, thumbnail: '', quantity: 1 });
      store.addToCart({ id: 2, title: 'B', price: 20, discountPercentage: 25, thumbnail: '', quantity: 1 });
      expect(store.totalUSD).toBe('25.00');
    });
  });
  it('openSideCart opens the cart', () => {
  const store = useCartStore();
  store.openSideCart();
  expect(store.isSideCartOpen).toBe(true);
});

  describe('closeSideCart action', () => {
    it('closes the cart', () => {
      const store = useCartStore();
      store.openSideCart();
      store.closeSideCart();
      expect(store.isSideCartOpen).toBe(false);
    });
  });
});
