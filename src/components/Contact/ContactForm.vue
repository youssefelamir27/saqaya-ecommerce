<template>
  <div class="contact__form">
    <div class="contact__form-row">
      <input
        v-model="localForm.name"
        type="text"
        placeholder="Your Name *"
        class="contact__input"
      />
      <input
        v-model="localForm.email"
        type="email"
        placeholder="Your Email *"
        class="contact__input"
      />
    </div>
    <textarea
      v-model="localForm.message"
      placeholder="Your Message"
      class="contact__textarea"
      rows="6"
    ></textarea>
    <div class="contact__form-actions">
      <button class="contact__submit-btn" @click="handleSubmit">
        Send Message
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ContactForm — contact message form component
 *
 * Manages its own local form state using reactive().
 * Validates all fields before emitting — parent (ContactView) handles submission.
 *
 * Vue 3 pattern:
 *   reactive() replaces data() for object state — all fields stay in sync.
 *   resetForm() mutates fields individually (can't replace the reactive object reference).
 *
 * @emits submit - fires with a copy of the form data when validation passes
 */

import { reactive } from 'vue';
import type { ContactForm } from '@/types/product';

/**
 * localForm — reactive form state
 * Uses reactive() instead of ref() since it's a multi-field object.
 * v-model on each input binds directly to localForm fields.
 */
const localForm = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
});

const emit = defineEmits<{
  submit: [form: ContactForm];
}>();

/**
 * handleSubmit — validates all fields and emits form data to parent
 * Shows alert if any field is empty — parent handles actual submission logic
 */
function handleSubmit(): void {
  if (!localForm.name || !localForm.email || !localForm.message) {
    alert('Please fill in all fields.');
    return;
  }
  // spread to emit a plain object copy — not the reactive reference
  emit('submit', { ...localForm });
  resetForm();
}

/**
 * resetForm — clears all form fields after successful submission
 * Mutates fields individually — can't reassign localForm directly with reactive()
 */
function resetForm(): void {
  localForm.name = '';
  localForm.email = '';
  localForm.message = '';
}
</script>
