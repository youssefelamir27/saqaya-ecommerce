<template>
  <div class="products-page">
    <div class="products-header">
      <div class="title-badge">
        <span class="badge-bar"></span>
        <span class="badge-text">All Products</span>
      </div>
      <h1>Explore Our Products</h1>
      <p class="subtitle">
        Discover our complete collection of beauty, skincare, and fragrance
        products.
      </p>
    </div>

    <div v-if="loading" class="loading">Loading all products...</div>

    <div v-else class="products-grid">
      <div
        v-for="product in allProducts"
        :key="product.id"
        class="product-card"
        @click="goToProduct(product.id)"
      >
        <div class="card-image-wrapper">
          <span v-if="product.isNew" class="new-badge">NEW</span>
          <span v-else class="discount-badge"
            >-{{ getDiscount(product) }}%</span
          >

          <div class="card-actions">
            <button class="action-btn" @click.stop="addToWishlist(product)">
              ♡
            </button>
            <button class="action-btn" @click.stop>👁</button>
          </div>

          <img :src="product.thumbnail" :alt="product.title" loading="lazy" />

          <button class="add-to-cart-hover" @click.stop="addToCart(product)">
            Add To Cart
          </button>
        </div>

        <div class="card-info">
          <p class="card-title">{{ product.title }}</p>
          <div class="card-price">
            <span class="price-current"
              >${{ getDiscountedPrice(product) }}</span
            >
            <span class="price-original">${{ product.price }}</span>
          </div>
          <div class="card-rating">
            <span
              v-for="star in 5"
              :key="star"
              :class="['star', { filled: star <= roundedRating(product) }]"
              >★</span
            >
            <span class="rating-num">({{ product.rating }})</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && hasNoProducts" class="no-products">
      No products found.
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',

  data() {
    return {
      allProducts: [],
      loading: true,
    };
  },

  computed: {
    hasNoProducts() {
      return this.allProducts.length === 0;
    },
  },

  async mounted() {
    await this.fetchAllProducts();
  },

  methods: {
    async fetchAllProducts() {
      try {
        const [beautyRes, fragranceRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/beauty'),
          fetch('https://dummyjson.com/products/category/fragrances'),
        ]);
        const beautyData = await beautyRes.json();
        const fragranceData = await fragranceRes.json();
        this.allProducts = [...beautyData.products, ...fragranceData.products];
      } catch (error) {
        console.error('Error fetching all products:', error);
      } finally {
        this.loading = false;
      }
    },

    roundedRating(product) {
      return Math.round(product.rating);
    },

    getDiscount(product) {
      return Math.round(product.discountPercentage || 0);
    },

    getDiscountedPrice(product) {
      const discount = product.discountPercentage || 0;
      return (product.price * (1 - discount / 100)).toFixed(2);
    },

    addToCart(product) {
      this.$store.dispatch('addToCart', product);
      alert(`${product.title} added to cart!`);
    },

    addToWishlist(product) {
      console.log('Added to wishlist:', product.title);
    },

    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>
