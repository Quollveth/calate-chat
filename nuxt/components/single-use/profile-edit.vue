<script setup lang="ts">
import Modal from "@/components/modal.vue";
import ProfilePic from "@/components/profile-pic.vue";
import ValidatedInput from "../validatedInput.vue";

const emit = defineEmits(["close"]);
const updatePicture = () => {
  console.log("hey");
  //TODO:implement profile pictures
};

const currentPassword = ref("");
const showPassReqs = ref(false);

const passwordState = computed(() => {
  return {
    minLength: 12 <= currentPassword.value.length,
    hasNumbers: /[0-9]/.test(currentPassword.value),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(currentPassword.value),
    hasUpper: /[A-Z]/.test(currentPassword.value),
    hasLower: /[a-z]/.test(currentPassword.value),
  };
});

const validatePassword = (value: string): boolean => {
  currentPassword.value = value;
  return Object.values(passwordState.value).every(Boolean);
};
</script>

<template>
  <Modal showCloseButton @close="emit('close')">
    <input type="file" accept="image/*" class="hidden" />
    <div class="flex justify-center relative">
      <div class="w-60 flex flex-col gap-5 items-center justify-around">
        <ProfilePic
          class="w-32 h-32"
          image="https://placehold.co/200"
          rounded
          clickable
          @pictureClicked="updatePicture"
        >
          <svg width="30px" height="30px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 0L16 3L9 10H6V7L13 0Z" fill="#1e1e1e" />
            <path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill="#1e1e1e" />
          </svg>
        </ProfilePic>
        <ValidatedInput
          name="username"
          title="Username"
          tooltipText="Must be at least 5 characters"
          :validator="
            (value: string) => {
              return value.length >= 5;
            }
          "
        />
        <ValidatedInput
          name="email"
          type="email"
          title="Email"
          :validator="
            (value: string) => {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // pattern: *@*.*
            }
          "
        />
        <ValidatedInput
          name="password"
          type="password"
          title="Password"
          :validator="validatePassword"
          @focus="showPassReqs = true"
          @blur="showPassReqs = false"
        />
        <ValidatedInput
          name="passConfirm"
          type="password"
          title="Confirm Password"
          :validator="
            (value: string) => {
              return value === currentPassword;
            }
          "
          v-show="currentPassword !== ''"
        />
      </div>
      <div
        v-show="showPassReqs"
        class="w-60 p-4 absolute right-0 p-2 text-sm bg-stone-50 text-zinc-950 rounded-lg shadow-md"
        :class="currentPassword == '' ? 'bottom-12' : 'bottom-32'"
      >
        <p class="font-semibold text-gray-700 mb-2">Password must contain:</p>
        <ul class="list-disc list-inside text-start text-gray-600 space-y-1">
          <li :class="!passwordState.minLength ? 'text-red-500' : ''">At least 12 Characters</li>
          <li :class="!passwordState.hasNumbers ? 'text-red-500' : ''">At least one number</li>
          <li :class="!passwordState.hasSpecial ? 'text-red-500' : ''">A special character</li>
          <li :class="!(passwordState.hasUpper && passwordState.hasLower) ? 'text-red-500' : ''">Mixed case letters</li>
        </ul>
      </div>
    </div>
  </Modal>
</template>
