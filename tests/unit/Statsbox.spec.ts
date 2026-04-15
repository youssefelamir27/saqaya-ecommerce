import { shallowMount } from '@vue/test-utils';
import StatsBox from '@/components/About/StatsBox.vue';

const mockStats = [
  { icon: '🏪', value: '10.5k', label: 'Sellers active our site' },
  { icon: '💰', value: '33k', label: 'Monthly Product Sale' },
  { icon: '🛍️', value: '45.5k', label: 'Customer active in our site' },
  { icon: '💵', value: '25k', label: 'Annual gross sale in our site' },
];

describe('StatsBox.vue', () => {
  it('renders correct number of stat cards', () => {
    const wrapper = shallowMount(StatsBox, {
      propsData: { stats: mockStats, activeIndex: 0 },
    });
    expect(wrapper.findAll('.stats__card').length).toBe(4);
  });

  it('renders stat values correctly', () => {
    const wrapper = shallowMount(StatsBox, {
      propsData: { stats: mockStats, activeIndex: 0 },
    });
    expect(wrapper.text()).toContain('10.5k');
    expect(wrapper.text()).toContain('33k');
  });

  it('renders stat labels correctly', () => {
    const wrapper = shallowMount(StatsBox, {
      propsData: { stats: mockStats, activeIndex: 0 },
    });
    expect(wrapper.text()).toContain('Sellers active our site');
  });

  it('applies stats__card--active class to correct card', () => {
    const wrapper = shallowMount(StatsBox, {
      propsData: { stats: mockStats, activeIndex: 1 },
    });
    const cards = wrapper.findAll('.stats__card');
    expect(cards.at(1).classes()).toContain('stats__card--active');
    expect(cards.at(0).classes()).not.toContain('stats__card--active');
  });

  it('emits select with correct index when card is clicked', async () => {
    const wrapper = shallowMount(StatsBox, {
      propsData: { stats: mockStats, activeIndex: 0 },
    });
    await wrapper.findAll('.stats__card').at(2).trigger('click');
    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')![0]).toEqual([2]);
  });

  it('emits select with index 0 when first card clicked', async () => {
    const wrapper = shallowMount(StatsBox, {
      propsData: { stats: mockStats, activeIndex: 1 },
    });
    await wrapper.findAll('.stats__card').at(0).trigger('click');
    expect(wrapper.emitted('select')![0]).toEqual([0]);
  });
});