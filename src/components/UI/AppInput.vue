<template>
  <div class="app-input" :class="{ 'app-input--error': error }">
    <!-- label only rendered when label prop is provided -->
    <label v-if="label" class="app-input__label" :for="inputId">
      {{ label }}
    </label>
    <div class="app-input__wrapper">
      <!-- icon only rendered when icon prop is provided -->
      <i v-if="icon" :class="`app-input__icon fas ${icon}`"></i>
      <input
        :id="inputId"
        class="app-input__field"
        :class="{ 'app-input__field--with-icon': icon }"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
      />
    </div>
    <!-- error message only shown when error prop is provided -->
    <p v-if="error" class="app-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * AppInput — reusable input field component
 *
 * Supports v-model binding, optional label, icon, error message, and accessibility.
 * Each instance generates a unique inputId by default for label/input pairing.
 *
 * Vue 3 v-model change:
 *   Vue 2: prop `value` + emit `input`
 *   Vue 3: prop `modelValue` + emit `update:modelValue`
 *   Usage in parent is identical: <AppInput v-model="email" />
 *
 * @props modelValue - bound value via v-model (default: '')
 * @props label - label text shown above the input (optional)
 * @props placeholder - input placeholder text (optional)
 * @props type - HTML input type: text | email | password | number (default: 'text')
 * @props icon - Font Awesome icon class e.g. 'fa-search' (optional)
 * @props error - error message shown below the input (optional)
 * @props disabled - disables the input field (default: false)
 * @props inputId - unique id for label/input pairing — auto-generated if not provided
 *
 * @emits update:modelValue - fires on every keystroke with the new value
 * @emits blur - fires when the input loses focus
 *
 * @example
 * <AppInput
 *   v-model="email"
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   :error="emailError"
 * />
 */

withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    icon?: string;
    error?: string;
    disabled?: boolean;
    // unique id for label/input pairing — important for accessibility
    inputId?: string;
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: '',
    type: 'text',
    icon: '',
    error: '',
    disabled: false,
    // auto-generate unique id if not provided
    inputId: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  }
);

defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
}>();
</script>
