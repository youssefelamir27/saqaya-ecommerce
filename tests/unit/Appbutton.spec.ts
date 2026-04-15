import { shallowMount } from '@vue/test-utils';
import AppButton from '@/components/UI/AppButton.vue';

describe('AppButton.vue', () => {
  it('renders slot content correctly', () => {
    const wrapper = shallowMount(AppButton, {
      slots: { default: 'Click Me' },
    });
    expect(wrapper.text()).toBe('Click Me');
  });

  it('applies primary variant class by default', () => {
    const wrapper = shallowMount(AppButton);
    expect(wrapper.classes()).toContain('btn--primary');
  });

  it('applies outline variant class', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { variant: 'outline' },
    });
    expect(wrapper.classes()).toContain('btn--outline');
  });

  it('applies dark variant class', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { variant: 'dark' },
    });
    expect(wrapper.classes()).toContain('btn--dark');
  });

  it('applies sm size class', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { size: 'sm' },
    });
    expect(wrapper.classes()).toContain('btn--size-sm');
  });

  it('applies md size class by default', () => {
    const wrapper = shallowMount(AppButton);
    expect(wrapper.classes()).toContain('btn--size-md');
  });

  it('applies lg size class', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { size: 'lg' },
    });
    expect(wrapper.classes()).toContain('btn--size-lg');
  });

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { disabled: true },
    });
    expect(wrapper.classes()).toContain('btn--disabled');
  });

  it('sets disabled attribute when disabled prop is true', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { disabled: true },
    });
    expect(wrapper.attributes('disabled')).toBeTruthy();
  });

  it('does not have disabled attribute when disabled is false', () => {
    const wrapper = shallowMount(AppButton, {
      propsData: { disabled: false },
    });
    expect(wrapper.attributes('disabled')).toBeFalsy();
  });

  it('emits click event when clicked', async () => {
    const wrapper = shallowMount(AppButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('always has base btn class', () => {
    const wrapper = shallowMount(AppButton);
    expect(wrapper.classes()).toContain('btn');
  });
});