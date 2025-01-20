<script setup lang="ts">
import Modal from "@/components/modal.vue";
import ProfilePic from "@/components/profile-pic.vue";

const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

const updatePicture = () => {
  console.log("hey");
  //TODO:implement profile pictures
};
</script>

<template>
  <Modal showCloseButton @close="closeModal">
    <div class="w-60 h-60 flex flex-col items-center justify-around">
      <ProfilePic
        class="w-32 h-32"
        image="https://placehold.co/200"
        rounded
        clickable
        @pictureClicked="updatePicture"
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 0L16 3L9 10H6V7L13 0Z" fill="#1e1e1e" />
          <path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill="#1e1e1e" />
        </svg>
      </ProfilePic>
      <p>Edit profile here</p>
    </div>
  </Modal>
</template>
