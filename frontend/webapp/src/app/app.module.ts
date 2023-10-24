import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MenuComponent } from './view/shared/menu/menu.component';
import { HomeComponent } from './view/pages/home/home.component';
import { FooterComponent } from './view/shared/footer/footer.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/handlers/error.interceptor';
import { AlertComponent } from './view/shared/alert';
import { MapaComponent } from './view/pages/mapa/mapa.component';
import { InformacaoComponent } from './view/pages/informacao/informacao.component';
import { NotificacaoComponent } from './view/shared/notificacao/notificacao.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RotaComponent } from './view/pages/rota/rota.component';
import { SeletorCadastroComponent } from './view/pages/seletor-cadastro/seletor-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    AlertComponent,
    MapaComponent,
    InformacaoComponent,
    NotificacaoComponent,
    RotaComponent,
    SeletorCadastroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbCollapseModule,     
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    LeafletModule
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
