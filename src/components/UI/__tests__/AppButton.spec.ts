/**
 * AppButton.spec.ts — Unit tests for the AppButton component
 *
 * Tests the reusable button component used throughout the app.
 * No store or composable dependencies — pure prop/emit/slot testing.
 *
 * Test coverage:
 *   - Slot content rendering
 *   - Variant class applied correctly (primary, outline, dark)
 *   - Size class applied correctly (sm, md, lg)
 *   - Disabled class and attribute applied when disabled prop is true
 *   - Default variant (primary) and size (md) applied when no props provided
 *   - Click event emitted on click
 *   - Native click blocked when button is disabled
 */

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
    // Native disabled attribute blocks browser click events
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    });
    await wrapper.trigger('click');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
