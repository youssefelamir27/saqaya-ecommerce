<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <p class="hero-sub">Beauty & Skincare</p>
          <h1>Up to 25%<br />off Voucher</h1>
          <router-link to="/products" class="shop-now-btn">
            Shop Now →
          </router-link>
        </div>
        <div class="hero-image">
          <img
            src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
            alt="Beauty Products"
          />
        </div>
      </div>
      <div class="hero-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </section>

    <!-- Flash Sales -->
    <section class="flash-sales">
      <div class="section-header">
        <div class="title-group">
          <div class="title-badge">
            <span class="badge-bar"></span>
            <span class="badge-text">Today's</span>
          </div>
          <div class="title-row">
            <h2>Flash Sales</h2>
            <div class="arrows">
              <button class="arrow-btn" @click="scrollLeft('flash')">
                <i class="fas fa-arrow-left"></i>
              </button>
              <button class="arrow-btn" @click="scrollRight('flash')">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading">Loading products...</div>

      <div v-else ref="flashSlider" class="products-slider">
        <div
          v-for="product in flashProducts"
          :key="product.id"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <div class="card-image-wrapper">
            <span class="discount-badge">-{{ getDiscount(product) }}%</span>
            <div class="card-actions">
              <button class="action-btn" @click.stop="addToWishlist(product)">
                ♡
              </button>
              <button class="action-btn" @click.stop>👁</button>
            </div>
            <img :src="product.thumbnail" :alt="product.title" />
            <button class="add-to-cart-hover" @click.stop="addToCart(product)">
              Add To Cart
            </button>
          </div>
          <div class="card-info">
            <p class="card-title">{{ product.title }}</p>
            <div class="card-price">
              <span class="price-current"
                >${{ getDiscountedPrice(product) }}</span
              >
              <span class="price-original">${{ product.price }}</span>
            </div>
            <div class="card-rating">
              <span
                v-for="star in 5"
                :key="star"
                :class="['star', { filled: star <= roundedRating(product) }]"
                >★</span
              >
              <span class="rating-num">({{ product.rating }})</span>
            </div>
          </div>
        </div>
      </div>

      <div class="view-all">
        <router-link to="/products" class="view-all-btn"
          >View All Products</router-link
        >
      </div>
    </section>

    <hr class="divider" />

    <!-- Browse By Category -->
    <section class="categories">
      <div class="title-badge">
        <span class="badge-bar"></span>
        <span class="badge-text">Categories</span>
      </div>
      <div class="title-row">
        <h2>Browse By Category</h2>
      </div>

      <div ref="catSlider" class="category-slider">
        <div
          v-for="cat in categories"
          :key="cat.name"
          :class="['category-card', { active: activeCategory === cat.name }]"
          @click="setActiveCategory(cat.name)"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <p>{{ cat.name }}</p>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <!-- Explore Our Products -->
    <section class="explore-products">
      <div class="title-badge">
        <span class="badge-bar"></span>
        <span class="badge-text">Our Products</span>
      </div>
      <div class="title-row">
        <h2>Explore Our Products</h2>
        <div class="arrows">
          <button class="arrow-btn" @click="scrollLeft('explore')">
            <i class="fas fa-arrow-left"></i>
          </button>
          <button class="arrow-btn" @click="scrollRight('explore')">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div ref="exploreSlider" class="products-grid">
        <div
          v-for="product in exploreProducts"
          :key="product.id"
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <div class="card-image-wrapper">
            <span v-if="product.isNew" class="new-badge">NEW</span>
            <span v-else class="discount-badge"
              >-{{ getDiscount(product) }}%</span
            >
            <div class="card-actions">
              <button class="action-btn" @click.stop="addToWishlist(product)">
                ♡
              </button>
              <button class="action-btn" @click.stop>👁</button>
            </div>
            <img :src="product.thumbnail" :alt="product.title" />
            <button class="add-to-cart-hover" @click.stop="addToCart(product)">
              Add To Cart
            </button>
          </div>
          <div class="card-info">
            <p class="card-title">{{ product.title }}</p>
            <div class="card-price">
              <span class="price-current"
                >${{ getDiscountedPrice(product) }}</span
              >
              <span class="price-original">${{ product.price }}</span>
            </div>
            <div class="card-rating">
              <span
                v-for="star in 5"
                :key="star"
                :class="['star', { filled: star <= roundedRating(product) }]"
                >★</span
              >
              <span class="rating-num">({{ product.rating }})</span>
            </div>
          </div>
        </div>
      </div>

      <div class="view-all">
        <router-link to="/products" class="view-all-btn"
          >View All Products</router-link
        >
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="service-item">
        <div class="service-icon">🚚</div>
        <h4>FREE AND FAST DELIVERY</h4>
        <p>Free delivery for all orders over $140</p>
      </div>
      <div class="service-item">
        <div class="service-icon">🎧</div>
        <h4>24/7 CUSTOMER SERVICE</h4>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div class="service-item">
        <div class="service-icon">✅</div>
        <h4>MONEY BACK GUARANTEE</h4>
        <p>We return money within 30 days</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      flashProducts: [],
      exploreProducts: [],
      loading: true,
      activeCategory: 'Beauty',
      categories: [
        { name: 'Beauty', icon: '💄' },
        { name: 'Lipstick', icon: '💋' },
        { name: 'Fragrance', icon: '🌸' },
        { name: 'Perfume', icon: '🫧' },
        { name: 'Skincare', icon: '🧴' },
        { name: 'Tools', icon: '🪞' },
      ],
      cart: localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [],
      quantity: localStorage.getItem('cartquantity')
        ? JSON.parse(localStorage.getItem('cartquantity'))
        : 0,
    };
  },

  async mounted() {
    await this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      try {
        const [beautyRes, fragranceRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/beauty'),
          fetch('https://dummyjson.com/products/category/fragrances'),
        ]);
        const beautyData = await beautyRes.json();
        const fragranceData = await fragranceRes.json();
        const allProducts = [...beautyData.products, ...fragranceData.products];
        this.flashProducts = allProducts.slice(0, 10);
        this.exploreProducts = allProducts.slice(0, 8);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        this.loading = false;
      }
    },

    roundedRating(product) {
      return Math.round(product.rating);
    },

    getDiscount(product) {
      return Math.round(product.discountPercentage);
    },

    getDiscountedPrice(product) {
      return (product.price * (1 - product.discountPercentage / 100)).toFixed(
        2
      );
    },

    setActiveCategory(name) {
      this.activeCategory = name;
    },

    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.quantity++;
      localStorage.setItem('cartquantity', JSON.stringify(this.quantity));
      window.dispatchEvent(new Event('cart-updated'));
      alert(`${product.title} added to cart!`);
    },

    addToWishlist(product) {
      console.log('Wishlist:', product.title);
    },

    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },

    scrollLeft(ref) {
      const el = this.$refs[ref + 'Slider'];
      if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
    },

    scrollRight(ref) {
      const el = this.$refs[ref + 'Slider'];
      if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
    },
  },
};
</script>
