import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent {
  relativePath = environment.relativePath
  showTooltip = false;
  notificationCount = 5;
  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }
}
