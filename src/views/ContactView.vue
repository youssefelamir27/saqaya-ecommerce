<template>
  <div class="contact">
    <!-- Breadcrumb -->
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
        <!--ContactBox for Call Us section -->
        <contact-box title="Call us" icon="fa-phone">
          <p class="contact__card-text">
            We are available 24/7, 7 days a week.
          </p>
          <p class="contact__card-text">Phone: +8801611112222</p>
        </contact-box>

        <hr class="contact__divider" />

        <!--ContactBox for Write To Us section -->
        <contact-box title="Write To Us" icon="fa-envelope">
          <p class="contact__card-text">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <!--ContactForm handles all form logic and emits submit -->
          <contact-form @submit="handleFormSubmit" />
        </contact-box>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ContactForm as ContactFormType } from '@/types/product';
import ContactBox from '@/components/Contact/ContactBox.vue';
import ContactForm from '@/components/Contact/ContactForm.vue';
import axios from 'axios';
export default Vue.extend({
  name: 'ContactView',

  components: {
    ContactBox,
    ContactForm,
  },

  data() {
    return {
      contactImage: '' as string,
    };
  },

  async mounted() {
    await this.fetchContactImage();
  },

  methods: {
    async fetchContactImage(): Promise<void> {
      try {
        const res = await axios.get(
          'https://dummyjson.com/products/category/home-decoration'
        );
        this.contactImage = res.data.products[1].images[0];
      } catch (err) {
        console.error('Error fetching image:', err);
      }
    },

    //receives form data emitted from ContactForm
    handleFormSubmit(form: ContactFormType): void {
      console.log('Form submitted:', form);
      alert(`Message sent! We'll get back to you within 24 hours.`);
    },
  },
});
</script>
