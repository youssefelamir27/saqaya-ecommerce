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
        <!-- Call Us -->
        <div class="contact__card">
          <div class="contact__card-header">
            <div class="contact__card-icon">
              <i class="fas fa-phone" style="color: white"></i>
            </div>
            <h3>Call us</h3>
          </div>
          <p class="contact__card-text">
            We are available 24/7, 7 days a week.
          </p>
          <p class="contact__card-text">Phone: +8801611112222</p>
        </div>

        <hr class="contact__divider" />

        <!-- Write To Us -->
        <div class="contact__card">
          <div class="contact__card-header">
            <div class="contact__card-icon">✉️</div>
            <h3>Write To US</h3>
          </div>
          <p class="contact__card-text">
            Fill out our form and we will contact you within 24 hours.
          </p>

          <div class="contact__form-row">
            <input
              v-model="form.name"
              type="text"
              placeholder="Your Name *"
              class="contact__input"
            />
            <input
              v-model="form.email"
              type="email"
              placeholder="Your Email *"
              class="contact__input"
            />
          </div>

          <textarea
            v-model="form.message"
            placeholder="Your Message"
            class="contact__textarea"
            rows="6"
          ></textarea>

          <div class="contact__form-actions">
            <button class="contact__submit-btn" @click="sendMessage">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      contactImage: '',
      form: { name: '', email: '', message: '' },
    };
  },
  async mounted() {
    await this.fetchContactImage();
  },
  methods: {
    async fetchContactImage() {
      try {
        const res = await fetch(
          'https://dummyjson.com/products/category/home-decoration'
        );
        const data = await res.json();
        this.contactImage = data.products[1].images[0];
      } catch (err) {
        console.error('Error fetching image:', err);
      }
    },
    sendMessage() {
      if (!this.form.name || !this.form.email || !this.form.message) {
        alert('Please fill in all fields.');
        return;
      }
      alert(`Message sent! We'll get back to you within 24 hours.`);
      this.form = { name: '', email: '', message: '' };
    },
  },
};
</script>
