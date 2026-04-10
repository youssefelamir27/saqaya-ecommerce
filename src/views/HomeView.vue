<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero__content">
        <div class="hero__text">
          <p class="hero__sub">Beauty & Skincare</p>
          <h1>Up to 25%<br />off Voucher</h1>
          <router-link to="/products" class="hero__shop-btn"
            >Shop Now →</router-link
          >
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

      <div v-if="isLoading" class="loading">Loading products...</div>

      <div v-else ref="flashSlider" class="products-slider">
        <div
          v-for="product in flashSaleProducts"
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
              @click.stop="handleAddToCart(product)"
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
          v-for="cat in browseCategories"
          :key="cat.name"
          :class="[
            'categories__card',
            { 'categories__card--active': activeCategory === cat.name },
          ]"
          @click="handleSetActiveCategory(cat.name)"
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
              @click.stop="handleAddToCart(product)"
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

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Product, Category } from '@/types/product';
export default Vue.extend({
  name: 'HomeView',

  computed: {
    flashSaleProducts(): Product[] {
      return this.$store.getters['products/flashSaleProducts'];
    },
    exploreProducts(): Product[] {
      return this.$store.getters['products/exploreProducts'];
    },
    browseCategories(): Category[] {
      return this.$store.getters['products/browseCategories'];
    },
    activeCategory(): string {
      return this.$store.getters['products/activeCategory'];
    },
    isLoading(): boolean {
      return this.$store.getters['products/isLoading'];
    },
  },

  async mounted() {
    await this.fetchAllProducts();
  },

  methods: {
    ...mapActions('products', ['fetchAllProducts', 'setActiveCategory']),
    ...mapActions('cart', ['addToCart']),

    handleAddToCart(product: Product): void {
      this.addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        quantity: 1,
      });
    },

    handleSetActiveCategory(name: string): void {
      this.setActiveCategory(name);
    },

    addToWishlist(product: Product): void {
      console.log('Wishlist:', product.title);
    },

    goToProduct(id: number): void {
      this.$router.push(`/product/${id}`);
    },

    roundedRating(product: Product): number {
      return Math.round(product.rating);
    },

    getDiscount(product: Product): number {
      return Math.round(product.discountPercentage || 0);
    },

    getDiscountedPrice(product: Product): string {
      return (
        product.price *
        (1 - (product.discountPercentage || 0) / 100)
      ).toFixed(2);
    },

    scrollLeft(ref: string): void {
      const el = this.$refs[ref + 'Slider'] as HTMLElement;
      if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
    },

    scrollRight(ref: string): void {
      const el = this.$refs[ref + 'Slider'] as HTMLElement;
      if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
    },
  },
});
</script>
