import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Rota } from 'src/app/models/rota';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RotaRepository {
  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

  async iniciarRota(ceps : string[], dataFim : Date): Promise<boolean> {
    console.log({ceps : ceps, dataFim: dataFim})
    return await lastValueFrom(this.httpClient
      .post<boolean>(
        `${this.apiUrl}/api/Rota/iniciar-rota`, {ceps : ceps, dataFim: dataFim}
      ));
  }

  async encerrarRotaAtiva(): Promise<boolean> {
    return await lastValueFrom(this.httpClient
      .post<boolean>(
        `${this.apiUrl}/api/Rota/encerrar-rota-ativa`, null
      ));
  }

  async getRotaAtiva(): Promise<Rota> {
    return await lastValueFrom(this.httpClient
      .get<Rota>(
        `${this.apiUrl}/api/Rota/get-rota-ativa`
      ));
  }
}