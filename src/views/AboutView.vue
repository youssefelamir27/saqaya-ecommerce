<template>
  <div class="about-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="current">About</span>
    </div>

    <!-- Our Story -->
    <section class="story-section">
      <div class="story-text">
        <h1>Our Story</h1>
        <p>
          Launched in 2015, Exclusive is South Asia's premier online shopping
          marketplace with an active presence in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sellers and 300 brands and serves 3 millions customers across
          the region.
        </p>
        <p>
          Exclusive has more than 1 Million products to offer, growing at a very
          fast rate. Exclusive offers a diverse assortment in categories ranging
          from consumer.
        </p>
      </div>
      <div class="story-image">
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"
          alt="Our products"
        />
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        :class="['stat-card', { active: index === activeStatIndex }]"
        @click="activeStatIndex = index"
      >
        <div class="stat-icon-wrapper">
          <span class="stat-icon">{{ stat.icon }}</span>
        </div>
        <h3>{{ stat.value }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section">
      <div class="team-grid">
        <div v-for="member in team" :key="member.name" class="team-card">
          <div class="team-image">
            <img :src="member.image" :alt="member.name" />
          </div>
          <h3>{{ member.name }}</h3>
          <p class="team-role">{{ member.role }}</p>
          <div class="team-social">
            <span class="social-icon"><i class="fab fa-facebook"></i></span>
            <span class="social-icon"><i class="fab fa-instagram"></i></span>
            <span class="social-icon"><i class="fab fa-linkedin"></i></span>
          </div>
        </div>
      </div>
      <div class="team-dots">
        <span
          v-for="n in 5"
          :key="n"
          :class="['dot', { active: n === 3 }]"
        ></span>
      </div>
    </section>

    <!-- Services -->
    <section class="services">
      <div class="service-item">
        <div class="service-icon-wrapper">
          <span>🚚</span>
        </div>
        <h4>FREE AND FAST DELIVERY</h4>
        <p>Free delivery for all orders over $140</p>
      </div>
      <div class="service-item">
        <div class="service-icon-wrapper">
          <span>🎧</span>
        </div>
        <h4>24/7 CUSTOMER SERVICE</h4>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div class="service-item">
        <div class="service-icon-wrapper">
          <span>✅</span>
        </div>
        <h4>MONEY BACK GUARANTEE</h4>
        <p>We return money within 30 days</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',

  data() {
    return {
      activeStatIndex: 1,
      stats: [
        { icon: '🏪', value: '10.5k', label: 'Sellers active our site' },
        { icon: '💰', value: '33k', label: 'Monthly Product Sale' },
        { icon: '🛍️', value: '45.5k', label: 'Customer active in our site' },
        { icon: '💵', value: '25k', label: 'Annual gross sale in our site' },
      ],
      team: [],
    };
  },

  async mounted() {
    await this.fetchTeam();
  },

  methods: {
    async fetchTeam() {
      try {
        const res = await fetch('https://dummyjson.com/users?limit=3');
        const data = await res.json();
        const roles = [
          'Founder & Chairman',
          'Managing Director',
          'Product Designer',
        ];
        this.team = data.users.map((user, i) => ({
          name: `${user.firstName} ${user.lastName}`,
          role: roles[i],
          image: user.image,
        }));
      } catch (err) {
        console.error('Error fetching team:', err);
      }
    },
  },
};
</script>
