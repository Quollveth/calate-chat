/* These types are just used by the ui to do the client side rendering
 * All the actual data and relations between these are handled by the server/db
 * So they have only the data the ui actually needs
 * Plus the id so we know what to request from the server
 */

export interface UserData {
	id: number;
	name: string;
	profilePic: string;
}

export interface Chat {
	id: number;
	name: string;
	image: string;
}

export interface Message {
	sender: number;
	timestamp: number;
	body: string;
}
