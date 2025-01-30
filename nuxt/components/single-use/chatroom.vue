<script setup lang="ts">
import type * as types from "@/types/types.ts";

import StyledInput from "../styled/input.vue";

const messages = ref<types.Message[]>([]);
const fetchMessages = async () => {
	//TODO: SERVER: get more messages

	// PLACEHOLDER
	let mess: types.Message[] = [];

	const past = Date.now() - 1000000;
	for (let i = 0; i < 50; i++) {
		mess.push({
			sender: 1,
			timestamp: String(past + i * 10000),
			body: `Placeholder message delete me later - ${i}`,
		});
	}

	messages.value = mess;
	fetchUsers(mess);
};

const messageIn = ref<HTMLInputElement>();
const sendMessage = async (msg: string) => {
	//TODO:SERVER: send message
};

const usersMap = ref<Map<number, types.UserData>>(new Map());
const fetchUserData = async (id: number): Promise<types.UserData | undefined> => {
	//TODO: SERVER: get user
	return {
		id: 1,
		name: "Placeholder User",
		profilePic: "https://placehold.co/20",
	};
};
const fetchUsers = async (messageList: types.Message[]) => {
	const fallbackUser: types.UserData = {
		id: 0,
		name: "Unknown User",
		profilePic: "https://placehold.co/20",
	};

	for (const msg of messageList) {
		const uid = msg.sender;
		if (!usersMap.value.get(uid)) {
			const fetched = await fetchUserData(uid);
			if (!fetched) {
				fallbackUser.id = uid;
				usersMap.value.set(uid, fallbackUser);
				continue;
			}
			usersMap.value.set(uid, fetched);
		}
	}
};

const timestampFormat = (time: string) => {
	const pastTime = parseInt(time, 10);
	const currentTime = Date.now();

	const difference = currentTime - pastTime;

	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	if (difference < minute) {
		const seconds = Math.floor(difference / second);
		return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
	} else if (difference < hour) {
		const minutes = Math.floor(difference / minute);
		return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
	} else if (difference < day) {
		const hours = Math.floor(difference / hour);
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	} else {
		const days = Math.floor(difference / day);
		return `${days} day${days !== 1 ? "s" : ""} ago`;
	}
};

const loading = ref(true);

/*TODO:
 * Loading screen
 * Scroll to bottom of messages once chat loads
 * Fetch more messages when we reach the oldest
 */
onBeforeMount(() => {
	loading.value = true;
	fetchMessages().then(() => {
		loading.value = false;
	});
});
defineProps<{
	chatData: types.Chat;
}>();
</script>
<template>
	<div v-if="!loading" class="flex w-full flex-col h-screen bg-gray-50">
		<!-- Chatroom Header -->
		<div class="flex items-center p-4 bg-white shadow-sm">
			<img :src="chatData.image" class="w-14 h-14 rounded-full" />
			<h2 class="ml-4 text-2xl font-semibold text-gray-800">{{ chatData.name }}</h2>
		</div>

		<!-- Messages Container -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
			<div
				v-for="msg in messages"
				:key="msg.timestamp"
				class="flex items-start space-x-4 p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
			>
				<img
					:src="usersMap.get(msg.sender)!.profilePic"
					alt="Profile Picture"
					class="w-10 h-10 rounded-full object-cover shadow-sm"
				/>

				<div class="flex-1">
					<!-- Sender Name and Timestamp -->
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-gray-900">
							{{ usersMap.get(msg.sender)!.name }}
						</p>
						<p class="text-xs text-gray-500">{{ timestampFormat(msg.timestamp) }}</p>
					</div>

					<p class="mt-1 text-sm text-gray-700">{{ msg.body }}</p>
				</div>
			</div>
		</div>

		<!-- Input Area -->
		<div class="flex w-full items-center p-4 bg-white border-t border-gray-300">
			<StyledInput
				type="text"
				class="flex-grow"
				ref="messageIn"
				:placeholder="`Message ${chatData.name}`"
				@keydown="
					(e: KeyboardEvent) => {
						if (e.key === 'Enter') {
							sendMessage((e.target as HTMLInputElement).value);
						}
					}
				"
			/>
			<!-- Send Button -->
			<button
				@click="sendMessage(messageIn!.value)"
				class="ml-4 p-1 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<svg
					width="25px"
					height="25px"
					viewBox="0 0 25 22"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="text-white"
				>
					<path
						d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>
