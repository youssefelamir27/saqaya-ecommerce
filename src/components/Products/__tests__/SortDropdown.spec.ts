/**
 * SortDropdown.spec.ts — Unit tests for the SortDropdown component
 *
 * Tests the v-model-compatible sort dropdown used in ProductsView.
 *
 * Test coverage:
 *   - Renders the label and select element
 *   - Renders all 5 sort options
 *   - Reflects modelValue prop as selected option
 *   - Emits 'update:modelValue' with correct value on change
 *   - Default option is rendered when no modelValue provided
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SortDropdown from '@/components/Products/SortDropdown.vue';

describe('SortDropdown', () => {
  it('renders label and select', () => {
    const wrapper = mount(SortDropdown);
    expect(wrapper.find('.sort-dropdown__label').text()).toBe('Sort by:');
    expect(wrapper.find('.sort-dropdown__select').exists()).toBe(true);
  });

  it('renders all 5 sort options', () => {
    const wrapper = mount(SortDropdown);
    const options = wrapper.findAll('option');
    expect(options).toHaveLength(5);
    expect(options[0].text()).toBe('Default');
    expect(options[1].text()).toBe('Price: Low to High');
    expect(options[2].text()).toBe('Price: High to Low');
    expect(options[3].text()).toBe('Rating: High to Low');
    expect(options[4].text()).toBe('Rating: Low to High');
  });

  it('reflects modelValue prop as the selected value', () => {
    const wrapper = mount(SortDropdown, {
      props: { modelValue: 'price-asc' },
    });
    const select = wrapper.find('.sort-dropdown__select');
    expect((select.element as HTMLSelectElement).value).toBe('price-asc');
  });

  it('emits update:modelValue with new value on change', async () => {
    const wrapper = mount(SortDropdown, {
      props: { modelValue: '' },
    });
    const select = wrapper.find('.sort-dropdown__select');
    await select.setValue('price-desc');
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual(['price-desc']);
  });

  it('defaults to empty string when no modelValue provided', () => {
    const wrapper = mount(SortDropdown);
    const select = wrapper.find('.sort-dropdown__select');
    expect((select.element as HTMLSelectElement).value).toBe('');
  });
});
