<template>
  <div class="product-detail">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <router-link to="/products">Products</router-link>
      <span> / </span>
      <span class="current">{{ productTitle }}</span>
    </div>

    <!-- Error -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Product -->
    <div v-else-if="product" class="product-wrapper">
      <!-- Left: Images -->
      <div class="product-images">
        <img :src="selectedImage" :alt="product.title" class="main-image" />
        <div class="thumbnail-row">
          <img
            v-for="(img, index) in product.images"
            :key="index"
            :src="img"
            :alt="product.title"
            :class="['thumb', { active: selectedImage === img }]"
            @click="selectImage(img)"
          />
        </div>
      </div>

      <!-- Right: Info -->
      <div class="product-info">
        <h1>{{ product.title }}</h1>

        <div class="rating-row">
          <span
            v-for="star in 5"
            :key="star"
            :class="['star', { filled: star <= roundedRating }]"
            >★</span
          >
          <span class="rating-count">({{ product.rating }} reviews)</span>
          <span class="stock" :class="{ 'stock--low': isLowStock }">
            {{ product.availabilityStatus }}
          </span>
        </div>

        <div class="price-row">
          <span class="current-price">${{ discountedPrice }}</span>
          <span class="original-price">${{ product.price }}</span>
          <span class="discount-badge">-{{ roundedDiscount }}%</span>
        </div>

        <p class="description">{{ product.description }}</p>

        <hr class="divider" />

        <div class="meta-info">
          <p><strong>Brand:</strong> {{ product.brand }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>SKU:</strong> {{ product.sku }}</p>
          <p><strong>Shipping:</strong> {{ product.shippingInformation }}</p>
          <p><strong>Return Policy:</strong> {{ product.returnPolicy }}</p>
          <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
        </div>

        <div class="quantity-row">
          <button class="qty-btn" @click="decreaseQty">-</button>
          <span class="qty">{{ quantity }}</span>
          <button class="qty-btn" @click="increaseQty">+</button>
          <button class="add-to-cart-btn" @click="addToCart">
            Add To Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <div v-if="product && hasReviews" class="reviews-section">
      <h2>Customer Reviews</h2>
      <div class="reviews-grid">
        <div
          v-for="(review, index) in product.reviews"
          :key="index"
          class="review-card"
        >
          <div class="review-header">
            <strong>{{ review.reviewerName }}</strong>
            <div class="review-stars">
              <span
                v-for="star in 5"
                :key="star"
                :class="['star', { filled: star <= review.rating }]"
                >★</span
              >
            </div>
          </div>
          <p class="review-comment">{{ review.comment }}</p>
          <p class="review-date">{{ formatDate(review.date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailView',

  data() {
    return {
      product: null,
      error: null,
      selectedImage: '',
      quantity: 1,
    };
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
