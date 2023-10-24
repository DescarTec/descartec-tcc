import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/domain/services/account.service';
import { PositionTrackingService } from 'src/app/domain/services/position-tracking.service';
import { RotaService } from 'src/app/domain/services/rota.service';
import { Rota } from 'src/app/models/rota';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  isLogged = false;
  selected?: string = "";
  relativePath = environment.relativePath;
  isColetor = false;
  rotaAtiva: Rota | undefined = undefined;

  
  constructor(
    private accountService: AccountService,
    private rotaService: RotaService,
    private positionTrackingService: PositionTrackingService
  ) {   }

  async ngOnInit() {
    this.accountService.currentUserObservable.subscribe((currentUser) => {
      this.isLogged = currentUser !== null;
      if(this.isLogged){
        this.isColetor = currentUser.discriminator == "ColetorUser";
      }
    });
    const currentURL = window.location.href;
    if(!currentURL.includes("mapa")){
      if(this.isColetor){
        this.rotaAtiva = await this.rotaService.getRotaAtiva();
        if(this.rotaAtiva){
          await this.positionTrackingService.startPositionTracking();
        }
      }
    }
  }

  logout(): void {
    this.accountService.reset();
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
