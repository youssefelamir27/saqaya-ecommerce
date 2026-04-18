<template>
  <div class="app-input" :class="{ 'app-input--error': error }">
    <label v-if="label" class="app-input__label" :for="inputId">
      {{ label }}
    </label>
    <div class="app-input__wrapper">
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
    <p v-if="error" class="app-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
// Vue 3: v-model uses modelValue + update:modelValue instead of value + input
withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number';
    icon?: string;
    error?: string;
    disabled?: boolean;
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
    inputId: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  }
);

defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
}>();
</script>
