<script setup lang="ts">
import type * as types from "@/types/types.ts";

import Sidebar from "@/components/single-use/sidebar.vue";

const placeholderUser: types.UserData = {
	id: 1,
	name: "Quollveth",
	profilePic: "https://placehold.co/150",
};

const selectedChat = ref(-1);
</script>

<template>
	<div class="flex justify-start h-screen">
		<Sidebar
			:user="placeholderUser"
			:selected="selectedChat"
			@chatClicked="
				(c: number) => {
					selectedChat = c;
				}
			"
		/>

		<h2>chat {{ selectedChat }} is loaded</h2>
	</div>
</template>
