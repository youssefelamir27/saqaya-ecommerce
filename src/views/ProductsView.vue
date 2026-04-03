<template>
  <div class="products-page">
    <!-- Header -->
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

    <!-- Products Grid -->
    <div v-if="loading" class="loading">Loading all products...</div>

    <div v-else class="products-grid">
      <!-- iterating through all products -->
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
              :class="['star', { filled: star <= Math.round(product.rating) }]"
              >★</span
            >
            <span class="rating-num">({{ product.rating }})</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && allProducts.length === 0" class="no-products">
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

        // Combine both categories
        let products = [...beautyData.products, ...fragranceData.products];

        this.allProducts = products;
      } catch (error) {
        console.error('Error fetching all products:', error);
      } finally {
        this.loading = false;
      }
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
      // TODO: connect to real wishlist store later
    },

    goToProduct(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style scoped>
/* Reuse the exact same styles from your homepage */
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.products-header {
  margin-bottom: 3rem;
}

.title-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.badge-bar {
  width: 6px;
  height: 28px;
  background-color: #db4444;
  border-radius: 4px;
}

.badge-text {
  color: #db4444;
  font-size: 14px;
  font-weight: 600;
}

.products-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.subtitle {
  color: #666;
  font-size: 15px;
  max-width: 600px;
  margin: auto;
}

/* Products Grid - Responsive */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

/* Product Card - Exact same as homepage */
.product-card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  background: #fff;
}

.product-card:hover {
  transform: translateY(-4px);
}

.card-image-wrapper {
  position: relative;
  background: #f5f5f5;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-image-wrapper img {
  max-height: 180px;
  max-width: 100%;
  object-fit: contain;
}

.discount-badge,
.new-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.discount-badge {
  background: #db4444;
}

.new-badge {
  background: #00a651;
}

.card-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.product-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 15px;
}

.add-to-cart-hover {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s;
}

.product-card:hover .add-to-cart-hover {
  opacity: 1;
}

.card-info {
  padding: 14px 8px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.price-current {
  color: #db4444;
  font-weight: 700;
  font-size: 15.5px;
}

.price-original {
  color: #999;
  text-decoration: line-through;
  font-size: 13px;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  color: #ccc;
  font-size: 13.5px;
}

.star.filled {
  color: #ffad33;
}

.rating-num {
  font-size: 12.5px;
  color: #999;
  margin-left: 6px;
}

/* Loading & Empty States */
.loading {
  text-align: center;
  padding: 80px 20px;
  font-size: 16px;
  color: #777;
}

.no-products {
  text-align: center;
  padding: 60px;
  color: #888;
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .products-page {
    padding: 1rem;
  }
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 18px;
  }
}
</style>
