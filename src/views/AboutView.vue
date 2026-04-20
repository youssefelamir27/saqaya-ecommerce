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

    <!-- Team section — TeamCard rendered per member fetched from API -->
    <section class="team">
      <div class="team__grid">
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

    <!-- Services section — v-for replaces 3 repeated service blocks -->
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
/**
 * AboutView — company about page
 *
 * Displays the company story, stats, team members, and service highlights.
 * Team members are fetched via productService — following clean architecture,
 * axios is never imported directly in views.
 *
 * State breakdown:
 *   - activeStatIndex: reactive (ref) — changes when user clicks a stat card
 *   - team: reactive (ref) — populated async from productService on mount
 *   - stats, services: static (plain const) — never change at runtime
 */

import { ref, onMounted } from 'vue';
import * as productService from '@/services/productService';
import type { StatItem, TeamMember } from '@/types/product';
import OurStory from '@/components/About/OurStory.vue';
import StatsBox from '@/components/About/StatsBox.vue';
import TeamCard from '@/components/About/TeamCard.vue';

interface Service {
  icon: string;
  title: string;
  description: string;
}

/** activeStatIndex — index of the highlighted stat card (default: 1 = Monthly Sales) */
const activeStatIndex = ref(1);

/** team — array of team members fetched from productService on mount */
const team = ref<TeamMember[]>([]);

// static data — plain consts instead of ref() since they never change
const stats: StatItem[] = [
  { icon: '🏪', value: '10.5k', label: 'Sellers active our site' },
  { icon: '💰', value: '33k', label: 'Monthly Product Sale' },
  { icon: '🛍️', value: '45.5k', label: 'Customer active in our site' },
  { icon: '💵', value: '25k', label: 'Annual gross sale in our site' },
];

const services: Service[] = [
  { icon: '🚚', title: 'FREE AND FAST DELIVERY', description: 'Free delivery for all orders over $140' },
  { icon: '🎧', title: '24/7 CUSTOMER SERVICE', description: 'Friendly 24/7 customer support' },
  { icon: '✅', title: 'MONEY BACK GUARANTEE', description: 'We return money within 30 days' },
];

/** setActiveStatIndex — updates the highlighted stat card index */
function setActiveStatIndex(index: number): void {
  activeStatIndex.value = index;
}

/**
 * onMounted — fetches team members from productService on page load
 * productService is the only layer that imports axios — views never call axios directly
 */
onMounted(async () => {
  try {
    team.value = await productService.fetchTeamMembers();
  } catch (err) {
    console.error('Error fetching team:', err);
  }
});
</script>
