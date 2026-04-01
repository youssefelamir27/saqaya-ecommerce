<template>
  <div class="header">
    <div class="header-container">
      <!-- Logo -->
      <h6 class="logo">Exclusive</h6>

      <!-- Desktop Navigation -->
      <nav class="nav" :class="{ active: isMenuOpen }">
        <router-link to="/" @click="closeMenu" exact>Home</router-link>
        <router-link to="/contact" @click="closeMenu">Contact</router-link>
        <router-link to="/about" @click="closeMenu">About</router-link>

        <!-- Mobile Search and Cart (visible only on mobile) -->
        <div class="mobile-actions">
          <div class="search-bar-mobile">
            <input type="text" placeholder="What are you looking for?" />
            <i class="fas fa-search"></i>
          </div>
          <div class="cart-icon-mobile">
            <i class="fas fa-cart-plus"></i>
            <span class="cart-badge" v-if="!isErrorPage">2</span>
          </div>
        </div>
      </nav>

      <!-- Desktop Right Side -->
      <div class="desktop-actions">
        <div class="search-bar">
          <input type="text" placeholder="What are you looking for?" />
          <i class="fas fa-search"></i>
        </div>
        <div class="cart-icon">
          <i class="fas fa-cart-plus"></i>
          <span class="cart-badge" v-if="!isErrorPage">2</span>
        </div>
      </div>

      <!-- Hamburger Menu Button (Mobile) -->
      <button
        class="hamburger"
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
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
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  },
};
</script>

<style scoped>
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

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo */
.logo {
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 1px;
  margin: 0;
  flex-shrink: 0;
}

/* Desktop Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
}

.nav a {
  text-decoration: none;
  color: #000000;
  font-size: 15px;
  padding-bottom: 4px;
  position: relative;
}

.nav a::after {
  content: '';
  width: 0;
  height: 2px;
  background-color: #000000;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 1s;
}

.nav a.router-link-active::after {
  width: 100%;
}

/* Desktop Actions */
.desktop-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 6px 12px;
  width: 240px;
}

.search-bar input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #000000;
  width: 100%;
}

.search-bar input::placeholder {
  color: #999999;
}

.search-bar .fa-search {
  color: #000000;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.search-bar .fa-search:hover {
  color: #42b983;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-icon .fa-cart-plus {
  font-size: 20px;
  color: #000000;
  transition: color 0.3s;
}

.cart-icon:hover .fa-cart-plus {
  color: #42b983;
}

.cart-badge {
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

/* Mobile elements - hidden by default */
.mobile-actions {
  display: none;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}

.hamburger span {
  width: 25px;
  height: 2px;
  background-color: #000000;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Tablet Styles */
@media (max-width: 992px) {
  .header-container {
    gap: 1rem;
    padding: 0 1.5rem;
  }

  .nav {
    gap: 30px;
  }

  .search-bar {
    width: 200px;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }

  /* Hide desktop navigation and actions */
  .nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    max-width: 350px;
    height: 100vh;
    background-color: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
    z-index: 999;
    padding: 80px 2rem 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    overflow-y: auto;
  }

  .nav.active {
    left: 0;
  }

  .nav a {
    font-size: 18px;
    width: 100%;
    padding: 0.5rem 0;
  }

  .desktop-actions {
    display: none;
  }

  /* Show mobile actions */
  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    margin-top: 1rem;
  }

  .search-bar-mobile {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 10px 12px;
    gap: 0.5rem;
    width: 100%;
  }

  .search-bar-mobile input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
  }

  .search-bar-mobile input::placeholder {
    color: #999999;
  }

  .search-bar-mobile .fa-search {
    color: #000000;
    font-size: 16px;
    cursor: pointer;
  }

  .cart-icon-mobile {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: fit-content;
  }

  .cart-icon-mobile .fa-cart-plus {
    font-size: 24px;
    color: #000000;
  }

  .cart-icon-mobile .cart-badge {
    top: -10px;
    right: -10px;
    width: 18px;
    height: 18px;
    font-size: 11px;
  }

  /* Show hamburger button */
  .hamburger {
    display: flex;
    z-index: 1001;
  }

  /* Overlay when menu is open */
  .nav.active::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  .header-container {
    padding: 0 0.75rem;
  }

  .logo {
    font-size: 18px;
  }

  .nav {
    width: 85%;
    padding: 70px 1.5rem 1.5rem;
  }

  .nav a {
    font-size: 16px;
  }

  .search-bar-mobile {
    padding: 8px 12px;
  }

  .search-bar-mobile input {
    font-size: 13px;
  }

  .cart-icon-mobile .fa-cart-plus {
    font-size: 22px;
  }
}
</style>
