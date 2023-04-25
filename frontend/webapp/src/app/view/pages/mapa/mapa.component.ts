declare var google: any;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  lat!: number;
  lng!: number;

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.initializeMap();
      });
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
