import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "src/app/domain/services/account.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const accessToken = this.accountService.access_token;
        if (accessToken) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    
}