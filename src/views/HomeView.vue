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

    <!--Flash Sales — extracted to component -->
    <flash-sale
      :products="flashSaleProducts"
      :is-loading="isLoading"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

    <hr class="divider" />

    <!--Browse By Category — extracted to component -->
    <browse-category
      :categories="browseCategories"
      :active-category="activeCategory"
      @select-category="handleSetActiveCategory"
    />

    <hr class="divider" />

    <!--Explore Our Products — extracted to component -->
    <explore-products
      :products="exploreProducts"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

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
import { Product } from '@/types/product';
import FlashSale from '@/components/Home/FlashSale.vue';
import BrowseCategory from '@/components/Home/BrowseCategory.vue';
import ExploreProducts from '@/components/Home/ExploreProducts.vue';

export default Vue.extend({
  name: 'HomeView',

  components: {
    FlashSale,
    BrowseCategory,
    ExploreProducts,
  },

  computed: {
    flashSaleProducts(): Product[] {
      return this.$store.getters['products/flashSaleProducts'];
    },
    exploreProducts(): Product[] {
      return this.$store.getters['products/exploreProducts'];
    },
    browseCategories(): { name: string; icon: string }[] {
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
      //passes ?from=home so ProductDetailView breadcrumb knows where user came from
      this.$router.push({ path: `/product/${id}`, query: { from: 'home' } });
    },
  },
});
</script>
