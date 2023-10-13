import { Injectable } from "@angular/core";
import { RotaRepository } from "../repository/rota.repository";
import { Rota } from "src/app/models/rota";

@Injectable({ providedIn: 'root' })
export class RotaService {

  constructor(
    private rotaRepository: RotaRepository,
  ) {
  }

  async iniciarRota(ceps : string[], dataFim : Date): Promise<boolean> {
    return await this.rotaRepository.iniciarRota(ceps, dataFim);
  }
  async encerrarRotaAtiva(): Promise<boolean> {
    return await this.rotaRepository.encerrarRotaAtiva();
  }
  async getRotaAtiva(): Promise<Rota> {
    return await this.rotaRepository.getRotaAtiva();
  }
}