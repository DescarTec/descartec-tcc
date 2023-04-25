import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './domain/services/account.service';
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

  constructor(private accountService: AccountService) {
      this.accountService.currentUserObservable.subscribe(x => this.user = x);
  }

  ngOnInit() {
    const apiKey = process.env['GOOGLE_MAPS_API_KEY'];
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    document.head.appendChild(script);
  }
  
  logout() {
      this.accountService.reset();
  }

}
