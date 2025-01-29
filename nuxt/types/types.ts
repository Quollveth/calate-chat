// Used in UI
export interface User {
	name: string;
	profilePic: string;
}

// Used only when updating user data
export interface UserData extends User {
	id: number;
	email: string;
	password: string | undefined; // string when sending to the server, undefined when fetching from server
}

// Stores data about a specific chat room
export interface Chat {
	id: number;
	name: string;
	creator: number; // id of user that created it
	image: string;
}
