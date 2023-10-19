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

export class Coletor {
  coletorName: string;
  dataFim: Date;
  latitude: number;
  longitude: number;
  
  constructor(coletorName: string, dataFim: Date, latitude: number, longitude: number){
    this.coletorName = coletorName;
    this.dataFim = dataFim;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}