<script setup lang="ts">
import Modal from "@/components/modal.vue";
import ProfilePic from "@/components/profile-pic.vue";

const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};
</script>

<template>
  <Modal showCloseButton @close="closeModal">
    <div class="w-60 h-60 flex flex-col items-center justify-center">
      <ProfilePic
        class="w-32 h-32"
        rounded
        image="https://placehold.co/200"
        text="hello"
      />
      <p>Edit profile here</p>
    </div>
  </Modal>
</template>
