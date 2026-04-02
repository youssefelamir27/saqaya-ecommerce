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

<style scoped>
/* Block */
.footer {
  background-color: #000000;
  color: #ffffff;
  margin-top: 80px;
}

/* Elements */
.footer__main {
  display: flex;
  justify-content: space-between;
  padding: 60px 80px;
  gap: 40px;
  flex-wrap: nowrap;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 160px;
}

.footer__logo {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
}

.footer__col-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.footer__col-text {
  font-size: 13px;
  color: #cccccc;
  margin: 0;
  line-height: 1.6;
}

/* Modifier */
.footer__col-text--muted {
  font-size: 11px;
  color: #aaaaaa;
}

.footer__email {
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 4px;
  padding: 8px 12px;
  gap: 8px;
}

.footer__email-input {
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 13px;
  width: 100%;
}

.footer__email-input::placeholder {
  color: #aaaaaa;
}

.footer__email-icon {
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__list-item {
  font-size: 13px;
  color: #cccccc;
  cursor: pointer;
  transition: color 0.2s;
}

.footer__list-item:hover {
  color: #ffffff;
}

.footer__qr {
  display: flex;
  gap: 12px;
  align-items: center;
}

.footer__qr-placeholder {
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 4px;
  flex-shrink: 0;
}

.footer__store-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer__store-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #000000;
  border: 1px solid #555555;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
}

.footer__store-icon {
  font-size: 18px;
  color: #ffffff;
}

.footer__store-text {
  font-size: 10px;
  color: #ffffff;
  line-height: 1.4;
}

.footer__social {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  justify-content: center;
}

.footer__social-icon {
  font-size: 16px;
  cursor: pointer;
  color: #cccccc;
  transition: color 0.2s;
}

.footer__social-icon:hover {
  color: #ffffff;
}

.footer__bottom {
  border-top: 1px solid #333333;
  text-align: center;
  padding: 20px;
}

.footer__bottom-text {
  font-size: 13px;
  color: #888888;
  margin: 0;
}

/* Tablet */
@media (max-width: 1024px) {
  .footer__main {
    padding: 40px 40px;
    gap: 24px;
  }

  .footer__col {
    min-width: 140px;
  }
}
/* exclusive for 892 widtg */
@media (max-width: 892px) {
  .footer__main {
    justify-content: space-around;
    flex-wrap: wrap;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .footer__main {
    flex-direction: column;
    padding: 40px 24px;
    gap: 32px;
  }

  .footer__col {
    width: 100%;
    min-width: unset;
  }

  .footer__email {
    width: 100%;
  }

  .footer__qr {
    flex-direction: row;
    justify-content: center;
  }

  .footer__social {
    justify-content: center;
  }

  .footer__bottom-text {
    font-size: 12px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .footer__main {
    padding: 32px 16px;
  }

  .footer__logo {
    font-size: 18px;
  }

  .footer__qr {
    flex-direction: column;
    justify-content: center;
  }

  .footer__store-btns {
    width: 100%;
  }

  .footer__store-btn {
    justify-content: center;
  }
}
</style>
