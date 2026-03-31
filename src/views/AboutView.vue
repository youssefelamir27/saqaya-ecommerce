<template>
  <div class="about-page">
    <div class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span style="font-weight: bold; opacity: 1; color: black">Contact</span>
    </div>

    <div class="about-content">
      <img v-if="imageUrl" :src="imageUrl" alt="Fetched Image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      imageUrl: null,
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        'https://dummyjson.com/image/400x200/008080/ffffff?text=Hello+Peter'
      );
      const blob = await response.blob();

      // Convert blob to URL
      this.imageUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  },
};
</script>
