<script setup lang="ts">
import Modal from "@/components/modal.vue";
import ProfilePic from "@/components/profile-pic.vue";
import ValidatedInput from "../validatedInput.vue";
import StyledButton from "../styled/button.vue";

import swal from "sweetalert2";

const emit = defineEmits(["close"]);

//    ___ ___ ___ _____ _   _ ___ ___
//   | _ \_ _/ __|_   _| | | | _ \ __|
//   |  _/| | (__  | | | |_| |   / _|
//   |_| |___\___| |_|  \___/|_|_\___|
const currentPicture = ref("https://placehold.co/200");
const pictureInput = ref<HTMLInputElement>();
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
const updatePicture = () => {
  pictureInput.value!.click();
};

//    ___  _   ___ _____      _____  ___ ___
//   | _ \/_\ / __/ __\ \    / / _ \| _ \   \
//   |  _/ _ \\__ \__ \\ \/\/ / (_) |   / |) |
//   |_|/_/ \_\___/___/ \_/\_/ \___/|_|_\___/
const currentPassword = ref("");
const showPassReqs = ref(false);
const showPassword = ref(false);
const passwordsMatch = ref(false);
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
  return value == "" || Object.values(passwordState.value).every(Boolean);
};

//    _   _ ___ ___ ___ _  _   _   __  __ ___
//   | | | / __| __| _ \ \| | /_\ |  \/  | __|
//   | |_| \__ \ _||   / .` |/ _ \| |\/| | _|
//    \___/|___/___|_|_\_|\_/_/ \_\_|  |_|___|
const currentUsername = ref("");
const validateUsername = (value: string): boolean => {
  currentUsername.value = value;
  return value == "" || (value.length >= 5 && value.length <= 20);
};
const usernameTaken: Ref<boolean | undefined> = ref(undefined);
usernameTaken.value = undefined;
const verifyUsername = () => {
  //TODO: SERVER: check username existence on server
  usernameTaken.value = true;

  window.setTimeout(() => {
    usernameTaken.value = undefined;
  }, 2000);
};

//    ___ __  __   _   ___ _
//   | __|  \/  | /_\ |_ _| |
//   | _|| |\/| |/ _ \ | || |__
//   |___|_|  |_/_/ \_\___|____|
const currentEmail = ref("");
const validateEmail = (value: string): boolean => {
  currentEmail.value = value;
  return value == "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // pattern: *@*.*
};

const emailToken = ref("");
const saveEmailToken = (value: string): boolean => {
  emailToken.value = value;
  return true;
};

const disableTokenButton = ref(false);
const sendEmail = () => {
  //TODO: SERVER: send email token on the server
  disableTokenButton.value = true;
  window.setTimeout(() => {
    disableTokenButton.value = false;
  }, 10000);
};

//    ___   ___   _____
//   / __| /_\ \ / / __|
//   \__ \/ _ \ V /| _|
//   |___/_/ \_\_/ |___|
const badToast = (text: string) => {
  swal
    .mixin({
      title: text,
      animation: true,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      icon: "error",
    })
    .fire();
};

const disableSaveButton = ref(false);
const enableSaveBtn = () => {
  setTimeout(() => {
    disableSaveButton.value = false;
  }, 5000);
};
const saveChanges = () => {
  disableSaveButton.value = true;

  const name = currentUsername.value;
  const email = currentEmail.value;
  const password = currentPassword.value;
  const token = emailToken.value;
  const pictureFile = pictureInput.value?.files?.[0];

  if (!name && !email && !password && !pictureFile) {
    // All fields empty
    emit("close");
    return;
  }

  if (!validateEmail(email)) {
    badToast("Must enter a valid email address");
    enableSaveBtn();
    return;
  }
  if (!validateUsername(name)) {
    badToast("Must enter a valid username");
    enableSaveBtn();
    return;
  }
  if (!validatePassword(password)) {
    badToast("Password must meet all criteria");
    showPassReqs.value = true;
    setTimeout(() => {
      showPassReqs.value = false;
    }, 1000);
    enableSaveBtn();
    return;
  }

  if (password && !passwordsMatch.value) {
    badToast("Password confirmation does not match");
    enableSaveBtn();
    return;
  }

  if (email && !token) {
    badToast("Must include email token");
    enableSaveBtn();
    return;
  }

  // TODO: vall verifyUsername before sending

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("token", token);

  if (pictureFile) {
    formData.append("picture", pictureFile);
  }

  updateProfileServer(formData);
};

const updateProfileServer = (profileData: FormData) => {
  //TODO: SERVER: Save changes on server
  swal
    .mixin({
      toast: true,
      title: "Changes Saved",
      animation: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: "success",
    })
    .fire();
  emit("close");
};
</script>
<!-- TODO: Reuse this component for account creation -->
<template>
  <Modal showCloseButton @close="emit('close')">
    <input type="file" accept="image/*" class="hidden" @change="uploadHandler" ref="pictureInput" />
    <div class="flex flex-col justify-center relative gap-5">
      <!-- profile pic -->
      <div class="flex gap-5">
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
      <div class="flex gap-5">
        <ValidatedInput
          name="username"
          title="Username"
          tooltipText="Between 5 and 20 characters"
          :validator="validateUsername"
        />

        <StyledButton
          :disable="usernameTaken !== undefined"
          @click="verifyUsername"
          class="w-28"
          :class="
            usernameTaken === undefined
              ? 'bg-blue-600 hover:bg-blue-700'
              : usernameTaken
                ? 'bg-red-600'
                : 'bg-green-600'
          "
        >
          {{ usernameTaken === undefined ? "Check" : usernameTaken ? "Taken" : "Available" }}
        </StyledButton>
      </div>
      <!-- email -->
      <div class="flex gap-5 relative">
        <ValidatedInput name="email" type="email" title="Email" :validator="validateEmail" />
        <div class="flex-1">
          <ValidatedInput
            class="w-2/3"
            name="emailToken"
            title="Email Token"
            :validator="saveEmailToken"
          />
        </div>
        <StyledButton
          class="absolute right-0 top-1 w-14"
          :disable="disableTokenButton"
          @click="sendEmail"
        >
          Send
        </StyledButton>
      </div>
      <!-- password -->
      <div class="flex gap-5">
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
              passwordsMatch = value === currentPassword;
              return passwordsMatch;
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
      <!-- save button -->
      <div class="flex justify-center">
        <StyledButton :disable="disableSaveButton" @click="saveChanges">Save Changes</StyledButton>
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
