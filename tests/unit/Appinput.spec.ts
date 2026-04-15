import { shallowMount } from '@vue/test-utils';
import AppInput from '@/components/UI/AppInput.vue';

describe('AppInput.vue', () => {
  it('renders input element', () => {
    const wrapper = shallowMount(AppInput);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('renders label when label prop is provided', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { label: 'Email', inputId: 'email' },
    });
    expect(wrapper.find('.app-input__label').exists()).toBe(true);
    expect(wrapper.find('.app-input__label').text()).toBe('Email');
  });

  it('does not render label when label prop is empty', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { label: '' },
    });
    expect(wrapper.find('.app-input__label').exists()).toBe(false);
  });

  it('renders correct placeholder', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { placeholder: 'Enter your email' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your email');
  });

  it('renders correct input type', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { type: 'email' },
    });
    expect(wrapper.find('input').attributes('type')).toBe('email');
  });

  it('emits input event with correct value', async () => {
    const wrapper = shallowMount(AppInput);
    const input = wrapper.find('input');
    (input.element as HTMLInputElement).value = 'test@email.com';
    await input.trigger('input');
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')![0]).toEqual(['test@email.com']);
  });

  it('emits blur event when input loses focus', async () => {
    const wrapper = shallowMount(AppInput);
    await wrapper.find('input').trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('renders error message when error prop is provided', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { error: 'This field is required' },
    });
    expect(wrapper.find('.app-input__error').exists()).toBe(true);
    expect(wrapper.find('.app-input__error').text()).toBe('This field is required');
  });

  it('does not render error when error prop is empty', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { error: '' },
    });
    expect(wrapper.find('.app-input__error').exists()).toBe(false);
  });

  it('adds error class to wrapper when error prop is provided', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { error: 'Required' },
    });
    expect(wrapper.classes()).toContain('app-input--error');
  });

  it('renders icon when icon prop is provided', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { icon: 'fa-search' },
    });
    expect(wrapper.find('.app-input__icon').exists()).toBe(true);
  });

  it('does not render icon when icon prop is empty', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { icon: '' },
    });
    expect(wrapper.find('.app-input__icon').exists()).toBe(false);
  });

  it('adds with-icon class to input when icon is provided', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { icon: 'fa-search' },
    });
    expect(wrapper.find('.app-input__field').classes()).toContain('app-input__field--with-icon');
  });

  it('disables input when disabled prop is true', () => {
    const wrapper = shallowMount(AppInput, {
      propsData: { disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeTruthy();
  });
});