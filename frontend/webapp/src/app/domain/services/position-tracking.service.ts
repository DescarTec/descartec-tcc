import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { AlertService } from 'src/app/domain/services/alert.service';
import { PosicaoService } from 'src/app/domain/services/posicao.service';

@Injectable({ providedIn: 'root' })
export class PositionTrackingService {
  lat!: number;
  lng!: number;
  options: any;
  
  constructor(private alertService: AlertService, private posicaoService: PosicaoService) {
  }
  
  async startPositionTracking() {
    if (Capacitor.isNativePlatform()) {
      await this.updateCurrentPositionMobile();
    } else {
      await this.updateCurrentPositionDesktop();
    }
  }
  private async updateCurrentPositionMobile() {
    const loc = await Geolocation.getCurrentPosition();
    this.lat = loc.coords.latitude;
    this.lng = loc.coords.longitude;
    setInterval(async () => {
      await this.setPosicao();
    }, 15000);
  }

  private async updateCurrentPositionDesktop() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          setInterval(async () => {
            await this.setPosicao();
          }, 15000);

        },
        error => {
          console.error(error);
          this.alertService.warn("Geolocalização não está habilitada. Habilite a geolocalização para visualizar corretamente esta página.");
        }
      );
    } else {
      console.log(navigator.geolocation);

      // Geolocalização não está habilitada
      this.alertService.warn("Geolocalização não está habilitada. Habilite a geolocalização para visualizar corretamente esta página.");
    }
  }

  private async setPosicao() {
    try{
        await this.posicaoService.setPosicao(this.lat, this.lng);
    } catch (e) {
      console.error(e);
    }
  }
}

