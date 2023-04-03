export class SignUpDto {
    name: string;
    password: string;
    passwordConfirm: string;
    email: string;

    constructor(name: string, password: string, passwordConfirm: string, email: string) {
		this.name = name;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
        this.email = email
	}
}