<script setup lang="ts">
import ProfileEditModal from "@/components/single-use/profile-edit.vue";
import ProfilePicture from "@/components/profile-pic.vue";
import StyledInput from "@/components/styled/input.vue";

const ProfileModalVisible = ref(false);

const searchChats = (e: Event) => {
  const searchString = (e.target as HTMLInputElement).value;

  if (searchString == "") {
    return;
  }

  //TODO:SERVER: Search chat list
};
</script>

<template>
  <ProfileEditModal v-if="ProfileModalVisible" @close="ProfileModalVisible = false" />

  <div class="w-1/6 h-full border-r border-gray-300 flex flex-col gap-5 px-2">
    <!-- current user -->
    <div
      class="my-2 flex gap-3 w-full items-center border text-slate-800 border-gray-300 h-fit py-1 px-1 rounded-full"
    >
      <ProfilePicture
        @pictureClicked="ProfileModalVisible = true"
        class="w-20 h-20"
        image="https://placehold.co/20"
        clickable
        rounded
      />
      <div>
        <p class="text-xl my-3">Username</p>
        <p class="text-sm my-3 flex items-center gap-2">
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" class="text-green-600">
            <circle cx="5" cy="5" r="5" fill="currentColor" />
          </svg>
          Online
        </p>
      </div>
    </div>
    <!-- search bar -->
    <div>
      <div class="w-full max-w-sm mx-auto">
        <div class="relative">
          <StyledInput @input="searchChats" type="text" placeholder="Search..." class="pl-10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
