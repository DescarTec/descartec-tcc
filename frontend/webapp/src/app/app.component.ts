import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './domain/services/account.service';
import { AlertService } from './domain/services/alert.service';
import { environment } from 'src/environments/environment';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DescarTec';
  user?: User | null;
  static relativePath = environment.relativePath;

  constructor(private accountService: AccountService) {
      this.accountService.currentUserObservable.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.loadMapsScript();
  }

  loadMapsScript() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    document.head.appendChild(script);
  }
  
  logout() {
      this.accountService.reset();
  }

}
