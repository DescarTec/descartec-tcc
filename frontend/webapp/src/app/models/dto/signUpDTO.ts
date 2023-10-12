import { FormGroup } from "@angular/forms";
import { Address } from "src/app/domain/services/address.service";

export class SignUpDto {
  username:        string;
  nomeCompleto:    string;
  dataNascimento:  Date;
  email:           string;
  password:        string;
  passwordConfirm: string;
  phoneNumber:     string;
  cep?:             string;
  logradouro?:      string;
  bairro?:          string;
  localidade?:      string;
  uf?:              string;
  ibge?:            string;
  ddd?:             string;

  constructor(form: FormGroup, address?: Address){
    this.username = form.get('username')!.value;
    this.nomeCompleto = form.get('completeName')!.value;
    this.dataNascimento = new Date();
    this.email = form.get('email')!.value;
    this.password = form.get('password')!.value;
    this.passwordConfirm = form.get('passwordConfirm')!.value;
    this.phoneNumber = form.get('phoneNumber')!.value;
    this.cep = address?.cep;
    this.logradouro = address?.logradouro;
    this.bairro = address?.bairro;
    this.localidade = address?.localidade;
    this.uf = address?.uf;
    this.ibge = address?.ibge;
    this.ddd = address?.ddd;
    this.dataNascimento = new Date();
  };
}
