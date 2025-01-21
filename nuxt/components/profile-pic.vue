<script setup lang="ts">
const emit = defineEmits(["pictureClicked"]);
const clickPic = () => {
  emit("pictureClicked");
};

interface Props {
  rounded?: boolean;
  clickable?: boolean;
  image: string;
}
defineProps<Props>();
</script>

<template>
  <div class="relative group overflow-hidden">
    <img
      :src="image"
      :class="rounded ? 'rounded-full' : ''"
      class="w-full h-auto"
    />
    <div
      v-if="clickable"
      class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00000025] cursor-pointer"
      :class="rounded ? 'rounded-full' : ''"
      @click="clickPic"
    >
      <slot></slot>
    </div>
  </div>
</template>
