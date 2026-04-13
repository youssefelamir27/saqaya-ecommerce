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

<script lang="ts">
import Vue from 'vue';
import { ContactForm } from '@/types/product';

export default Vue.extend({
  name: 'ContactForm',

  data() {
    return {
      // ✅ local form state — ContactForm keeps its own data
      localForm: {
        name: '',
        email: '',
        message: '',
      } as ContactForm,
    };
  },

  methods: {
    handleSubmit(): void {
      if (
        !this.localForm.name ||
        !this.localForm.email ||
        !this.localForm.message
      ) {
        alert('Please fill in all fields.');
        return;
      }
      // ✅ emit up to parent so ContactView can handle the submission
      this.$emit('submit', { ...this.localForm });
      this.resetForm();
    },

    resetForm(): void {
      this.localForm = { name: '', email: '', message: '' };
    },
  },
});
</script>
