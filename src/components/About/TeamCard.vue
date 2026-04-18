<template>
  <div class="team__card">
    <div class="team__image">
      <img :src="member.image" :alt="member.name" />
    </div>
    <h3>{{ member.name }}</h3>
    <p class="team__role">{{ member.role }}</p>
    <div class="team__social">
      <!-- v-for for social icons — replaces 3 repeated spans -->
      <span v-for="icon in socialIcons" :key="icon" class="team__social-icon">
        <i :class="`fab ${icon}`"></i>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TeamMember } from '@/types/product';

// receives one team member from AboutView via v-for
defineProps<{
  member: TeamMember;
}>();

// static data moved from data() to a plain const — no reactivity needed
const socialIcons = ['fa-facebook', 'fa-instagram', 'fa-linkedin'];
</script>
