<script setup lang="ts">
import ProfileEdit from "@/components/single-use/profile-edit.vue";

const profileVisible = ref(false);
const toggleProfileVisible = () => {
  profileVisible.value = !profileVisible.value;
};
</script>

<template>
  <button class="border-2 border-black" @click="toggleProfileVisible">
    open profile edit
  </button>

  <ProfileEdit v-if="profileVisible" @close="toggleProfileVisible" />
</template>
