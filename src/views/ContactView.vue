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
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
          alt="Contact us"
        />
      </div>

      <!-- Right Content -->
      <div class="contact-right">
        <!-- Call Us -->
        <div class="contact-card">
          <div class="contact-card-header">
            <div class="card-icon">📞</div>
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
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },

  methods: {
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

<style scoped>
.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4rem;
  position: relative;
}

/* Breadcrumb */
.breadcrumb {
  font-size: 13px;
  color: #999999;
  margin-bottom: 60px;
  position: absolute;
  top: 0;
  left: 80;
}

.breadcrumb a {
  text-decoration: none;
  color: #999999;
}

.breadcrumb a:hover {
  color: #000000;
}
.current {
  color: #000000;
  font-weight: bold;
}

/* Layout */
.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  align-items: stretch;
}

/* Left Image */
.contact-image {
  border-radius: 8px;
  overflow: hidden;
}

.contact-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Right Content */
.contact-right {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.contact-card {
  padding: 16px 0;
}

.contact-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #db4444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.contact-card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.contact-card p {
  font-size: 13px;
  color: #555555;
  line-height: 1.7;
  margin: 0 0 6px;
}

.card-divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 8px 0;
}

/* Form */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
  margin-bottom: 16px;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 13px;
  color: #000000;
  outline: none;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #999999;
}

.form-input:focus {
  background: #eeeeee;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 13px;
  color: #000000;
  outline: none;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;
}

.form-textarea::placeholder {
  color: #999999;
}

.form-textarea:focus {
  background: #eeeeee;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.send-btn {
  padding: 14px 32px;
  background: #db4444;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:hover {
  background: #c03333;
}
@media (max-width: 850px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
