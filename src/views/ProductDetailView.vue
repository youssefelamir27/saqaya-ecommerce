<template>
  <div class="product-detail">
    <!-- Breadcrumb -->
    <div class="product-detail__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <router-link to="/products">Products</router-link>
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

      <!-- Right: Info -->
      <div class="product-detail__info">
        <h1>{{ selectedProduct.title }}</h1>

        <div class="product-detail__rating-row">
          <span
            v-for="star in 5"
            :key="star"
            :class="[
              'product-detail__star',
              { 'product-detail__star--filled': star <= roundedRating },
            ]"
            >★</span
          >
          <span class="product-detail__rating-count"
            >({{ selectedProduct.rating }} reviews)</span
          >
          <span
            class="product-detail__stock"
            :class="{ 'product-detail__stock--low': isLowStock }"
          >
            {{ selectedProduct.availabilityStatus }}
          </span>
        </div>

        <div class="product-detail__price-row">
          <span class="product-detail__price-current"
            >${{ discountedPrice }}</span
          >
          <span class="product-detail__price-original"
            >${{ selectedProduct.price }}</span
          >
          <span class="product-detail__discount-badge"
            >-{{ roundedDiscount }}%</span
          >
        </div>

        <p class="product-detail__description">
          {{ selectedProduct.description }}
        </p>

        <hr class="product-detail__divider" />

        <div class="product-detail__meta">
          <p><strong>Brand:</strong> {{ selectedProduct.brand }}</p>
          <p><strong>Category:</strong> {{ selectedProduct.category }}</p>
          <p>
            <strong>Shipping:</strong> {{ selectedProduct.shippingInformation }}
          </p>
          <p>
            <strong>Return Policy:</strong> {{ selectedProduct.returnPolicy }}
          </p>
          <p>
            <strong>Warranty:</strong> {{ selectedProduct.warrantyInformation }}
          </p>
        </div>

        <div class="product-detail__quantity-row">
          <button class="product-detail__qty-btn" @click="decreaseQty">
            -
          </button>
          <span class="product-detail__qty">{{ localQuantity }}</span>
          <button class="product-detail__qty-btn" @click="increaseQty">
            +
          </button>
          <button class="product-detail__add-btn" @click="handleAddToCart">
            Add To Cart
          </button>
        </div>
      </div>
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
import { Review, Product } from '@/types/product';
// interface Review {
//   rating: number;
//   comment: string;
//   date: string;
//   reviewerName: string;
// }

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: string[];
//   availabilityStatus: string;
//   shippingInformation: string;
//   returnPolicy: string;
//   warrantyInformation: string;
//   reviews: Review[];
// }

export default Vue.extend({
  name: 'ProductDetailView',

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
    roundedRating(): number {
      return this.selectedProduct ? Math.round(this.selectedProduct.rating) : 0;
    },
    roundedDiscount(): number {
      return this.selectedProduct
        ? Math.round(this.selectedProduct.discountPercentage)
        : 0;
    },
    isLowStock(): boolean {
      return this.selectedProduct ? this.selectedProduct.stock < 10 : false;
    },
    discountedPrice(): string {
      if (!this.selectedProduct) return '0.00';
      return (
        this.selectedProduct.price *
        (1 - this.selectedProduct.discountPercentage / 100)
      ).toFixed(2);
    },
    hasReviews(): boolean {
      return !!(
        this.selectedProduct && this.selectedProduct.reviews.length > 0
      );
    },
  },

  async mounted() {
    const id = Number(this.$route.params.id);
    await this.fetchProductById(id);
    if (this.selectedProduct) {
      this.selectedImage = this.selectedProduct.thumbnail;
    }
  },

  watch: {
    selectedProduct(product: Product | null) {
      if (product && !this.selectedImage) {
        this.selectedImage = product.thumbnail;
      }
    },
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
