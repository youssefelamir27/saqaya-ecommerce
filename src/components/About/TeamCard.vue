<template>
  <div class="team__card">
    <div class="team__image">
      <img :src="member.image" :alt="member.name" />
    </div>
    <h3>{{ member.name }}</h3>
    <p class="team__role">{{ member.role }}</p>
    <div class="team__social">
      <!-- v-for replaces 3 repeated icon spans -->
      <span v-for="icon in socialIcons" :key="icon" class="team__social-icon">
        <i :class="`fab ${icon}`"></i>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TeamCard — individual team member card component
 *
 * Displays a team member's photo, name, role, and social media icons.
 * Used in AboutView inside a v-for loop over the team array.
 *
 * Pure presentational component — no emits, no store access.
 * Social icons are static and defined as a plain const (not reactive).
 *
 * @props member - TeamMember object with name, role, and image URL
 */

import type { TeamMember } from '@/types/product';

defineProps<{
  member: TeamMember;
}>();

// static social icons — plain const instead of data() since they never change
const socialIcons = ['fa-facebook', 'fa-instagram', 'fa-linkedin'];
</script>
