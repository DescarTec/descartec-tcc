import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
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
    return await lastValueFrom(this.httpClient
      .post<boolean>(
        `${this.apiUrl}/api/Rota/iniciar-rota`, {ceps : ceps, dataFim: dataFim}
      ));
  }

  async encerrarRotaAtiva(): Promise<boolean> {
    return await lastValueFrom(this.httpClient
      .post<boolean>(
        `${this.apiUrl}/api/Rota//api/Rota/encerrar-rota-ativa`, null
      ));
  }
}