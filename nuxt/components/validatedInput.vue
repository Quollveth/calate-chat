<script setup lang="ts">
import Tooltip from "./tooltip.vue";

type inputTypes = "text" | "email" | "password" | "number" | "tel" | "url";

interface Props {
  name: string;
  validator: (arg0: string) => boolean;

  required?: boolean;
  type?: inputTypes;
  title?: string;
  tooltipText?: string;
}

const props = defineProps<Props>();

const valid = ref(true);
const showTooltip = ref(false);

const handleInput = (event: Event) => {
  if (!props.validator) {
    return;
  }
  validate((event.target as HTMLInputElement).value);
};

const validate = (arg0: string) => {
  valid.value = props.validator!(arg0);
};

const emit = defineEmits(["focus", "blur"]);
</script>
<template>
  <div class="relative">
    <input
      :type="type ?? 'text'"
      :class="[title ? 'pt-6 pb-1' : 'py-2', valid ? 'focus:border-blue-500' : 'border-red-300 focus:border-red-500']"
      :name="name"
      :required="required ?? undefined"
      @input="handleInput"
      @focus="
        emit('focus');
        showTooltip = true;
      "
      @blur="
        emit('blur');
        showTooltip = false;
      "
      id="input"
      class="peer w-full border border-gray-300 bg-transparent px-3 text-gray-900 invalid:border-red-500 focus:ring-blue-500 rounded-md outline-none"
    />
    <!-- TODO: find a better way to postition this tooltip, ideally it grows upwards only -->
    <Tooltip v-show="showTooltip" v-if="tooltipText" :text="tooltipText" class="absolute -top-10" />
    <label
      for="input"
      v-if="title"
      class="absolute left-3 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-blue-500"
    >
      {{ title }}
    </label>
  </div>
</template>
