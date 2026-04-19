<template>
  <div class="home">
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

    <FlashSale
      :products="flashSaleProducts"
      :is-loading="isLoading"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

    <hr class="divider" />

    <BrowseCategory
      :categories="browseCategories"
      :active-category="activeCategory"
      @select-category="handleSetActiveCategory"
    />

    <hr class="divider" />

    <ExploreProducts
      :products="exploreProducts"
      @go-to-product="goToProduct"
      @add-to-cart="handleAddToCart"
      @add-to-wishlist="addToWishlist"
    />

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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import { useCart } from '@/composables/useCart';
import FlashSale from '@/components/Home/FlashSale.vue';
import BrowseCategory from '@/components/Home/BrowseCategory.vue';
import ExploreProducts from '@/components/Home/ExploreProducts.vue';
import type { Product } from '@/types/product';

const router = useRouter();

// use composables instead of stores directly
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

const services: Service[] = [
  { icon: '🚚', title: 'FREE AND FAST DELIVERY', description: 'Free delivery for all orders over $140' },
  { icon: '🎧', title: '24/7 CUSTOMER SERVICE', description: 'Friendly 24/7 customer support' },
  { icon: '✅', title: 'MONEY BACK GUARANTEE', description: 'We return money within 30 days' },
];

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

function handleSetActiveCategory(slug: string): void {
  setActiveCategory(slug);
  filterByCategory(slug);
}

function addToWishlist(product: Product): void {
  console.log('Added to wishlist:', product.title);
}

function goToProduct(id: number): void {
  router.push({ path: `/product/${id}`, query: { from: 'home' } });
}

onMounted(async () => {
  await Promise.all([fetchAllProducts(), fetchCategories()]);
});
</script>
