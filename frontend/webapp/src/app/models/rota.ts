import { User } from "./user";

export interface Rota {
  id: string;
  rotaCeps: RotaCep[];
  dataInicio: string;
  dataFim: string;
  user: User;
}



export interface RotaCep {
  id: string;
  rotaId: string;
  cepId: string;
  cep: Cep;
}

export interface Cep {
  id: string;
  value: string;
}