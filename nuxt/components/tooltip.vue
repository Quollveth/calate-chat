<script setup lang="ts">
interface Props {
  text: string;
}
defineProps<Props>();
</script>

<template>
  <div
    class="tooltip-content p-2 text-xs bg-stone-50 text-zinc-950 bg-gray-800 rounded-lg shadow-md"
    role="tooltip"
  >
    {{ text }}
  </div>
</template>
