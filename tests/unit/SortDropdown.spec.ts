import { shallowMount } from '@vue/test-utils';
import SortDropdown from '@/components/Products/SortDropdown.vue';

describe('SortDropdown.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(SortDropdown, {
      propsData: { value: '' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders all sort options', () => {
    const wrapper = shallowMount(SortDropdown, {
      propsData: { value: '' },
    });
    const options = wrapper.findAll('option');
    // Default + 4 sort options = 5
    expect(options.length).toBe(5);
  });

  it('renders the correct selected value from prop', () => {
    const wrapper = shallowMount(SortDropdown, {
      propsData: { value: 'price-asc' },
    });
    const select = wrapper.find('select');
    expect((select.element as HTMLSelectElement).value).toBe('price-asc');
  });

  it('emits input event with correct value when selection changes', async () => {
    const wrapper = shallowMount(SortDropdown, {
      propsData: { value: '' },
    });
    const select = wrapper.find('select');
    (select.element as HTMLSelectElement).value = 'price-desc';
    await select.trigger('change');
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')![0]).toEqual(['price-desc']);
  });

  it('renders label text', () => {
    const wrapper = shallowMount(SortDropdown, {
      propsData: { value: '' },
    });
    expect(wrapper.find('.sort-dropdown__label').text()).toBe('Sort by:');
  });
});