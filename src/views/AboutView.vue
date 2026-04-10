<template>
  <div class="about">
    <!-- Breadcrumb -->
    <div class="about__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="about__breadcrumb-current">About</span>
    </div>

    <!-- Our Story -->
    <section class="story">
      <div class="story__text">
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
      <div class="story__image">
        <img
          src="https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"
          alt="Our products"
        />
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        :class="[
          'stats__card',
          { 'stats__card--active': index === activeStatIndex },
        ]"
        @click="setActiveStatIndex(index)"
      >
        <div class="stats__icon-wrapper">
          <span>{{ stat.icon }}</span>
        </div>
        <h3>{{ stat.value }}</h3>
        <p>{{ stat.label }}</p>
      </div>
    </section>

    <!-- Team -->
    <section class="team">
      <div class="team__grid">
        <div v-for="member in team" :key="member.name" class="team__card">
          <div class="team__image">
            <img :src="member.image" :alt="member.name" />
          </div>
          <h3>{{ member.name }}</h3>
          <p class="team__role">{{ member.role }}</p>
          <div class="team__social">
            <span class="team__social-icon"
              ><i class="fab fa-facebook"></i
            ></span>
            <span class="team__social-icon"
              ><i class="fab fa-instagram"></i
            ></span>
            <span class="team__social-icon"
              ><i class="fab fa-linkedin"></i
            ></span>
          </div>
        </div>
      </div>
      <div class="team__dots">
        <span
          v-for="n in 5"
          :key="n"
          :class="['team__dot', { 'team__dot--active': n === 3 }]"
        ></span>
      </div>
    </section>

    <!-- Services -->
    <section class="about-services">
      <div class="about-services__item">
        <div class="about-services__icon"><span>🚚</span></div>
        <h4>FREE AND FAST DELIVERY</h4>
        <p>Free delivery for all orders over $140</p>
      </div>
      <div class="about-services__item">
        <div class="about-services__icon"><span>🎧</span></div>
        <h4>24/7 CUSTOMER SERVICE</h4>
        <p>Friendly 24/7 customer support</p>
      </div>
      <div class="about-services__item">
        <div class="about-services__icon"><span>✅</span></div>
        <h4>MONEY BACK GUARANTEE</h4>
        <p>We return money within 30 days</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { StatItem, TeamMember } from '@/types/product';
export default Vue.extend({
  name: 'AboutView',

  data() {
    return {
      activeStatIndex: 1 as number,
      stats: [
        { icon: '🏪', value: '10.5k', label: 'Sellers active our site' },
        { icon: '💰', value: '33k', label: 'Monthly Product Sale' },
        { icon: '🛍️', value: '45.5k', label: 'Customer active in our site' },
        { icon: '💵', value: '25k', label: 'Annual gross sale in our site' },
      ] as StatItem[],
      team: [] as TeamMember[],
    };
  },

  async mounted() {
    await this.fetchTeam();
  },

  methods: {
    setActiveStatIndex(index: number): void {
      this.activeStatIndex = index;
    },

    async fetchTeam(): Promise<void> {
      try {
        const res = await fetch('https://dummyjson.com/users?limit=3');
        const data = await res.json();
        const roles = [
          'Founder & Chairman',
          'Managing Director',
          'Product Designer',
        ];
        this.team = data.users.map((user: any, i: number) => ({
          name: `${user.firstName} ${user.lastName}`,
          role: roles[i],
          image: user.image,
        }));
      } catch (err) {
        console.error('Error fetching team:', err);
      }
    },
  },
});
</script>
