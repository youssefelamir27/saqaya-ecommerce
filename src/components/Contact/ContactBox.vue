<template>
  <div class="contact__card">
    <div class="contact__card-header">
      <div class="contact__card-icon">
        <i :class="`fas ${icon}`" style="color: white"></i>
      </div>
      <h3>{{ title }}</h3>
    </div>

    <!-- ✅ slot allows parent to pass any content inside the box -->
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ContactBox',

  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>
