import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SideCartItem from '@/components/Cart/SideCartItem.vue';

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

  it('renders product thumbnail', () => {
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
    // price 10, discount 50%, qty 2 → 10 * 0.5 * 2 = 10.00
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    expect(wrapper.find('.side-cart-item__price').text()).toContain('10.00');
  });

  it('emits increase with item id when + clicked', async () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    const buttons = wrapper.findAll('.side-cart-item__qty-btn');
    await buttons[1].trigger('click');
    expect(wrapper.emitted('increase')).toBeTruthy();
    expect(wrapper.emitted('increase')![0][0]).toBe(1);
  });

  it('emits decrease with item id when - clicked', async () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    const buttons = wrapper.findAll('.side-cart-item__qty-btn');
    await buttons[0].trigger('click');
    expect(wrapper.emitted('decrease')).toBeTruthy();
    expect(wrapper.emitted('decrease')![0][0]).toBe(1);
  });

  it('emits remove with item id when ✕ clicked', async () => {
    const wrapper = mount(SideCartItem, { props: { item: mockItem } });
    await wrapper.find('.side-cart-item__remove').trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')![0][0]).toBe(1);
  });
});
