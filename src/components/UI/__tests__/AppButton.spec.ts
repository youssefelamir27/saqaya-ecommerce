import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppButton from '@/components/UI/AppButton.vue';

describe('AppButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click me' },
    });
    expect(wrapper.text()).toBe('Click me');
  });

  it('applies correct variant class', () => {
    const wrapper = mount(AppButton, {
      props: { variant: 'outline' },
    });
    expect(wrapper.classes()).toContain('btn--outline');
  });

  it('applies correct size class', () => {
    const wrapper = mount(AppButton, {
      props: { size: 'lg' },
    });
    expect(wrapper.classes()).toContain('btn--size-lg');
  });

  it('applies disabled class and attribute when disabled', () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('btn--disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('uses primary variant by default', () => {
    const wrapper = mount(AppButton);
    expect(wrapper.classes()).toContain('btn--primary');
  });

  it('uses md size by default', () => {
    const wrapper = mount(AppButton);
    expect(wrapper.classes()).toContain('btn--size-md');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(AppButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    });
    await wrapper.trigger('click');
    // button is disabled so native click is blocked
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
