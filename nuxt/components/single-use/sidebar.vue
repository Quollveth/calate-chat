<script setup lang="ts">
import type * as types from "@/types/types.ts";

import ProfileEditModal from "..//single-use/profile-edit.vue";
import ProfilePicture from "..//profile-pic.vue";
import StyledInput from "..//styled/input.vue";
import StyledButton from "../styled/button.vue";

const ProfileModalVisible = ref(false);

const searchChats = (e: Event) => {
	const searchString = (e.target as HTMLInputElement).value;

	if (searchString == "") {
		return;
	}

	//TODO:SERVER: Search chat list
};

const userChats = ref<types.Chat[]>([]);
const fetchUserChats = async () => {
	//TODO: SERVER: Get user chats

	//PLACEHOLDER
	let chats: types.Chat[] = [];

	for (let i = 0; i < 10; i++) {
		chats.push({
			id: i,
			name: `Placeholder-${i}`,
			creator: 1,
			image: "https://placehold.co/20",
		});
	}

	userChats.value = chats;
};

interface SidebarProps {
	selected: number;
	user: types.UserData; // We do need UserData instead of User since this component creates the profile editor that uses that
}
defineProps<SidebarProps>();

onMounted(() => {
	fetchUserChats();
});

const emit = defineEmits<{
	(event: "chatClicked", id: number): void;
}>();

const loadChat = async (c: number) => {
	emit("chatClicked", c);
};
</script>

<template>
	<ProfileEditModal
		:user="user"
		v-if="ProfileModalVisible"
		@close="ProfileModalVisible = false"
	/>

	<div class="min-w-60 h-full border-r border-gray-300 flex flex-col gap-5 px-2">
		<!-- current user -->
		<div
			class="my-2 flex gap-3 w-full items-center border text-slate-800 border-gray-300 h-fit py-1 px-1 rounded-full"
		>
			<ProfilePicture
				@pictureClicked="ProfileModalVisible = true"
				class="w-20 h-20"
				:image="user?.profilePic ?? 'https://placehold.co/20'"
				clickable
				rounded
			/>
			<div class="flex flex-col justify-between">
				<p class="text-xl">{{ user?.name ?? "Username" }}</p>
				<p class="text-sm flex items-center gap-2">
					{{ userChats.length ?? 0 }} Connections
				</p>
			</div>
		</div>
		<!-- search bar -->
		<div>
			<div class="w-full max-w-sm mx-auto">
				<div class="relative">
					<StyledInput
						@input="searchChats"
						type="text"
						placeholder="Search..."
						class="pl-10"
					/>
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
		<!-- chat list -->
		<div class="h-screen overflow-y-auto">
			<div class="max-w-md rounded-lg">
				<div
					class="border-t border-b border-gray-200 divide-y divide-gray-200 overflow-y-auto"
				>
					<div v-for="chat in userChats">
						<div
							class="flex py-4 px-2 transition duration-150 ease-in-out"
							:class="
								selected == chat.id
									? 'bg-amber-100 hover:bg-amber-200'
									: 'hover:bg-gray-200'
							"
							@click="loadChat(chat.id)"
						>
							<img :src="chat.image" class="rounded-full w-10 h-10 shadow-sm" />
							<p class="ml-3 text-gray-700 font-medium">{{ chat.name }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- new chat -->
		<div class="mb-5">
			<a href="/create">
				<StyledButton class="w-full">New Channel</StyledButton>
			</a>
		</div>
	</div>
</template>
