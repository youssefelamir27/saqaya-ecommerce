<template>
  <div class="contact-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="current">Contact</span>
    </div>

    <div class="contact-wrapper">
      <!-- Left Image -->
      <div class="contact-image">
        <img :src="contactImage" alt="Contact us" />
      </div>

      <!-- Right Content -->
      <div class="contact-right">
        <!-- Call Us -->
        <div class="contact-card">
          <div class="contact-card-header">
            <div class="card-icon">
              <i class="fas fa-phone" style="color: white"></i>
            </div>
            <h3>Call us</h3>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>
        </div>

        <hr class="card-divider" />

        <!-- Write To Us -->
        <div class="contact-card">
          <div class="contact-card-header">
            <div class="card-icon">✉️</div>
            <h3>Write To US</h3>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>

          <div class="form-row">
            <input
              v-model="form.name"
              type="text"
              placeholder="Your Name *"
              class="form-input"
            />
            <input
              v-model="form.email"
              type="email"
              placeholder="Your Email *"
              class="form-input"
            />
          </div>

          <textarea
            v-model="form.message"
            placeholder="Your Message"
            class="form-textarea"
            rows="6"
          ></textarea>

          <div class="form-actions">
            <button class="send-btn" @click="sendMessage">Send Message</button>
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
      form: {
        name: '',
        email: '',
        message: '',
      },
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
        console.log('Fetch response:', res);
        const data = await res.json();
        this.contactImage = data.products[1].images;
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
