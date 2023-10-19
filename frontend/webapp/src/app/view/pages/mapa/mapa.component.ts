declare var google: any;

import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/domain/services/alert.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import * as Leaflet from 'leaflet';
import { PosicaoService } from 'src/app/domain/services/posicao.service';
import { Coletor } from 'src/app/models/posicao';
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
  coletores : Coletor[] = [];
  mock: boolean = false;

  iconColetor: Leaflet.Icon = new Leaflet.Icon(
    {
      iconUrl: `${this.relativePath}assets/images/mapa/icon1.png`,
      iconSize: new Leaflet.Point(50, 50),
      iconAnchor: new Leaflet.Point(25, 25),
      bgPos: new Leaflet.Point(0, 0),
    }
  );

  constructor(private alertService: AlertService, private posicaoService: PosicaoService) {

  }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.getCurrentPositionMobile();
    } else {
      this.getCurrentPositionDesktop();
    }
  }

  async getPositionColetor(){
    setInterval(async () => {
      if(this.mock === false){
        let listPosicaoColetor = await this.posicaoService.listarPosicaoColetor();
        if(!listPosicaoColetor.erro){
          this.coletores = listPosicaoColetor.data;
          this.updateMapa(this.coletores);
        }
      }
      else {
        this.mockColetores.forEach(element => {
          element.latitude += (Math.random() - 0.5) / 500;
          element.longitude +=(Math.random() - 0.5) / 500;
        });
        this.updateMapa(this.mockColetores);
      }
    }, 5000)
  }

  updateMapa(coletores: Coletor[]){
    // Limpe todos os marcadores existentes no mapa
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
    coletores.forEach((element, i) => {
      let coletorMarker = {
        position: { lat: element.latitude, lng: element.longitude },
        draggable: false
      }
      
      const marker = this.generateMarker(coletorMarker, i)
      marker.addTo(this.map).bindPopup(`<b>${element.coletorName}</b><br> Até: ${element.dataFim} `);
      marker.setIcon(this.iconColetor);
      this.markers.push(marker)
    });  
  }

  async getCurrentPositionMobile() {
    const loc = await Geolocation.getCurrentPosition();
    this.lat = loc.coords.latitude;
    this.lng = loc.coords.longitude;
    this.initializeMap();
  }

  getCurrentPositionDesktop() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          this.initializeMap();

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

  async onMapReady($event: Leaflet.Map) {
    this.map = $event;
    await this.getPositionColetor();
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
  mockColetores: Coletor[] = [];
  buttonMock(){
    this.mockColetores = [ 
      new Coletor("Mock1", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 200, this.lng+ (Math.random() - 0.5) / 200), 
      new Coletor("Mock2", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 200, this.lng+ (Math.random() - 0.5) / 200), 
      new Coletor("Mock3", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock4", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock5", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock6", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock7", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock8", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock9", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50), 
      new Coletor("Mock10", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 50),
      new Coletor("Mock11", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 25, this.lng+ (Math.random() - 0.5) / 25), 
      new Coletor("Mock12", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 25, this.lng+ (Math.random() - 0.5) / 25), 
      new Coletor("Mock13", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 25, this.lng+ (Math.random() - 0.5) / 25), 
      new Coletor("Mock14", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock15", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock16", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock17", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock18", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock19", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock20", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock21", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock22", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock23", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock24", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock25", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock26", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 2, this.lng+ (Math.random() - 0.5) / 2), 
      new Coletor("Mock27", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 25, this.lng+ (Math.random() - 0.5) / 25), 
      new Coletor("Mock28", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 50, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock29", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock30", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock31", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock32", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock33", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock34", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock35", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock36", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock37", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10), 
      new Coletor("Mock38", new Date(2090, 12, 12), this.lat + (Math.random() - 0.5) / 10, this.lng+ (Math.random() - 0.5) / 10) 
    ];
    this.mock = true;
    this.updateMapa(this.mockColetores);
  }
}
