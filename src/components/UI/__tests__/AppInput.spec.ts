import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppInput from '@/components/UI/AppInput.vue';

describe('AppInput.vue', () => {
  it('renders input element', () => {
    const wrapper = mount(AppInput);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('renders label when provided', () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Email' },
    });
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Email');
  });

  it('does not render label when not provided', () => {
    const wrapper = mount(AppInput);
    expect(wrapper.find('label').exists()).toBe(false);
  });

  it('renders error message when error prop provided', () => {
    const wrapper = mount(AppInput, {
      props: { error: 'Field is required' },
    });
    expect(wrapper.find('.app-input__error').text()).toBe('Field is required');
  });

  it('applies error class when error prop provided', () => {
    const wrapper = mount(AppInput, {
      props: { error: 'Field is required' },
    });
    expect(wrapper.find('.app-input').classes()).toContain('app-input--error');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppInput);
    const input = wrapper.find('input');
    await input.setValue('hello');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('hello');
  });

  it('sets correct input type', () => {
    const wrapper = mount(AppInput, {
      props: { type: 'email' },
    });
    expect(wrapper.find('input').attributes('type')).toBe('email');
  });

  it('sets placeholder correctly', () => {
    const wrapper = mount(AppInput, {
      props: { placeholder: 'Enter email' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter email');
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(AppInput, {
      props: { disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('renders icon when icon prop provided', () => {
    const wrapper = mount(AppInput, {
      props: { icon: 'fa-search' },
    });
    expect(wrapper.find('i').exists()).toBe(true);
  });
  it('emits blur event on blur', async () => {
  const wrapper = mount(AppInput);
  await wrapper.find('input').trigger('blur');
  expect(wrapper.emitted('blur')).toBeTruthy();
});
});
