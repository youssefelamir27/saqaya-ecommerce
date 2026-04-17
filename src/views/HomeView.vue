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
    <flash-sale
      :products="flashSaleProducts"
      :is-loading="isLoading"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

    <hr class="divider" />

    <!-- Browse By Category -->
    <browse-category
      :categories="browseCategories"
      :active-category="activeCategory"
      @select-category="handleSetActiveCategory"
    />

    <hr class="divider" />

    <!-- Explore Our Products -->
    <explore-products
      :products="exploreProducts"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

    <!-- Services -->
    <section class="services">
      <div
        v-for="service in services"
        :key="service.title"
        class="services__item"
      >
        <div class="services__icon">
          <span>{{ service.icon }}</span>
        </div>
        <h4>{{ service.title }}</h4>
        <p>{{ service.description }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Product, Category } from '@/types/product';
import FlashSale from '@/components/Home/FlashSale.vue';
import BrowseCategory from '@/components/Home/BrowseCategory.vue';
import ExploreProducts from '@/components/Home/ExploreProducts.vue';

interface Service {
  icon: string;
  title: string;
  description: string;
}

export default Vue.extend({
  name: 'HomeView',

  components: {
    FlashSale,
    BrowseCategory,
    ExploreProducts,
  },

  data() {
    return {
      services: [
        {
          icon: '🚚',
          title: 'FREE AND FAST DELIVERY',
          description: 'Free delivery for all orders over $140',
        },
        {
          icon: '🎧',
          title: '24/7 CUSTOMER SERVICE',
          description: 'Friendly 24/7 customer support',
        },
        {
          icon: '✅',
          title: 'MONEY BACK GUARANTEE',
          description: 'We return money within 30 days',
        },
      ] as Service[],
    };
  },

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
    await Promise.all([this.fetchAllProducts(), this.fetchCategories()]);
  },

  methods: {
    ...mapActions('products', [
      'fetchAllProducts',
      'setActiveCategory',
      'fetchCategories',
      'filterByCategory',
    ]),
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

    handleSetActiveCategory(slug: string): void {
      this.setActiveCategory(slug);
      this.filterByCategory(slug);
    },

    addToWishlist(product: Product): void {
      console.log('Added to wishlist:', product.title);
    },

    goToProduct(id: number): void {
      this.$router.push({ path: `/product/${id}`, query: { from: 'home' } });
    },
  },
});
</script>
