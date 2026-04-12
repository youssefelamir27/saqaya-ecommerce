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

      <!-- Support Column -->
      <div class="footer__col">
        <h4 class="footer__col-title">Support</h4>
        <p v-for="info in supportInfo" :key="info" class="footer__col-text">
          {{ info }}
        </p>
      </div>

      <!-- Account Column -->
      <div class="footer__col">
        <h4 class="footer__col-title">Account</h4>
        <ul class="footer__list">
          <!--v-for replaces 5 repeated li elements -->
          <li
            v-for="item in accountLinks"
            :key="item"
            class="footer__list-item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Quick Link Column -->
      <div class="footer__col">
        <h4 class="footer__col-title">Quick Link</h4>
        <ul class="footer__list">
          <!--v-for replaces 4 repeated li elements -->
          <li v-for="item in quickLinks" :key="item" class="footer__list-item">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Download App Column -->
      <div class="footer__col">
        <h4 class="footer__col-title">Download App</h4>
        <p class="footer__col-text footer__col-text--muted">
          Save $3 with App New User Only
        </p>
        <div class="footer__qr">
          <div class="footer__qr-placeholder"></div>
          <div class="footer__store-btns">
            <!--v-for replaces 2 repeated store button blocks -->
            <div
              v-for="store in storeButtons"
              :key="store.label"
              class="footer__store-btn"
            >
              <i :class="`footer__store-icon fab ${store.icon}`"></i>
              <span class="footer__store-text">
                {{ store.topText }}<br /><strong>{{ store.label }}</strong>
              </span>
            </div>
          </div>
        </div>
        <div class="footer__social">
          <!--v-for replaces 4 repeated social icon elements -->
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

<script lang="ts">
import Vue from 'vue';

interface StoreButton {
  icon: string;
  topText: string;
  label: string;
}

export default Vue.extend({
  name: 'AppFooter',

  data() {
    return {
      supportInfo: [
        '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
        'exclusive@gmail.com',
        '+88015-88888-9999',
      ] as string[],

      accountLinks: [
        'My Account',
        'Login / Register',
        'Cart',
        'Wishlist',
        'Shop',
      ] as string[],

      quickLinks: [
        'Privacy Policy',
        'Terms Of Use',
        'FAQ',
        'Contact',
      ] as string[],

      storeButtons: [
        { icon: 'fa-google-play', topText: 'GET IT ON', label: 'Google Play' },
        { icon: 'fa-apple', topText: 'Download on the', label: 'App Store' },
      ] as StoreButton[],

      socialIcons: [
        'fa-facebook-f',
        'fa-twitter',
        'fa-instagram',
        'fa-linkedin-in',
      ] as string[],
    };
  },
});
</script>
