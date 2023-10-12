import { EmailValidator } from '@angular/forms';

export class User {
    
  id: string;
  email: EmailValidator;
  nome: string;
  cpfCnpj: string;
  endereco: string;
  cep: number;
  enumUserType?: number;
  emailConfirmed: boolean = false;
  phoneNumber: string;
  discriminator: string;

  token?: string;

  constructor(
    id: string,
    email: EmailValidator,
    nome: string,
    cpfCnpj: string,
    endereco: string,
    cep: number,
    phoneNumber: string,
    discriminator: string
  ) {
    this.id = id;
    this.email = email;
    this.nome = nome;
    this.cpfCnpj = cpfCnpj;
    this.endereco = endereco;
    this.cep = cep;
    this.phoneNumber = phoneNumber;
    this.discriminator = discriminator;
  }
}
