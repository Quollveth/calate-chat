<script setup lang="ts">
import type * as types from "@/types/types.ts";

import Sidebar from "@/components/single-use/sidebar.vue";
import Chatroom from "@/components/single-use/chatroom.vue";

const placeholderUser: types.UserData = {
	id: 1,
	name: "Quollveth",
	profilePic: "https://placehold.co/150",
};

const selectedChat = ref(-1);
const currentChat = ref<types.Chat>({
	id: -1,
	name: "Amazing Chat",
	image: "https://placehold.co/20",
});

const loadChatroom = async (id: number) => {
	selectedChat.value = id;

	//TODO: SERVER: load chatroom
};
</script>

<template>
	<div class="flex justify-start h-screen">
		<Sidebar :user="placeholderUser" :selected="selectedChat" @chatClicked="loadChatroom" />
		<Chatroom :chatData="currentChat" />
	</div>
</template>
