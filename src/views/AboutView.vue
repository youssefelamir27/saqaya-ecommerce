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

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4rem;
  position: relative;
}

/* Breadcrumb */
.breadcrumb {
  font-size: 13px;
  color: #999999;
  margin-bottom: 60px;
  position: absolute;
  top: 0;
  left: 80;
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
  font-weight: bold;
}

/* Our Story */
.story-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 80px;
}

.story-text h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 24px;
}

.story-text p {
  font-size: 14px;
  color: #444444;
  line-height: 1.8;
  margin-bottom: 16px;
}

.story-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

/* Stats */
.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 80px;
}

.stat-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.stat-card:hover {
  border-color: #db4444;
}

.stat-card.active {
  background: #db4444;
  border-color: #db4444;
  color: #ffffff;
}

.stat-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 22px;
  border: 8px solid #e5e5e5;
}

.stat-card.active .stat-icon-wrapper {
  background: #ffffff;
  border-color: rgba(255, 255, 255, 0.3);
}

.stat-card h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: inherit;
}

.stat-card p {
  font-size: 13px;
  color: inherit;
  opacity: 0.85;
  margin: 0;
}

/* Team */
.team-section {
  margin-bottom: 80px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-bottom: 32px;
}

.team-card {
  text-align: left;
}

.team-image {
  width: 100%;
  height: 320px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.team-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
}

.team-role {
  font-size: 13px;
  color: #666666;
  margin-bottom: 12px;
}

.team-social {
  display: flex;
  gap: 12px;
}

.social-icon {
  font-size: 16px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.social-icon:hover {
  opacity: 1;
}

/* Dots */
.team-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cccccc;
  cursor: pointer;
}

.dot.active {
  background: #db4444;
}

/* Services */
.services {
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 60px 0;
  text-align: center;
}

.service-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #000000;
  color: #ffffff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 8px solid #e5e5e5;
}

.service-item h4 {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.service-item p {
  font-size: 13px;
  color: #777777;
}
@media (max-width: 640px) {
  .story-section {
    grid-template-columns: 1fr;
    gap: 0px;
  }
  .stats-section {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
