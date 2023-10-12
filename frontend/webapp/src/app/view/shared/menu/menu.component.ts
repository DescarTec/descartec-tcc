import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/domain/services/account.service';
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

  
  constructor(
    private accountService: AccountService
  ) {   }

  ngOnInit(): void {
    this.accountService.currentUserObservable.subscribe((currentUser) => {
      this.isLogged = currentUser !== null;
      this.isColetor = currentUser.discriminator == "ColetorUser";
    });
  }

  logout(): void {
    this.accountService.reset();
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
