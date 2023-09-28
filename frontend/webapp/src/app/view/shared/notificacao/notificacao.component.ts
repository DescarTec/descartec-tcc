import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/domain/services/account.service';
import { NotificacaoService } from 'src/app/domain/services/notificacao.service';
import { NotificacaoResponse } from 'src/app/models/response/notification';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  relativePath = environment.relativePath
  showTooltip = false;
  notificationCount = 0;
  notificacao: NotificacaoResponse | undefined = undefined;
  currentUser: boolean = false;

  constructor(
    private notificacaoService: NotificacaoService,
    private accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.accountService.currentUserObservable.subscribe((currentUser) => {
      console.log("atualizou");
      this.notificacao = undefined;
      this.notificationCount = 0; 
      if(currentUser !== null) {
        this.currentUser = true;
        this.getNotificacao();
      }
    });
    // Inicie o intervalo a cada 2.5 minutos (150000 ms)
    interval(150000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.getNotificacao();
      });    
  }

  ngOnDestroy() {
    // Desinscreva-se do intervalo ao destruir o componente
    this.destroy$.next();
    this.destroy$.complete();
  }

  async toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    if(this.showTooltip){
      await this.lerNotificacao()
    }
  }
  async getNotificacao() {
    try{
      if (this.currentUser){
        this.notificacao = await this.notificacaoService.getNotificacoes();
        if (this.notificacao.meta?.info) {
          this.notificationCount = this.notificacao.meta?.info?.totalNaoLidos!
        } else {
          this.notificationCount = 0;
        }
  
      } else {
        this.notificacao = undefined;
        this.notificationCount = 0;
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  async lerNotificacao() {
    try{
      if (this.currentUser){
        this.notificationCount = 0;
        await this.notificacaoService.lerNotificacoes();
      }
    } catch (e) {
      console.error(e);
    }
  }
}
