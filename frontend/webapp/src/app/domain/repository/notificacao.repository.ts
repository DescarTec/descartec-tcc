import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificacaoResponse } from 'src/app/models/response/notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoRepository {
  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) { }

  async getNotificacoes(): Promise<NotificacaoResponse> {
    return await lastValueFrom(this.httpClient
      .get<NotificacaoResponse>(
        `${this.apiUrl}/api/Notificacao/get-notificacoes`
      ));
  }

  async lerNotificacoes(): Promise<boolean> {
    return await lastValueFrom(this.httpClient
      .post<boolean>(
        `${this.apiUrl}/api/Notificacao/ler-notificacoes`, null
      ));
  }
}