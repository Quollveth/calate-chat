<script setup lang="ts">
const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};

interface Props {
  showCloseButton?: boolean;
  closeOnDefocus?: boolean;
}
const props = defineProps<Props>();

const outClickHandler = () => {
  if (props.closeOnDefocus) {
    closeModal();
  }
};
</script>

<template>
  <div class="fixed z-50 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          @click="outClickHandler"
          class="absolute inset-0 bg-slate-500 opacity-75"
        ></div>
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-stone-50 rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div
          v-if="showCloseButton"
          class="hidden sm:block absolute top-0 right-0 pt-4 pr-4"
        >
          <button
            type="button"
            data-behavior="cancel"
            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="closeModal"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6 bg-stone-50 text-zinc-950"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <br />
        <slot></slot>
      </div>
    </div>
  </div>
</template>
