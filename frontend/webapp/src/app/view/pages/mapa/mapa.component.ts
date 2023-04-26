declare var google: any;

import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/domain/services/alert.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  lat!: number;
  lng!: number;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      console.log("if");
      console.log(navigator.geolocation);

      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
    
          this.initializeMap();
        },
        error => {
          console.log("erro");
          console.log(error);
          this.alertService.warn("Geolocalização não está habilitada. Habilite a geolocalização para visualizar esta página.");
        }
      );
    } else {
      console.log("else");
      console.log(navigator.geolocation);

      // Geolocalização não está habilitada
      this.alertService.warn("Geolocalização não está habilitada. Habilite a geolocalização para visualizar esta página.");
    }
  }


  initializeMap() {
    const mapOptions = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 12
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Adicione marcadores aos pontos específicos
    const marker1 = new google.maps.Marker({
      position: { lat: this.lat + 0.01, lng: this.lng + 0.01 },
      map: map,
      title: 'Ponto 1'
    });

    const marker2 = new google.maps.Marker({
      position: { lat: this.lat - 0.01, lng: this.lng - 0.01 },
      map: map,
      title: 'Ponto 2'
    });
  }
}
