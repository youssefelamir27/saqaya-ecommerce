<template>
  <div class="home">
    <h1 class="title">Our Products</h1>

    <!-- Loading -->
    <p v-if="loading">Loading products...</p>

    <!-- Error -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Products -->
    <div v-if="!loading && !error" class="products">
      <div class="card" v-for="product in products" :key="product.id">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="product-img"
        />

        <h3>{{ product.title }}</h3>

        <p class="desc">{{ product.description.slice(0, 60) }}...</p>

        <p class="price">${{ product.price }}</p>

        <p class="rating">⭐ {{ product.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },

  async mounted() {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();

      this.products = data.products; // IMPORTANT
    } catch (err) {
      this.error = 'Failed to load products';
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

/* Grid */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Card */
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  transition: 0.3s;
  background: #fff;
}

.card:hover {
  transform: translateY(-5px);
}

/* Image */
.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Text */
.desc {
  font-size: 14px;
  color: #555;
}

.price {
  font-weight: bold;
  margin-top: 10px;
}

.rating {
  color: #f39c12;
}

/* Error */
.error {
  color: red;
  text-align: center;
}
</style>
