<template>
  <div class="home">
    <!-- Hero Banner — static promotional section -->
    <section class="hero">
      <div class="hero__content">
        <div class="hero__text">
          <p class="hero__sub">Beauty & Skincare</p>
          <h1>Up to 25%<br />off Voucher</h1>
          <router-link to="/products" class="hero__shop-btn">Shop Now →</router-link>
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

    <!--
      FlashSale — receives first 10 products and loading state.
      Emits are handled here to keep child components store-agnostic.
    -->
    <FlashSale
      :products="flashSaleProducts"
      :is-loading="isLoading"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

    <hr class="divider" />

    <!--
      BrowseCategory — receives categories and active slug.
      select-category triggers both setActiveCategory and filterByCategory.
    -->
    <BrowseCategory
      :categories="browseCategories"
      :active-category="activeCategory"
      @select-category="handleSetActiveCategory"
    />

    <hr class="divider" />

    <!--
      ExploreProducts — receives first 8 products filtered by active category.
      Updates when handleSetActiveCategory is called.
    -->
    <ExploreProducts
      :products="exploreProducts"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

    <!-- Services section — v-for replaces 3 repeated service blocks -->
    <section class="services">
      <div v-for="service in services" :key="service.title" class="services__item">
        <div class="services__icon"><span>{{ service.icon }}</span></div>
        <h4>{{ service.title }}</h4>
        <p>{{ service.description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * HomeView — main landing page
 *
 * Orchestrates the home page sections: hero, flash sales, category browser,
 * explore products, and service highlights.
 *
 * Acts as the data coordinator for child components:
 *   - Fetches all products and categories on mount (parallel with Promise.all)
 *   - Passes data down to child components via props
 *   - Handles all emits from child components (cart, navigation, wishlist)
 *   - Child components stay decoupled from the store
 *
 * State is accessed via useProducts() and useCart() composables.
 */

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';
import FlashSale from '@/components/Home/FlashSale.vue';
import BrowseCategory from '@/components/Home/BrowseCategory.vue';
import ExploreProducts from '@/components/Home/ExploreProducts.vue';
import type { Product } from '@/types/product';

const router = useRouter();

// all product and cart state via composables — no direct store access
const {
  flashSaleProducts,
  exploreProducts,
  browseCategories,
  activeCategory,
  isLoading,
  fetchAllProducts,
  fetchCategories,
  setActiveCategory,
  filterByCategory,
} = useProducts();

const { addToCart } = useCart();

interface Service {
  icon: string;
  title: string;
  description: string;
}

// static services data — plain const, no reactivity needed
const services: Service[] = [
  { icon: '🚚', title: 'FREE AND FAST DELIVERY', description: 'Free delivery for all orders over $140' },
  { icon: '🎧', title: '24/7 CUSTOMER SERVICE', description: 'Friendly 24/7 customer support' },
  { icon: '✅', title: 'MONEY BACK GUARANTEE', description: 'We return money within 30 days' },
];

/**
 * handleAddToCart — wraps addToCart with quantity: 1 for home page cards
 * Always adds 1 unit — detail page handles custom quantities
 */
function handleAddToCart(product: Product): void {
  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    quantity: 1,
  });
}

/**
 * handleSetActiveCategory — updates active category and filters product sections
 * Called both setActiveCategory (for highlight) and filterByCategory (for filtering)
 */
function handleSetActiveCategory(slug: string): void {
  setActiveCategory(slug);
  filterByCategory(slug);
}

/** addToWishlist — placeholder for future wishlist feature */
function addToWishlist(product: Product): void {
  console.log('Added to wishlist:', product.title);
}

/** goToProduct — navigates to DetailView with from=home query for breadcrumb */
function goToProduct(id: number): void {
  router.push({ path: `/product/${id}`, query: { from: 'home' } });
}

/**
 * onMounted — fetches products and categories in parallel on initial load
 * Promise.all ensures both requests run concurrently for better performance
 */
onMounted(async () => {
  await Promise.all([fetchAllProducts(), fetchCategories()]);
});
</script>
