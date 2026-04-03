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

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  background: #000000;
  border-radius: 8px;
  margin-bottom: 4rem;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 3rem 3rem 1rem;
  gap: 2rem;
}

.hero-text {
  color: #ffffff;
}

.hero-sub {
  font-size: 13px;
  color: #cccccc;
  margin-bottom: 12px;
}

.hero-text h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.shop-now-btn {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 2px;
}

.hero-image img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.hero-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #555555;
  cursor: pointer;
}

.dot.active {
  background: #ffffff;
}

.title-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.badge-bar {
  width: 6px;
  height: 28px;
  background-color: #db4444;
  border-radius: 4px;
  display: inline-block;
}

.badge-text {
  color: #db4444;
  font-size: 14px;
  font-weight: 600;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title-row h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000000;
  margin: 0;
}

.arrows {
  display: flex;
  gap: 8px;
}

.arrow-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f5f5f5;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.arrow-btn:hover {
  background: #db4444;
  color: #ffffff;
}

.products-slider {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 12px;
  scrollbar-width: none;
}

.products-slider::-webkit-scrollbar {
  display: none;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.product-card {
  min-width: 220px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.card-image-wrapper {
  position: relative;
  background: #f5f5f5;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
}

.card-image-wrapper img {
  max-height: 160px;
  max-width: 100%;
  object-fit: contain;
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #db4444;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.new-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #00a651;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.card-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s;
}

.product-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.add-to-cart-hover {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: #000000;
  color: #ffffff;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.product-card:hover .add-to-cart-hover {
  opacity: 1;
}

.card-info {
  padding: 12px 4px;
}

.card-title {
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  margin: 0 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.price-current {
  color: #db4444;
  font-weight: 700;
  font-size: 15px;
}

.price-original {
  color: #999999;
  text-decoration: line-through;
  font-size: 13px;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  color: #cccccc;
  font-size: 13px;
}
.star.filled {
  color: #ffad33;
}
.rating-num {
  font-size: 12px;
  color: #999999;
  margin-left: 4px;
}

.categories {
  margin-bottom: 4rem;
}

.category-slider {
  display: flex;
  justify-content: center;
  gap: 30px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 8px;
}

.category-slider::-webkit-scrollbar {
  display: none;
}

.category-card {
  min-width: 100px;
  height: 100px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.category-card:hover,
.category-card.active {
  background: #db4444;
  border-color: #db4444;
  color: #ffffff;
}

.cat-icon {
  font-size: 28px;
}
.category-card p {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}

.services {
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 60px 0;
  text-align: center;
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #000000;
  color: #ffffff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 8px solid #e5e5e5;
}

.service-item h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
}
.service-item p {
  font-size: 13px;
  color: #777777;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

.view-all-btn {
  display: inline-block;
  padding: 12px 40px;
  background: #db4444;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.view-all-btn:hover {
  background: #c03333;
}

.divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 4rem 0;
}

.flash-sales,
.explore-products,
.categories {
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #999999;
}
</style>
