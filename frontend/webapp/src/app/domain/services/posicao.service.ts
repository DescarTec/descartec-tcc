import { Injectable } from "@angular/core";
import { PosicaoRepository } from "../repository/posicao.repository";
import { Posicao } from "src/app/models/posicao";

@Injectable({ providedIn: 'root' })
export class PosicaoService {

  constructor(
    private posicaoRepository: PosicaoRepository,
  ) {
  }

  async setPosicao(latitude : number, longitude : number): Promise<boolean> {
    return await this.posicaoRepository.setPosicao(latitude, longitude);
  }
  async listarPosicaoColetor(): Promise<Posicao> {
    return await this.posicaoRepository.listarPosicaoColetor();
  }
}