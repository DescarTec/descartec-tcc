import { Injectable } from "@angular/core";
import { PosicaoRepository } from "../repository/posicao.repository";

@Injectable({ providedIn: 'root' })
export class PosicaoService {

  constructor(
    private posicaoRepository: PosicaoRepository,
  ) {
  }

  async setPosicao(latitude : number, longitude : number): Promise<boolean> {
    return await this.posicaoRepository.setPosicao(latitude, longitude);
  }
}