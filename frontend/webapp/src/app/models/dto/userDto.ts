export class UserDto {

	id : string = ""
	userName: string = ""
	Email: string = ""

	constructor(id:string, userName: string, Email: string) {
		this.id = id;
		this['username'] = userName;
		this.Email = Email
	}
	
}