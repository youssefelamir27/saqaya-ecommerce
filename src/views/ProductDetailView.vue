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

    <!-- Error -->
    <div v-if="error" class="product-detail__error">{{ error }}</div>

    <!-- Product -->
    <div v-else-if="product" class="product-detail__wrapper">
      <!-- Left: Images -->
      <div class="product-detail__images">
        <img
          :src="selectedImage"
          :alt="product.title"
          class="product-detail__main-image"
        />
        <div class="product-detail__thumbnails">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            :alt="product.title"
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
        <h1>{{ product.title }}</h1>

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
            >({{ product.rating }} reviews)</span
          >
          <span
            class="product-detail__stock"
            :class="{ 'product-detail__stock--low': isLowStock }"
          >
            {{ product.availabilityStatus }}
          </span>
        </div>

        <div class="product-detail__price-row">
          <span class="product-detail__price-current"
            >${{ discountedPrice }}</span
          >
          <span class="product-detail__price-original"
            >${{ product.price }}</span
          >
          <span class="product-detail__discount-badge"
            >-{{ roundedDiscount }}%</span
          >
        </div>

        <p class="product-detail__description">{{ product.description }}</p>

        <hr class="product-detail__divider" />

        <div class="product-detail__meta">
          <p><strong>Brand:</strong> {{ product.brand }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>SKU:</strong> {{ product.sku }}</p>
          <p><strong>Shipping:</strong> {{ product.shippingInformation }}</p>
          <p><strong>Return Policy:</strong> {{ product.returnPolicy }}</p>
          <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
        </div>

        <div class="product-detail__quantity-row">
          <button class="product-detail__qty-btn" @click="decreaseQty">
            -
          </button>
          <span class="product-detail__qty">{{ quantity }}</span>
          <button class="product-detail__qty-btn" @click="increaseQty">
            +
          </button>
          <button class="product-detail__add-btn" @click="addToCart">
            Add To Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <div v-if="product && hasReviews" class="reviews">
      <h2 class="reviews__title">Customer Reviews</h2>
      <div class="reviews__grid">
        <div
          v-for="(review, index) in product.reviews"
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

<script>
export default {
  name: 'ProductDetailView',
  data() {
    return { product: null, error: null, selectedImage: '', quantity: 1 };
  },
  computed: {
    productTitle() {
      return this.product ? this.product.title : '...';
    },
    roundedRating() {
      return this.product ? Math.round(this.product.rating) : 0;
    },
    roundedDiscount() {
      return this.product ? Math.round(this.product.discountPercentage) : 0;
    },
    isLowStock() {
      return this.product ? this.product.stock < 10 : false;
    },
    discountedPrice() {
      if (!this.product) return '0.00';
      return (
        this.product.price *
        (1 - this.product.discountPercentage / 100)
      ).toFixed(2);
    },
    hasReviews() {
      return this.product && this.product.reviews.length > 0;
    },
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      this.error = null;
      try {
        const id = this.$route.params.id;
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        this.product = data;
        this.selectedImage = data.thumbnail;
      } catch (err) {
        this.error = 'Failed to load product. Please try again.';
      }
    },
    selectImage(img) {
      this.selectedImage = img;
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
    increaseQty() {
      if (this.quantity < this.product.stock) this.quantity++;
    },
    decreaseQty() {
      if (this.quantity > 1) this.quantity--;
    },
    addToCart() {
      this.$store.dispatch('addToCart', {
        ...this.product,
        quantity: this.quantity,
      });
      alert(`${this.product.title} added to cart!`);
    },
  },
};
</script>
