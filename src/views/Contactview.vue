<template>
  <div class="contact">
    <div class="contact__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="contact__breadcrumb-current">Contact</span>
    </div>

    <div class="contact__wrapper">
      <!-- Left — decorative image fetched from API -->
      <div class="contact__image">
        <img :src="contactImage" alt="Contact us" />
      </div>

      <!-- Right — contact info and form -->
      <div class="contact__right">
        <!-- Call Us section -->
        <ContactBox title="Call us" icon="fa-phone">
          <p class="contact__card-text">We are available 24/7, 7 days a week.</p>
          <p class="contact__card-text">Phone: +8801611112222</p>
        </ContactBox>

        <hr class="contact__divider" />

        <!-- Write To Us section — ContactForm handles all form logic -->
        <ContactBox title="Write To Us" icon="fa-envelope">
          <p class="contact__card-text">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <!-- ContactForm emits 'submit' with form data — handled here -->
          <ContactForm @submit="handleFormSubmit" />
        </ContactBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ContactView — contact page (/contact)
 *
 * Displays contact information and a message form.
 * Fetches a decorative image from DummyJSON home-decoration category on mount.
 *
 * ContactBox is used as a reusable card wrapper for both sections.
 * ContactForm emits 'submit' up to this view — separation of concerns:
 *   - ContactForm: manages form state and validation
 *   - ContactView: handles what happens after submission
 */

import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { ContactForm as ContactFormType } from '@/types/product';
import ContactBox from '@/components/Contact/ContactBox.vue';
import ContactForm from '@/components/Contact/ContactForm.vue';

/** contactImage — decorative image URL fetched from DummyJSON API */
const contactImage = ref('');

/**
 * fetchContactImage — fetches a decorative image from home-decoration category
 * Uses index [1] to get a visually interesting product image
 */
async function fetchContactImage(): Promise<void> {
  try {
    const res = await axios.get('https://dummyjson.com/products/category/home-decoration');
    contactImage.value = res.data.products[1].images[0];
  } catch (err) {
    console.error('Error fetching image:', err);
  }
}

/**
 * handleFormSubmit — receives validated form data from ContactForm
 * Currently logs and alerts — replace with real API call in production
 * @param form - ContactForm data object with name, email, message
 */
function handleFormSubmit(form: ContactFormType): void {
  console.log('Form submitted:', form);
  alert(`Message sent! We'll get back to you within 24 hours.`);
}

onMounted(async () => {
  await fetchContactImage();
});
</script>
