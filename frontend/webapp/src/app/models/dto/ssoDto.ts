import { User } from "../user";

export class SsoDto {
    access_token: string;
    expiration: string;
    user: User;
    
    constructor(access_token: string, expiration: string, user: User) {
		this.access_token = access_token;
		this.expiration = expiration;
		this.user = user;
	}
}