import { shallowMount } from '@vue/test-utils';
import SideCartItem from '@/components/Cart/SideCartItem.vue';

const mockItem = {
  id: 1,
  title: 'Essence Mascara',
  price: 9.99,
  discountPercentage: 10,
  thumbnail: 'https://cdn.dummyjson.com/1.webp',
  quantity: 2,
};

describe('SideCartItem.vue', () => {
  it('renders item title', () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    expect(wrapper.find('.side-cart-item__title').text()).toBe('Essence Mascara');
  });

  it('renders item thumbnail with correct src', () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    expect(wrapper.find('.side-cart-item__image').attributes('src')).toBe(mockItem.thumbnail);
  });

  it('renders correct quantity', () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    expect(wrapper.find('.side-cart-item__qty').text()).toBe('2');
  });

  it('calculates discounted price correctly — qty 2 with 10% discount', () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    // 9.99 * (1 - 0.10) * 2 = 17.98
    expect(wrapper.find('.side-cart-item__price').text()).toContain('17.98');
  });

  it('calculates price correctly with zero discount', () => {
    const wrapper = shallowMount(SideCartItem, {
      propsData: { item: { ...mockItem, discountPercentage: 0, quantity: 1 } },
    });
    expect(wrapper.find('.side-cart-item__price').text()).toContain('9.99');
  });

  it('calculates price correctly with 100% discount', () => {
    const wrapper = shallowMount(SideCartItem, {
      propsData: { item: { ...mockItem, discountPercentage: 100, quantity: 1 } },
    });
    expect(wrapper.find('.side-cart-item__price').text()).toContain('0.00');
  });

  it('emits decrease with item id when − button clicked', async () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    await wrapper.findAll('.side-cart-item__qty-btn').at(0).trigger('click');
    expect(wrapper.emitted('decrease')).toBeTruthy();
    expect(wrapper.emitted('decrease')![0]).toEqual([mockItem.id]);
  });

  it('emits increase with item id when + button clicked', async () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    await wrapper.findAll('.side-cart-item__qty-btn').at(1).trigger('click');
    expect(wrapper.emitted('increase')).toBeTruthy();
    expect(wrapper.emitted('increase')![0]).toEqual([mockItem.id]);
  });

  it('emits remove with item id when ✕ button clicked', async () => {
    const wrapper = shallowMount(SideCartItem, { propsData: { item: mockItem } });
    await wrapper.find('.side-cart-item__remove').trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')![0]).toEqual([mockItem.id]);
  });
});