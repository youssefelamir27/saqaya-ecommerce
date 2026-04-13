<template>
  <div class="about">
    <!-- Breadcrumb -->
    <div class="about__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="about__breadcrumb-current">About</span>
    </div>

    <!--OurStory — purely presentational, no props needed -->
    <our-story />

    <!--StatsBox — receives stats + activeIndex, emits select -->
    <stats-box
      :stats="stats"
      :active-index="activeStatIndex"
      @select="setActiveStatIndex"
    />

    <!-- Team -->
    <section class="team">
      <div class="team__grid">
        <!--TeamCard — receives one member per iteration -->
        <team-card v-for="member in team" :key="member.name" :member="member" />
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
      <div
        v-for="service in services"
        :key="service.title"
        class="about-services__item"
      >
        <div class="about-services__icon">
          <span>{{ service.icon }}</span>
        </div>
        <h4>{{ service.title }}</h4>
        <p>{{ service.description }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { StatItem, TeamMember } from '@/types/product';
import OurStory from '@/components/About/OurStory.vue';
import StatsBox from '@/components/About/StatsBox.vue';
import TeamCard from '@/components/About/TeamCard.vue';

interface Service {
  icon: string;
  title: string;
  description: string;
}

export default Vue.extend({
  name: 'AboutView',

  components: {
    OurStory,
    StatsBox,
    TeamCard,
  },

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

      // v-for replaces 3 repeated service blocks
      services: [
        {
          icon: '🚚',
          title: 'FREE AND FAST DELIVERY',
          description: 'Free delivery for all orders over $140',
        },
        {
          icon: '🎧',
          title: '24/7 CUSTOMER SERVICE',
          description: 'Friendly 24/7 customer support',
        },
        {
          icon: '✅',
          title: 'MONEY BACK GUARANTEE',
          description: 'We return money within 30 days',
        },
      ] as Service[],
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
