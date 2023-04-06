export class SignUpDto {
    name: string;
    password: string;
    passwordConfirm: string;
    email: string;
    cep: string;

    constructor(name: string, password: string, passwordConfirm: string, email: string, cep: string) {
		this.name = name;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
    this.email = email;
    this.cep = cep;
	}
}