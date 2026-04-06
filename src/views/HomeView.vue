<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero__content">
        <div class="hero__text">
          <p class="hero__sub">Beauty & Skincare</p>
          <h1>Up to 25%<br />off Voucher</h1>
          <router-link to="/products" class="hero__shop-btn">
            Shop Now →
          </router-link>
        </div>
        <div class="hero__image">
          <img
            src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
            alt="Beauty Products"
          />
        </div>
      </div>
      <div class="hero__dots">
        <span class="hero__dot hero__dot--active"></span>
        <span class="hero__dot"></span>
        <span class="hero__dot"></span>
        <span class="hero__dot"></span>
      </div>
    </section>

    <!-- Flash Sales -->
    <section class="flash-sales">
      <div class="section-header">
        <div class="section-header__badge">
          <span class="section-header__bar"></span>
          <span class="section-header__label">Today's</span>
        </div>
        <div class="section-header__title-row">
          <h2>Flash Sales</h2>
          <div class="section-header__arrows">
            <button
              class="section-header__arrow-btn"
              @click="scrollLeft('flash')"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <button
              class="section-header__arrow-btn"
              @click="scrollRight('flash')"
            >
              <i class="fas fa-arrow-right"></i>
            </button>
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
          <div class="product-card__image-wrapper">
            <span class="product-card__badge product-card__badge--discount">
              -{{ getDiscount(product) }}%
            </span>
            <div class="product-card__actions">
              <button
                class="product-card__action-btn"
                @click.stop="addToWishlist(product)"
              >
                ♡
              </button>
              <button class="product-card__action-btn" @click.stop>👁</button>
            </div>
            <img :src="product.thumbnail" :alt="product.title" />
            <button
              class="product-card__cart-btn"
              @click.stop="addToCart(product)"
            >
              Add To Cart
            </button>
          </div>
          <div class="product-card__info">
            <p class="product-card__title">{{ product.title }}</p>
            <div class="product-card__price">
              <span class="product-card__price--current"
                >${{ getDiscountedPrice(product) }}</span
              >
              <span class="product-card__price--original"
                >${{ product.price }}</span
              >
            </div>
            <div class="product-card__rating">
              <span
                v-for="star in 5"
                :key="star"
                :class="[
                  'product-card__star',
                  {
                    'product-card__star--filled':
                      star <= roundedRating(product),
                  },
                ]"
                >★</span
              >
              <span class="product-card__rating-num"
                >({{ product.rating }})</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="view-all">
        <router-link to="/products" class="view-all__btn"
          >View All Products</router-link
        >
      </div>
    </section>

    <hr class="divider" />

    <!-- Browse By Category -->
    <section class="categories">
      <div class="section-header__badge">
        <span class="section-header__bar"></span>
        <span class="section-header__label">Categories</span>
      </div>
      <div class="section-header__title-row">
        <h2>Browse By Category</h2>
      </div>

      <div ref="catSlider" class="categories__slider">
        <div
          v-for="cat in categories"
          :key="cat.name"
          :class="[
            'categories__card',
            { 'categories__card--active': activeCategory === cat.name },
          ]"
          @click="setActiveCategory(cat.name)"
        >
          <span class="categories__icon">{{ cat.icon }}</span>
          <p>{{ cat.name }}</p>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <!-- Explore Our Products -->
    <section class="explore-products">
      <div class="section-header__badge">
        <span class="section-header__bar"></span>
        <span class="section-header__label">Our Products</span>
      </div>
      <div class="section-header__title-row">
        <h2>Explore Our Products</h2>
        <div class="section-header__arrows">
          <button
            class="section-header__arrow-btn"
            @click="scrollLeft('explore')"
          >
            <i class="fas fa-arrow-left"></i>
          </button>
          <button
            class="section-header__arrow-btn"
            @click="scrollRight('explore')"
          >
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
          <div class="product-card__image-wrapper">
            <span
              v-if="product.isNew"
              class="product-card__badge product-card__badge--new"
              >NEW</span
            >
            <span
              v-else
              class="product-card__badge product-card__badge--discount"
            >
              -{{ getDiscount(product) }}%
            </span>
            <div class="product-card__actions">
              <button
                class="product-card__action-btn"
                @click.stop="addToWishlist(product)"
              >
                ♡
              </button>
              <button class="product-card__action-btn" @click.stop>👁</button>
            </div>
            <img :src="product.thumbnail" :alt="product.title" />
            <button
              class="product-card__cart-btn"
              @click.stop="addToCart(product)"
            >
              Add To Cart
            </button>
          </div>
          <div class="product-card__info">
            <p class="product-card__title">{{ product.title }}</p>
            <div class="product-card__price">
              <span class="product-card__price--current"
                >${{ getDiscountedPrice(product) }}</span
              >
              <span class="product-card__price--original"
                >${{ product.price }}</span
              >
            </div>
            <div class="product-card__rating">
              <span
                v-for="star in 5"
                :key="star"
                :class="[
                  'product-card__star',
                  {
                    'product-card__star--filled':
                      star <= roundedRating(product),
                  },
                ]"
                >★</span
              >
              <span class="product-card__rating-num"
                >({{ product.rating }})</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="view-all">
        <router-link to="/products" class="view-all__btn"
          >View All Products</router-link
        >
      </div>
    </section>

    <!-- Services -->
    <section class="services">
      <div class="services__item">
        <div class="services__icon">🚚</div>
        <h4>FREE AND FAST DELIVERY</h4>
        <p>Free delivery for all orders over $140</p>
      </div>
      <div class="services__item">
        <div class="services__icon">🎧</div>
        <h4>24/7 CUSTOMER SERVICE</h4>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div class="services__item">
        <div class="services__icon">✅</div>
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
