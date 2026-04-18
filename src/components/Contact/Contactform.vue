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
import { reactive } from 'vue';
import type { ContactForm } from '@/types/product';

// reactive replaces data() for objects — keeps all fields in sync
const localForm = reactive<ContactForm>({
  name: '',
  email: '',
  message: '',
});

const emit = defineEmits<{
  submit: [form: ContactForm];
}>();

function handleSubmit(): void {
  if (!localForm.name || !localForm.email || !localForm.message) {
    alert('Please fill in all fields.');
    return;
  }
  // emit up to parent so ContactView can handle the submission
  emit('submit', { ...localForm });
  resetForm();
}

function resetForm(): void {
  localForm.name = '';
  localForm.email = '';
  localForm.message = '';
}
</script>
