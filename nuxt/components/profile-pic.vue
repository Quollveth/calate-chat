<script setup lang="ts">
interface Props {
  rounded?: boolean;
  text?: string;
  image: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="relative">
    <img
      :src="image ? image : 'https://placehold.co/150'"
      :class="rounded ? 'rounded-full' : ''"
      class="absolute top-0 left-0"
    />
    <!-- TODO: position text above the image -->
    <!-- TODO: darken on hover -->
    <div>{{ text }}</div>
  </div>
</template>
