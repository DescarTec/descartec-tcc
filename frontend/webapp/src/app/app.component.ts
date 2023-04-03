import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './domain/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DescarTec';
  user?: User | null;

  constructor(private accountService: AccountService) {
      this.accountService.currentUserObservable.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.reset();
  }

}
