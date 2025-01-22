<script setup lang="ts">
import Modal from "@/components/modal.vue";
import ProfilePic from "@/components/profile-pic.vue";
import ValidatedInput from "../validatedInput.vue";

const emit = defineEmits(["close"]);

const currentPicture = ref("https://placehold.co/200");

const uploadHandler = (event: Event) => {
  const file = (event.target as HTMLInputElement).files![0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader>) => {
    currentPicture.value = e.target!.result as string;
  };
  reader.readAsDataURL(file);
};

const pictureInput = ref<HTMLInputElement>();
const updatePicture = () => {
  pictureInput.value!.click();
};

const currentPassword = ref("");
const showPassReqs = ref(false);
const showPassword = ref(false);
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

const currentUsername = ref("");
const validateUsername = (value: string): boolean => {
  currentUsername.value = value;
  return value.length >= 5 && value.length <= 20;
};

const currentEmail = ref("");
const validateEmail = (value: string): boolean => {
  currentEmail.value = value;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // pattern: *@*.*
};

const token = ref("");
const saveEmailToken = (value: string): boolean => {
  token.value = value;
  return true;
};

/* TODO: Form submission
 * ignore password verify field
 * ensure profile picture isn't too big
 * differentiate creating and updating account
 * all fields are optional when updating, only picture is optional when creating
 */
</script>
<!-- TODO: Reuse this component for account creation -->
<template>
  <Modal showCloseButton @close="emit('close')">
    <input type="file" accept="image/*" class="hidden" @change="uploadHandler" ref="pictureInput" />
    <div class="flex flex-col justify-center relative gap-5">
      <!-- profile pic -->
      <div class="flex gap-5 items-start">
        <ProfilePic
          class="w-32 h-32"
          :image="currentPicture"
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
      </div>
      <!-- username -->
      <div class="flex gap-5 items-start">
        <ValidatedInput
          name="username"
          title="Username"
          tooltipText="Between 5 and 20 characters"
          :validator="validateUsername"
        />
      </div>
      <!-- email -->
      <div class="flex gap-5 items-start">
        <ValidatedInput name="email" type="email" title="Email" :validator="validateEmail" />
        <ValidatedInput name="emailToken" title="Email Token" :validator="saveEmailToken" />
      </div>
      <!-- password -->
      <div class="flex gap-5 items-start">
        <ValidatedInput
          name="password"
          :type="showPassword ? 'text' : 'password'"
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
        />
        <butoon
          v-show="currentPassword != ''"
          class="absolute bottom-6 left-40 cursor-pointer text-gray-600"
          @click="showPassword = !showPassword"
        >
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            v-show="!showPassword"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10a13.358 13.358 0 0 0 3 2.685M21 10a13.358 13.358 0 0 1-3 2.685m-8 1.624L9.5 16.5m.5-2.19a10.59 10.59 0 0 0 4 0m-4 0a11.275 11.275 0 0 1-4-1.625m8 1.624.5 2.191m-.5-2.19a11.275 11.275 0 0 0 4-1.625m0 0 1.5 1.815M6 12.685 4.5 14.5"
            />
          </svg>
          <svg
            width="25px"
            height="25"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            v-show="showPassword"
          >
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12c5.4-8 12.6-8 18 0-5.4 8-12.6 8-18 0z"
            />
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </butoon>
      </div>
    </div>
    <!-- password requirements, absolute positioned -->
    <div
      class="w-60 p-4 absolute bottom-20 ml-2 mb-2 left-0 p-2 border border-gray-300 text-sm bg-stone-50 text-zinc-950 rounded-lg shadow-md"
      :class="currentPassword == '' ? 'bottom-12' : 'bottom-32'"
      v-show="showPassReqs"
    >
      <p class="font-semibold text-gray-700 mb-2">Password must contain:</p>
      <ul class="list-disc list-inside text-start text-gray-600 space-y-1">
        <li :class="!passwordState.minLength ? 'text-red-500' : ''">At least 12 Characters</li>
        <li :class="!passwordState.hasNumbers ? 'text-red-500' : ''">At least one number</li>
        <li :class="!passwordState.hasSpecial ? 'text-red-500' : ''">A special character</li>
        <li :class="!(passwordState.hasUpper && passwordState.hasLower) ? 'text-red-500' : ''">
          Mixed case letters
        </li>
      </ul>
    </div>
  </Modal>
</template>
