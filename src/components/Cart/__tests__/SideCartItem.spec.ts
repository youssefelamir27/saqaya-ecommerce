/**
 * SideCartItem.spec.ts — Unit tests for the SideCartItem component
 *
 * Tests the pure presentational cart item row component.
 * No store or composable dependencies — receives all data via props
 * and communicates via emits only.
 *
 * Test coverage:
 *   - Renders product title
 *   - Renders thumbnail with correct src and alt
 *   - Renders correct quantity
 *   - Calculates discounted price correctly (price × discount × quantity)
 *   - Emits 'increase' with item id when + button clicked
 *   - Emits 'decrease' with item id when − button clicked
 *   - Emits 'remove' with item id when ✕ button clicked
 *
 * Note: ! non-null assertion used after toBeTruthy() check —
 * safe because the preceding assertion proves the value exists.
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SideCartItem from '@/components/Cart/SideCartItem.vue';

// Mock item — price 10, 50% discount, quantity 2
// Expected discounted price: 10 * (1 - 0.5) * 2 = 10.00
const mockItem = {
  id: 1,
  title: 'Lipstick',
  price: 10,
  discountPercentage: 50,
  thumbnail: 'https://example.com/image.jpg',
  quantity: 2,
};

describe('SideCartItem.vue', () => {
  it('renders product title', () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    expect(wrapper.text()).toContain('Lipstick');
  });

  it('renders product thumbnail with correct src and alt', () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockItem.thumbnail);
    expect(img.attributes('alt')).toBe(mockItem.title);
  });

  it('renders correct quantity', () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    expect(wrapper.find('.side-cart-item__qty').text()).toBe('2');
  });

  it('calculates discounted price correctly', () => {
    // Formula: price * (1 - discountPercentage / 100) * quantity
    // 10 * (1 - 0.5) * 2 = 10.00
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    expect(wrapper.find('.side-cart-item__price').text()).toContain('10.00');
  });

  it('emits increase with item id when + button clicked', async () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    const buttons = wrapper.findAll('.side-cart-item__qty-btn');
    await buttons[1]!.trigger('click'); // index 1 = + button
    expect(wrapper.emitted('increase')).toBeTruthy();
    expect(wrapper.emitted('increase')![0]![0]).toBe(1);
  });

  it('emits decrease with item id when − button clicked', async () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    const buttons = wrapper.findAll('.side-cart-item__qty-btn');
    await buttons[0]!.trigger('click'); // index 0 = − button
    expect(wrapper.emitted('decrease')).toBeTruthy();
    expect(wrapper.emitted('decrease')![0]![0]).toBe(1);
  });

  it('emits remove with item id when ✕ button clicked', async () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    await wrapper.find('.side-cart-item__remove').trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')![0]![0]).toBe(1);
  });
});
