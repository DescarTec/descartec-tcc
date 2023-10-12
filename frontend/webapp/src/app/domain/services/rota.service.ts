import { Injectable } from "@angular/core";
import { RotaRepository } from "../repository/rota.repository";

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
}