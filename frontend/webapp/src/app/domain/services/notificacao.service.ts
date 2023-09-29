import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom, map } from "rxjs";
import { NotificacaoResponse } from "src/app/models/response/notification";
import { NotificacaoRepository } from "../repository/notificacao.repository";

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
  private currentNotificacaoSubject: BehaviorSubject<NotificacaoResponse>;
  public currentNotificacaoObservable: Observable<NotificacaoResponse>;

  constructor(
    private notificacaoRepository: NotificacaoRepository,
  ) {
    this.currentNotificacaoSubject = new BehaviorSubject<NotificacaoResponse>(null!)
    this.currentNotificacaoObservable = this.currentNotificacaoSubject.asObservable();   
  }

  public get currentNotificacao(): NotificacaoResponse {
    return this.currentNotificacaoSubject.value;
  }

  async getNotificacoes(): Promise<NotificacaoResponse> {
    return await this.notificacaoRepository.getNotificacoes();
  }
  
  async lerNotificacoes(): Promise<boolean> {
    return await this.notificacaoRepository.lerNotificacoes();
  }
}
