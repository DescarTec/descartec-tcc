declare var google: any;

import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/domain/services/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  lat!: number;
  lng!: number;
  driverMarker!: any;
  relativePath = environment.relativePath


  driverIcon = {
    url: `${this.relativePath}assets/images/mapa/icon1.png`, // caminho para o ícone
    scaledSize: new google.maps.Size(50, 50), // tamanho do ícone
    origin: new google.maps.Point(0, 0), // ponto de origem
    anchor: new google.maps.Point(25, 25) // ponto de ancoragem
  };

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);

      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
    
          this.initializeMap();
          setInterval(() => {
            this.updateDriverPosition();
          }, 15000);
          
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

    this.driverMarker = new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      map: map,
      icon: this.driverIcon,
      title: 'Motorista'
    });
  }

  updateDriverPosition() {
    // Simule uma nova posição do motorista
    const newLat = this.lat + (Math.random() - 0.5) / 100;
    const newLng = this.lng + (Math.random() - 0.5) / 100;
  
    // Atualize a posição do marcador do motorista
    this.driverMarker.setPosition({ lat: newLat, lng: newLng });
  }
  
}
