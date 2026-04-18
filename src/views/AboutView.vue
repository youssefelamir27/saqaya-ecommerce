<template>
  <div class="about">
    <!-- Breadcrumb -->
    <div class="about__breadcrumb">
      <router-link to="/">Home</router-link>
      <span> / </span>
      <span class="about__breadcrumb-current">About</span>
    </div>

    <!-- OurStory — purely presentational, no props needed -->
    <OurStory />

    <!-- StatsBox — receives stats + activeIndex, emits select -->
    <StatsBox
      :stats="stats"
      :active-index="activeStatIndex"
      @select="setActiveStatIndex"
    />

    <!-- Team -->
    <section class="team">
      <div class="team__grid">
        <!-- TeamCard — receives one member per iteration -->
        <TeamCard v-for="member in team" :key="member.name" :member="member" />
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

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { StatItem, TeamMember } from '@/types/product';
import OurStory from '@/components/About/OurStory.vue';
import StatsBox from '@/components/About/StatsBox.vue';
import TeamCard from '@/components/About/TeamCard.vue';

interface Service {
  icon: string;
  title: string;
  description: string;
}

// ref replaces data() for reactive values
const activeStatIndex = ref(1);
const team = ref<TeamMember[]>([]);

// plain consts for static data — no reactivity needed
const stats: StatItem[] = [
  { icon: '🏪', value: '10.5k', label: 'Sellers active our site' },
  { icon: '💰', value: '33k', label: 'Monthly Product Sale' },
  { icon: '🛍️', value: '45.5k', label: 'Customer active in our site' },
  { icon: '💵', value: '25k', label: 'Annual gross sale in our site' },
];

const services: Service[] = [
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
];

function setActiveStatIndex(index: number): void {
  activeStatIndex.value = index;
}

async function fetchTeam(): Promise<void> {
  try {
    const res = await axios.get('https://dummyjson.com/users?limit=3');
    const roles = ['Founder & Chairman', 'Managing Director', 'Product Designer'];
    team.value = res.data.users.map(
      (user: { firstName: string; lastName: string; image: string }, i: number) => ({
        name: `${user.firstName} ${user.lastName}`,
        role: roles[i],
        image: user.image,
      })
    );
  } catch (err) {
    console.error('Error fetching team:', err);
  }
}

// onMounted replaces mounted() lifecycle hook
onMounted(async () => {
  await fetchTeam();
});
</script>
