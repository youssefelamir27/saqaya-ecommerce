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
        <p class="footer__col-text">
          111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
        </p>
        <p class="footer__col-text">exclusive@gmail.com</p>
        <p class="footer__col-text">+88015-88888-9999</p>
      </div>

      <!-- Account Column -->
      <div class="footer__col">
        <h4 class="footer__col-title">Account</h4>
        <ul class="footer__list">
          <li class="footer__list-item">My Account</li>
          <li class="footer__list-item">Login / Register</li>
          <li class="footer__list-item">Cart</li>
          <li class="footer__list-item">Wishlist</li>
          <li class="footer__list-item">Shop</li>
        </ul>
      </div>

      <!-- Quick Link Column -->
      <div class="footer__col">
        <h4 class="footer__col-title">Quick Link</h4>
        <ul class="footer__list">
          <li class="footer__list-item">Privacy Policy</li>
          <li class="footer__list-item">Terms Of Use</li>
          <li class="footer__list-item">FAQ</li>
          <li class="footer__list-item">Contact</li>
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
            <div class="footer__store-btn">
              <i class="footer__store-icon fab fa-google-play"></i>
              <span class="footer__store-text"
                >GET IT ON<br /><strong>Google Play</strong></span
              >
            </div>
            <div class="footer__store-btn">
              <i class="footer__store-icon fab fa-apple"></i>
              <span class="footer__store-text"
                >Download on the<br /><strong>App Store</strong></span
              >
            </div>
          </div>
        </div>
        <div class="footer__social">
          <i class="footer__social-icon fab fa-facebook-f"></i>
          <i class="footer__social-icon fab fa-twitter"></i>
          <i class="footer__social-icon fab fa-instagram"></i>
          <i class="footer__social-icon fab fa-linkedin-in"></i>
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

<script>
export default {
  name: 'AppFooter',
};
</script>
