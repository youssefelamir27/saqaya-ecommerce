<template>
  <footer class="footer">
    <div class="footer__main">
      <!-- Subscribe Column -->
      <div class="footer__col">
        <h3 class="footer__logo">Exclusive</h3>
        <h4 class="footer__col-title">Subscribe</h4>
        <p class="footer__col-text">Get 10% off your first order</p>
        <div class="footer__email">
          <input
            class="footer__email-input"
            type="text"
            placeholder="Enter your email"
          />
          <i class="footer__email-icon fas fa-paper-plane"></i>
        </div>
      </div>

      <!-- Support Column — contact info rendered via v-for -->
      <div class="footer__col">
        <h4 class="footer__col-title">Support</h4>
        <p v-for="info in supportInfo" :key="info" class="footer__col-text">
          {{ info }}
        </p>
      </div>

      <!-- Account Column — account links rendered via v-for -->
      <div class="footer__col">
        <h4 class="footer__col-title">Account</h4>
        <ul class="footer__list">
          <li v-for="item in accountLinks" :key="item" class="footer__list-item">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Quick Link Column — router-link navigation items -->
      <div class="footer__col">
        <h4 class="footer__col-title">Quick Link</h4>
        <ul class="footer__list">
          <li v-for="item in quickLinks" :key="item.label" class="footer__list-item">
            <router-link :to="item.to">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Download App Column — store buttons and social icons -->
      <div class="footer__col">
        <h4 class="footer__col-title">Download App</h4>
        <p class="footer__col-text footer__col-text--muted">
          Save $3 with App New User Only
        </p>
        <div class="footer__qr">
          <div class="footer__qr-placeholder"></div>
          <div class="footer__store-btns">
            <div v-for="store in storeButtons" :key="store.label" class="footer__store-btn">
              <i :class="`footer__store-icon fab ${store.icon}`"></i>
              <span class="footer__store-text">
                {{ store.topText }}<br /><strong>{{ store.label }}</strong>
              </span>
            </div>
          </div>
        </div>
        <div class="footer__social">
          <i
            v-for="social in socialIcons"
            :key="social"
            :class="`footer__social-icon fab ${social}`"
          ></i>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p class="footer__bottom-text">
        &#169; Copyright Rimel 2022. All right reserved
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * AppFooter — global site footer component
 *
 * Purely presentational — no props, no emits, no store access.
 * All data is static and defined as plain consts (not reactive)
 * since it never changes at runtime.
 *
 * Sections: Subscribe, Support, Account, Quick Links, Download App
 */

defineOptions({ name: 'AppFooter' })

// local interfaces for typed static data
interface StoreButton {
  icon: string;
  topText: string;
  label: string;
}

interface QuickLink {
  label: string;
  to: string;
}

// plain consts instead of data() — no reactivity needed for static content
const supportInfo: string[] = [
  '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
  'exclusive@gmail.com',
  '+88015-88888-9999',
];

const accountLinks: string[] = [
  'My Account',
  'Login / Register',
  'Cart',
  'Wishlist',
  'Shop',
];

const quickLinks: QuickLink[] = [
  { label: 'Privacy Policy', to: '/' },
  { label: 'Terms Of Use', to: '/' },
  { label: 'FAQ', to: '/' },
  { label: 'Contact', to: '/contact' },
];

const storeButtons: StoreButton[] = [
  { icon: 'fa-google-play', topText: 'GET IT ON', label: 'Google Play' },
  { icon: 'fa-apple', topText: 'Download on the', label: 'App Store' },
];

const socialIcons: string[] = [
  'fa-facebook-f',
  'fa-twitter',
  'fa-instagram',
  'fa-linkedin-in',
];
</script>
