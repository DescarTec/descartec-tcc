import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Posicao } from 'src/app/models/posicao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PosicaoRepository {
  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

  async setPosicao(latitude : number, longitude : number): Promise<boolean> {
    return await lastValueFrom(this.httpClient
      .post<boolean>(
        `${this.apiUrl}/api/Posicao/set-posicao`, {latitude : latitude, longitude: longitude}
      ));
  }

  async listarPosicaoColetor(): Promise<Posicao> {
    return await lastValueFrom(this.httpClient
      .get<Posicao>(
        `${this.apiUrl}/api/Posicao/listar-posicoes-coletores`
      ));
  }
}