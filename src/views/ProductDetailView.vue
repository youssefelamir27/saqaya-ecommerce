<template>
  <div class="product-detail">
    <!-- Breadcrumb uses route query to know where user came from -->
    <div class="product-detail__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <router-link v-if="breadcrumbFrom === 'home'" to="/">Home</router-link>
      <router-link v-else to="/products">Products</router-link>
      <span> / </span>
      <span class="product-detail__breadcrumb-current">{{ productTitle }}</span>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="loading">Loading product...</div>

    <!-- Error -->
    <div v-else-if="hasError" class="product-detail__error">
      {{ errorMessage }}
    </div>

    <!-- Product -->
    <div v-else-if="selectedProduct" class="product-detail__wrapper">
      <!-- Left: Images -->
      <div class="product-detail__images">
        <img
          :src="selectedImage"
          :alt="selectedProduct.title"
          class="product-detail__main-image"
        />
        <div class="product-detail__thumbnails">
          <img
            v-for="(img, index) in selectedProduct.images"
            :key="index"
            :src="img"
            :alt="selectedProduct.title"
            :class="[
              'product-detail__thumb',
              { 'product-detail__thumb--active': selectedImage === img },
            ]"
            @click="selectImage(img)"
          />
        </div>
      </div>

      <!-- ProductInfo component -->
      <product-info
        :product="selectedProduct"
        :quantity="localQuantity"
        @increase="increaseQty"
        @decrease="decreaseQty"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <!-- Reviews -->
    <div v-if="selectedProduct && hasReviews" class="reviews">
      <h2 class="reviews__title">Customer Reviews</h2>
      <div class="reviews__grid">
        <div
          v-for="(review, index) in selectedProduct.reviews"
          :key="index"
          class="reviews__card"
        >
          <div class="reviews__header">
            <strong>{{ review.reviewerName }}</strong>
            <div>
              <span
                v-for="star in 5"
                :key="star"
                :class="[
                  'reviews__star',
                  { 'reviews__star--filled': star <= review.rating },
                ]"
                >★</span
              >
            </div>
          </div>
          <p class="reviews__comment">{{ review.comment }}</p>
          <p class="reviews__date">{{ formatDate(review.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Product } from '@/types/product';
import ProductInfo from '@/components/ProductDetail/ProductInfo.vue';

export default Vue.extend({
  name: 'ProductDetailView',

  components: { ProductInfo },

  data() {
    return {
      selectedImage: '' as string,
      localQuantity: 1 as number,
    };
  },

  computed: {
    selectedProduct(): Product | null {
      return this.$store.getters['products/selectedProduct'];
    },
    isLoading(): boolean {
      return this.$store.getters['products/isLoading'];
    },
    hasError(): boolean {
      return this.$store.getters['products/hasError'];
    },
    errorMessage(): string | null {
      return this.$store.getters['products/errorMessage'];
    },
    productTitle(): string {
      return this.selectedProduct ? this.selectedProduct.title : '...';
    },
    hasReviews(): boolean {
      return !!(
        this.selectedProduct && this.selectedProduct.reviews.length > 0
      );
    },
    // reads route query to determine breadcrumb trail
    breadcrumbFrom(): string {
      return (this.$route.query.from as string) || 'products';
    },
  },

  // Vue Router lifecycle hook — runs before component is created
  // better than mounted() for route-based data fetching
  async beforeRouteEnter(to, from, next) {
    next(async (vm: any) => {
      const id = Number(to.params.id);
      await vm.fetchProductById(id);
      // ✅ handle invalid product ID — redirect to 404
      if (vm.hasError) {
        vm.$router.replace({ name: 'ErrorPage' });
        return;
      }
      if (vm.selectedProduct) {
        vm.selectedImage = vm.selectedProduct.thumbnail;
      }
    });
  },

  // Vue Router lifecycle hook — runs when navigating between products
  // e.g. going from /product/1 to /product/2 without remounting
  async beforeRouteUpdate(to, from, next) {
    const id = Number(to.params.id);
    this.selectedImage = '';
    this.localQuantity = 1;
    await this.fetchProductById(id);
    // ✅ handle invalid product ID on route update too
    if (this.hasError) {
      next({ name: 'ErrorPage' });
      return;
    }
    if (this.selectedProduct) {
      this.selectedImage = this.selectedProduct.thumbnail;
    }
    next();
  },

  methods: {
    ...mapActions('products', ['fetchProductById']),
    ...mapActions('cart', ['addToCart']),

    selectImage(img: string): void {
      this.selectedImage = img;
    },

    formatDate(dateStr: string): string {
      return new Date(dateStr).toLocaleDateString();
    },

    increaseQty(): void {
      if (
        this.selectedProduct &&
        this.localQuantity < this.selectedProduct.stock
      ) {
        this.localQuantity++;
      }
    },

    decreaseQty(): void {
      if (this.localQuantity > 1) this.localQuantity--;
    },

    handleAddToCart(): void {
      if (!this.selectedProduct) return;
      this.addToCart({
        id: this.selectedProduct.id,
        title: this.selectedProduct.title,
        price: this.selectedProduct.price,
        discountPercentage: this.selectedProduct.discountPercentage,
        thumbnail: this.selectedProduct.thumbnail,
        quantity: this.localQuantity,
      });
    },
  },
});
</script>
