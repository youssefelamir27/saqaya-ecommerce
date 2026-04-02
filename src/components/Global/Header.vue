<template>
  <div class="header">
    <div class="header__container">
      <!-- Logo -->
      <h6 class="header__logo">Exclusive</h6>

      <!-- Desktop Navigation -->
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <router-link class="header__nav-link" to="/" @click="closeMenu" exact
          >Home</router-link
        >
        <router-link class="header__nav-link" to="/contact" @click="closeMenu"
          >Contact</router-link
        >
        <router-link class="header__nav-link" to="/about" @click="closeMenu"
          >About</router-link
        >

        <!-- Mobile Search and Cart -->
        <div class="header__mobile-actions">
          <div class="header__search header__search--mobile">
            <input
              class="header__search-input"
              type="text"
              placeholder="What are you looking for?"
            />
            <i class="header__search-icon fas fa-search"></i>
          </div>
          <div class="header__cart header__cart--mobile">
            <i class="fas fa-cart-plus"></i>
            <span class="header__cart-badge" v-if="!isErrorPage">{{
              quantity
            }}</span>
          </div>
        </div>
      </nav>

      <!-- Desktop Right Side -->
      <div class="header__actions">
        <div class="header__search">
          <input
            class="header__search-input"
            type="text"
            placeholder="What are you looking for?"
          />
          <i class="header__search-icon fas fa-search"></i>
        </div>
        <div class="header__cart">
          <i class="fas fa-cart-plus"></i>
          <span class="header__cart-badge" v-if="!isErrorPage">{{
            quantity
          }}</span>
        </div>
      </div>

      <!-- Hamburger -->
      <button
        class="header__hamburger"
        :class="{ 'header__hamburger--active': isMenuOpen }"
        @click="toggleMenu"
      >
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
        <span class="header__hamburger-line"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false,
      quantity: localStorage.getItem('cartquantity')
        ? JSON.parse(localStorage.getItem('cartquantity'))
        : 0,
    };
  },
  computed: {
    isErrorPage() {
      return this.$route.name === 'ErrorPage';
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    syncCartQuantity() {
      this.quantity = localStorage.getItem('cartquantity')
        ? JSON.parse(localStorage.getItem('cartquantity'))
        : 0;
    },
  },
  created() {
    window.addEventListener('cart-updated', this.syncCartQuantity);
  },
};
</script>

<style>
/* Block */
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}

/* Elements */
.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header__logo {
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 1px;
  margin: 0;
  flex-shrink: 0;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
}

.header__nav-link {
  text-decoration: none;
  color: #000000;
  font-size: 15px;
  padding-bottom: 4px;
  position: relative;
}

.header__nav-link::after {
  content: '';
  width: 0;
  height: 2px;
  background-color: #000000;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: width 1s;
}

.header__nav-link.router-link-active::after {
  width: 100%;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}

.header__search {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 6px 12px;
  width: 240px;
}

.header__search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #000000;
  width: 100%;
}

.header__search-input::placeholder {
  color: #999999;
}

.header__search-icon {
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.header__search-icon:hover {
  color: #42b983;
}

.header__cart {
  position: relative;
  cursor: pointer;
}

.header__cart .fa-cart-plus {
  font-size: 20px;
  color: #000000;
  transition: color 0.3s;
}

.header__cart:hover .fa-cart-plus {
  color: #42b983;
}

.header__cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #db4444;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__mobile-actions {
  display: none;
}

.header__hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}

.header__hamburger-line {
  width: 25px;
  height: 2px;
  background-color: #000000;
  transition: all 0.3s ease;
  display: block;
}

/* Modifiers */
.header__hamburger--active .header__hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.header__hamburger--active .header__hamburger-line:nth-child(2) {
  opacity: 0;
}

.header__hamburger--active .header__hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Tablet */
@media (max-width: 992px) {
  .header__container {
    gap: 1rem;
    padding: 0 1.5rem;
  }

  .header__nav {
    gap: 30px;
  }

  .header__search {
    width: 200px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .header__container {
    padding: 0 1rem;
  }

  .header__nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    max-width: 350px;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
    z-index: 999;
    padding: 80px 2rem 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    overflow-y: auto;
  }

  .header__nav--open {
    left: 0;
  }

  .header__nav--open::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .header__nav-link {
    font-size: 18px;
    width: 100%;
    padding: 0.5rem 0;
  }

  .header__actions {
    display: none;
  }

  .header__mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    margin-top: 1rem;
  }

  .header__search--mobile {
    width: 100%;
    padding: 10px 12px;
  }

  .header__search--mobile .header__search-input {
    font-size: 14px;
  }

  .header__search--mobile .header__search-icon {
    font-size: 16px;
  }

  .header__cart--mobile {
    display: inline-block;
    width: fit-content;
  }

  .header__cart--mobile .fa-cart-plus {
    font-size: 24px;
  }

  .header__cart--mobile .header__cart-badge {
    top: -10px;
    right: -10px;
    width: 18px;
    height: 18px;
    font-size: 11px;
  }

  .header__hamburger {
    display: flex;
    z-index: 1001;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .header__container {
    padding: 0 0.75rem;
  }

  .header__logo {
    font-size: 18px;
  }

  .header__nav {
    width: 85%;
    padding: 70px 1.5rem 1.5rem;
  }

  .header__nav-link {
    font-size: 16px;
  }

  .header__search--mobile {
    padding: 8px 12px;
  }

  .header__search--mobile .header__search-input {
    font-size: 13px;
  }

  .header__cart--mobile .fa-cart-plus {
    font-size: 22px;
  }
}
</style>
