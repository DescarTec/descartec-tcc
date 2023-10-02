declare var google: any;

import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/domain/services/alert.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import * as Leaflet from 'leaflet';
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
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options: any;
  html: string = /*html*/`<img src="${this.relativePath}assets/images/mapa/icon1.png" />`  

  iconColetor: Leaflet.Icon = new Leaflet.Icon(
    {
      iconUrl: `${this.relativePath}assets/images/mapa/icon1.png`,
      iconSize: new Leaflet.Point(50, 50),
      iconAnchor: new Leaflet.Point(25, 25),
      bgPos: new Leaflet.Point(0, 0),
    }
  );

  constructor(private alertService: AlertService) {     
  }

  ngOnInit() {
    console.log(Capacitor.isNativePlatform());
    if (Capacitor.isNativePlatform()) {
      this.getCurrentPositionMobile();
    } else {
      this.getCurrentPositionDesktop();
    }
  }

  async getCurrentPositionMobile() {
    const loc = await Geolocation.getCurrentPosition();
    console.log(loc);
    this.lat = loc.coords.latitude;
    this.lng = loc.coords.longitude;
    this.initializeMap();
    setInterval(() => {
      this.updateDriverPosition();
    }, 15000);
  }

  getCurrentPositionDesktop() {
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
  initMarkers() {
    let initialMarkers = [
      {
        position: { lat: this.lat + (Math.random() - 0.5) / 100, lng: this.lng + (Math.random() - 0.5) / 100 },
        draggable: false
      },
      {
        position: { lat: this.lat + (Math.random() - 0.5) / 100, lng: this.lng + (Math.random() - 0.5) / 100 },
        draggable: false,
      },
      {
        position: { lat: this.lat + (Math.random() - 0.5) / 100, lng: this.lng + (Math.random() - 0.5) / 100 },
        draggable: false,

      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      marker.setIcon(this.iconColetor);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  initializeMap() {

    this.options = {
      layers: [
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
      ],
      zoom: 16,
      center: { lat: this.lat, lng: this.lng }
    }
  }

  updateDriverPosition() {
    this.markers.forEach((marker: L.Marker) => {
      // Suponha que newLatLng seja uma instância de L.LatLng com as coordenadas desejadas
      const newLatLng = new Leaflet.LatLng(this.lat, this.lng + (Math.random() - 0.5) / 1000); // Substitua pelas coordenadas desejadas

      // Use setLatLng para atualizar a posição do marcador
      marker.setLatLng(newLatLng);
    });
  }
}
