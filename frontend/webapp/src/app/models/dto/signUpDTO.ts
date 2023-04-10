export class SignUpDto {
  username:        string;
  nomeCompleto:    string;
  dataNascimento:  Date;
  email:           string;
  password:        string;
  passwordConfirm: string;
  cpfCnpj:         string;
  phoneNumber:     string;
  cep:             string;
  logradouro:      string;
  complemento:     string;
  bairro:          string;
  localidade:      string;
  uf:              string;
  ibge:            string;
  ddd:             string;


  constructor(
    username: string, 
    nomeCompleto: string, 
    dataNascimento: Date, 
    email: string, 
    password: string, 
    passwordConfirm: string, 
    cpfCnpj: string, 
    phoneNumber: string, 
    cep: string, 
    logradouro: string, 
    complemento: string, 
    bairro: string, 
    localidade: string, 
    uf: string, 
    ibge: string, 
    ddd: string
) {
    this.username = username
    this.nomeCompleto = nomeCompleto
    this.dataNascimento = dataNascimento
    this.email = email
    this.password = password
    this.passwordConfirm = passwordConfirm
    this.cpfCnpj = cpfCnpj
    this.phoneNumber = phoneNumber
    this.cep = cep
    this.logradouro = logradouro
    this.complemento = complemento
    this.bairro = bairro
    this.localidade = localidade
    this.uf = uf
    this.ibge = ibge
    this.ddd = ddd
  }	
}
