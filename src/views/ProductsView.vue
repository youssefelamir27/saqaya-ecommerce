<template>
  <div class="products-page">
    <div class="products-header">
      <div class="products-header__badge">
        <span class="products-header__bar"></span>
        <span class="products-header__label">All Products</span>
      </div>
      <h1>Explore Our Products</h1>
      <p class="products-header__subtitle">
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
        <div class="product-card__image-wrapper">
          <span
            v-if="product.isNew"
            class="product-card__badge product-card__badge--new"
            >NEW</span
          >
          <span
            v-else
            class="product-card__badge product-card__badge--discount"
          >
            -{{ getDiscount(product) }}%
          </span>

          <div class="product-card__actions">
            <button
              class="product-card__action-btn"
              @click.stop="addToWishlist(product)"
            >
              ♡
            </button>
            <button class="product-card__action-btn" @click.stop>👁</button>
          </div>

          <img :src="product.thumbnail" :alt="product.title" loading="lazy" />

          <button
            class="product-card__cart-btn"
            @click.stop="addToCart(product)"
          >
            Add To Cart
          </button>
        </div>

        <div class="product-card__info">
          <p class="product-card__title">{{ product.title }}</p>
          <div class="product-card__price">
            <span class="product-card__price--current"
              >${{ getDiscountedPrice(product) }}</span
            >
            <span class="product-card__price--original"
              >${{ product.price }}</span
            >
          </div>
          <div class="product-card__rating">
            <span
              v-for="star in 5"
              :key="star"
              :class="[
                'product-card__star',
                {
                  'product-card__star--filled': star <= roundedRating(product),
                },
              ]"
              >★</span
            >
            <span class="product-card__rating-num">({{ product.rating }})</span>
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
