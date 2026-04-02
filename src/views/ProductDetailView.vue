<template>
  <div class="product-detail">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <router-link to="/products">Products</router-link>
      <span> / </span>
      <span class="current">{{ product ? product.title : '...' }}</span>
    </div>

    <!-- Error -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Product -->
    <div v-else class="product-wrapper">
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
            @click="selectedImage = img"
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
            :class="['star', { filled: star <= Math.round(product.rating) }]"
            >★</span
          >
          <span class="rating-count">({{ product.rating }} reviews)</span>
          <span class="stock" :class="{ 'low-stock': product.stock < 10 }">
            {{ product.availabilityStatus }}
          </span>
        </div>

        <div class="price-row">
          <span class="current-price">${{ getDiscountedPrice() }}</span>
          <span class="original-price">${{ product.price }}</span>
          <span class="discount-badge"
            >-{{ Math.round(product.discountPercentage) }}%</span
          >
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
    <div v-if="product && product.reviews.length" class="reviews-section">
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
          <p class="review-date">
            {{ new Date(review.date).toLocaleDateString() }}
          </p>
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

  mounted() {
    this.fetchProduct();
  },

  methods: {
    async fetchProduct() {
      this.loading = true;
      this.error = null;
      try {
        const id = this.$route.params.id;
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        console.log('Fetched product:', data);
        this.product = data;
        this.selectedImage = data.thumbnail;
      } catch (err) {
        this.error = 'Failed to load product. Please try again.';
      }
    },

    getDiscountedPrice() {
      return (
        this.product.price *
        (1 - this.product.discountPercentage / 100)
      ).toFixed(2);
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

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4rem;
}

.breadcrumb {
  font-size: 13px;
  color: #999999;
  margin-bottom: 40px;
}

.breadcrumb a {
  text-decoration: none;
  color: #999999;
}

.breadcrumb a:hover {
  color: #000000;
}
.current {
  color: #000000;
  font-weight: 500;
}

.loading,
.error {
  text-align: center;
  padding: 80px;
  font-size: 16px;
  color: #999999;
}

.error {
  color: #db4444;
}

/* Product wrapper */
.product-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

/* Images */
.main-image {
  width: 100%;
  height: 400px;
  object-fit: contain;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

.thumbnail-row {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.thumb {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  background: #f5f5f5;
  padding: 4px;
  transition: border-color 0.2s;
}

.thumb.active,
.thumb:hover {
  border-color: #db4444;
}

/* Info */
.product-info h1 {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 16px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.star {
  color: #cccccc;
  font-size: 16px;
}
.star.filled {
  color: #ffad33;
}
.rating-count {
  font-size: 13px;
  color: #999999;
}

.stock {
  font-size: 12px;
  color: #00a651;
  font-weight: 500;
  padding: 2px 8px;
  background: #e8f8ee;
  border-radius: 4px;
}

.stock.low-stock {
  color: #db4444;
  background: #fef0f0;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.current-price {
  font-size: 26px;
  font-weight: 700;
  color: #db4444;
}

.original-price {
  font-size: 16px;
  color: #999999;
  text-decoration: line-through;
}

.discount-badge {
  background: #db4444;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.description {
  font-size: 14px;
  color: #555555;
  line-height: 1.8;
  margin-bottom: 20px;
}

.divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 20px 0;
}

.meta-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.meta-info p {
  font-size: 13px;
  color: #555555;
  margin: 0;
}

.quantity-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e5e5e5;
  background: #ffffff;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: #db4444;
  color: #ffffff;
  border-color: #db4444;
}

.qty {
  font-size: 16px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.add-to-cart-btn {
  padding: 10px 32px;
  background: #db4444;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
  background: #c03333;
}

/* Reviews */
.reviews-section {
  margin-top: 40px;
}

.reviews-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000000;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.review-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-comment {
  font-size: 13px;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 8px;
}

.review-date {
  font-size: 11px;
  color: #999999;
}

@media (max-width: 768px) {
  .product-detail {
    padding: 2rem 1rem;
  }
  .product-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
</style>
