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
        :value="value"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
    </div>
    <p v-if="error" class="app-input__error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppInput',

  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String as () => 'text' | 'email' | 'password' | 'number',
      default: 'text',
    },
    icon: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // unique id for label/input pairing — good for accessibility
    inputId: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
    },
  },
});
</script>
