import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/pages/home/home.component';
import { AuthGuard } from './core/security/auth.guard';
import { MapaComponent } from './view/pages/mapa/mapa.component';

const accountModule = () => import('./view/pages/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./view/pages/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: MapaComponent },

  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
