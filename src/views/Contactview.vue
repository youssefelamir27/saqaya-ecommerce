<template>
  <div class="contact">
    <div class="contact__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="contact__breadcrumb-current">Contact</span>
    </div>

    <div class="contact__wrapper">
      <!-- Left Image -->
      <div class="contact__image">
        <img :src="contactImage" alt="Contact us" />
      </div>

      <!-- Right Content -->
      <div class="contact__right">
        <!-- ContactBox for Call Us section -->
        <ContactBox title="Call us" icon="fa-phone">
          <p class="contact__card-text">We are available 24/7, 7 days a week.</p>
          <p class="contact__card-text">Phone: +8801611112222</p>
        </ContactBox>

        <hr class="contact__divider" />

        <!-- ContactBox for Write To Us section -->
        <ContactBox title="Write To Us" icon="fa-envelope">
          <p class="contact__card-text">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <!-- ContactForm handles all form logic and emits submit -->
          <ContactForm @submit="handleFormSubmit" />
        </ContactBox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { ContactForm as ContactFormType } from '@/types/product';
import ContactBox from '@/components/Contact/ContactBox.vue';
import ContactForm from '@/components/Contact/ContactForm.vue';

const contactImage = ref('');

async function fetchContactImage(): Promise<void> {
  try {
    const res = await axios.get('https://dummyjson.com/products/category/home-decoration');
    contactImage.value = res.data.products[1].images[0];
  } catch (err) {
    console.error('Error fetching image:', err);
  }
}

// receives form data emitted from ContactForm
function handleFormSubmit(form: ContactFormType): void {
  console.log('Form submitted:', form);
  alert(`Message sent! We'll get back to you within 24 hours.`);
}

onMounted(async () => {
  await fetchContactImage();
});
</script>
