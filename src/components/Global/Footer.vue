<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-col">
        <h3 class="footer-logo">Exclusive</h3>
        <h4>Subscribe</h4>
        <p>Get 10% off your first order</p>
        <div class="email-input">
          <input type="text" placeholder="Enter your email" />
          <i class="fas fa-paper-plane"></i>
        </div>
      </div>

      <div class="footer-col">
        <h4>Support</h4>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>

      <div class="footer-col">
        <h4>Account</h4>
        <ul>
          <li>My Account</li>
          <li>Login / Register</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Quick Link</h4>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Download App</h4>
        <p class="app-save">Save $3 with App New User Only</p>
        <div class="qr-row">
          <div class="qr-placeholder"></div>
          <div class="store-btns">
            <div class="store-btn">
              <i class="fab fa-google-play"></i>
              <span>GET IT ON<br /><strong>Google Play</strong></span>
            </div>
            <div class="store-btn">
              <i class="fab fa-apple"></i>
              <span>Download on the<br /><strong>App Store</strong></span>
            </div>
          </div>
        </div>
        <div class="social-icons">
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-linkedin-in"></i>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&#169; Copyright Rimel 2022. All right reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.footer {
  background-color: black;
  color: #ffffff;
  margin-top: 80px;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  padding: 60px 80px;
  gap: 40px;
  flex-wrap: wrap;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 160px;
}

.footer-logo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
}

.footer-col h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.footer-col p {
  font-size: 13px;
  color: #cccccc;
  margin: 0;
  line-height: 1.6;
}

.email-input {
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px 12px;
  gap: 8px;
}

.email-input input {
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 13px;
  width: 100%;
}

.email-input input::placeholder {
  color: #aaaaaa;
}

.email-input .fa-paper-plane {
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col ul li {
  font-size: 13px;
  color: #cccccc;
  cursor: pointer;
  transition: color 0.2s;
}

.footer-col ul li:hover {
  color: #ffffff;
}

.app-save {
  font-size: 11px;
  color: #aaaaaa;
}

.qr-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.qr-placeholder {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 4px;
  flex-shrink: 0;
}

.store-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.store-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #000000;
  border: 1px solid #555555;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
}

.store-btn i {
  font-size: 18px;
  color: #ffffff;
}

.store-btn span {
  font-size: 10px;
  color: #ffffff;
  line-height: 1.4;
}

.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  justify-content: center;
}

.social-icons i {
  font-size: 16px;
  cursor: pointer;
  color: #cccccc;
  transition: color 0.2s;
}

.social-icons i:hover {
  color: #ffffff;
}

.footer-bottom {
  border-top: 1px solid #333333;
  text-align: center;
  padding: 20px;
}

.footer-bottom p {
  font-size: 13px;
  color: #888888;
  margin: 0;
}
</style>
