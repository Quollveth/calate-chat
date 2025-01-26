<script setup lang="ts">
interface props {
  disable: boolean;
}
defineProps<props>();
</script>

<template>
  <button
    :disabled="disable"
    :class="disable ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'"
    class="w-1/2 px-1 py-3 text-white rounded-lg shadow-md active:shadow-lg focus:ring-4 focus:ring-blue-300 transition-all"
  >
    <slot></slot>
  </button>
</template>
