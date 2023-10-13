export interface Posicao {
  data: Coletor[];
  meta: Meta;
  erro?: any;
}

export interface Meta {
  count: number;
  info: Info;
}

export interface Info {
}

export interface Coletor {
  coletorName: string;
  dataFim: Date;
  latitude: number;
  longitude: number;
}