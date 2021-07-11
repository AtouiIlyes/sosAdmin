import { AfterViewInit, Inject, OnDestroy } from '@angular/core';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Subscription } from 'rxjs';
import { ZoneService } from 'src/app/services/data/zone.service';
import { UtilsService } from 'src/app/services/data/utils.service';

import { loadMessages, locale } from 'devextreme/localization';
import { fr } from 'src/app/services/data/fr';
import { UrgenceDepartmentsService } from 'src/app/services/data/urgenceDepartments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrgenceService } from 'src/app/services/data/urgence.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  myMap: any;
  isLoading = true;
  urgences = [];
  zones = [];
  departmentSubscription: Subscription = new Subscription();
  filteredZoneSubscription: Subscription = new Subscription();
  activeLayerGroup: any;
  layerGroups: any[];
  iconPolice = L.icon({
    iconUrl: './assets/img/icon/icon_map_snowflake.svg',
    iconSize: [60, 75],
    iconAnchor: [15, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  iconFire = L.icon({
    iconUrl: './assets/img/icon/icon_map_fire.svg',
    iconSize: [60, 75],
    iconAnchor: [15, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  iconMe = L.icon({
    iconUrl: './assets/img/icon/me.svg',
    iconSize: [60, 75],
    iconAnchor: [15, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  markersCluster: any;
  color = '#ffaa00';

  constructor(
    private resolver: ComponentFactoryResolver,
    public urgenceDepartmentsService: UrgenceDepartmentsService,
    private urgence: UrgenceService,
    private injector: Injector,
    public zoneService: ZoneService,
    public utilsService: UtilsService
  ) {
    loadMessages(fr);
    locale('fr');
    this.layerGroups = [];
    this.activeLayerGroup = L.featureGroup([]);
    this.layerGroups.push(this.activeLayerGroup);
    this.departmentSubscription = this.urgence.observableUrgence.subscribe(
      (items: any) => {
        if (items !== undefined) {
          this.urgences = items;
          if (this.myMap !== undefined) {
            this.layerGroups = [];
            this.activeLayerGroup.clearLayers();
            this.initMarkerCluster();
            this.updateMapCluster(this.urgences);
            if (this.markersCluster !== undefined) {
              const bounds = this.markersCluster.getBounds();
              if (!this.utilsService.isEmptyObject(bounds)) {
                this.myMap.fitBounds(bounds);
              }
            }
            this.myMap.addLayer(this.markersCluster);
            let that = this;
            // this.myMap.locate({
            //   setView: true,
            //   maxZoom: 16,
            //   watch: true,
            //   enableHighAccuracy: true,
            // });
            // this.myMap.on('locationfound', (e: any) => {
            //   let radius = e.accuracy;
            //   let latlng: any = this.randomizeLocation(e.latitude, e.longitude);
            //   L.marker(latlng, {
            //     icon: this.iconMe,
            //   })
            //     .addTo(this.myMap)
            //     .bindPopup('Urgence est ici ')
            //     .openPopup();

            //   L.circle(e.latlng, 10 / 2).addTo(this.myMap);
            // });
            this.myMap.on('locationerror', (e: any) => {
              alert(e.message);
            });
            this.isLoading = false;
          }
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.departmentSubscription.unsubscribe();
  }

  initMarkerCluster() {
    let that = this;
    this.markersCluster = (L as any).markerClusterGroup({
      iconCreateFunction(cluster: any) {
        let casesCount = cluster.getChildCount();
        let data: any;
        return L.divIcon({
          html: L.Util.template(that.getSvg(that.color, casesCount), data),
          className: 'cluster',
          iconSize: (70 as any),
        });
      },
    });
  }

  fromGeoJson(zone: any, geoJsonData: any) {
    geoJsonData.features.map((feature: any) => {
      if (feature.geometry.type === 'Polygon') {
        let points: any = [];
        feature.geometry.coordinates[0].map((coordinate: any) => {
          let point = [];
          // reverse geojson x,y to LatLng
          point.push(coordinate[1]);
          point.push(coordinate[0]);
          points.push(point);
        });
        L.polygon(points)
          .bindPopup(
            `<div class='popup-custom-bloc-data'><strong class='title'> ${zone.nom}</strong></div>`
          )
          .addTo(this.activeLayerGroup);
      }
      if (
        feature.geometry.type === 'Point' &&
        feature.properties.radius !== undefined
      ) {
        L.circle(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { radius: feature.properties.radius }
        )
          .bindPopup(
            `<div class='popup-custom-bloc-data'><strong class='title'>Name</strong>: ${zone.nom} </div>`
          )
          .addTo(this.activeLayerGroup);
      }
    });
  }

  ngOnInit(): void {
    this.urgence.getUrgences();
  }

  updateMapCluster(frigos: any) {
    for (let frigo of frigos) {
      this.drawFrigo(frigo);
    }
  }

  getSvg(color: any, casesCount: any) {
    let svgIconP1 =
      '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41"><defs><style>.cls-m-1{fill:#fff; opacity:0.21;}.cls-m-2{fill:' +
      color +
      ';}';
    let cls = '.cls-m-3{font-size:11px;';
    let svgIconP2 =
      ';fill:#fff;font-family:Lato-Bold, Lato;}</style></defs><circle class="cls-m-1" cx="20.5" cy="20.5" r="20"/><circle class="cls-m-2" cx="20.5" cy="20.5" r="17.03704"/>';
    let svgIconP3 = '';
    switch ((casesCount + '').length) {
      case 1:
        cls = '.cls-m-16{font-size:16px';
        svgIconP3 = '<text class="cls-m-16" transform="translate(15 27)">';
        break;
      case 2:
        cls = '.cls-m-16{font-size:16px';
        svgIconP3 = '<text class="cls-m-16" transform="translate(11 27)">';
        break;
      case 3:
        cls = '.cls-m-12{font-size:12px';
        svgIconP3 = '<text class="cls-m-12" transform="translate(9 26)">';
        break;
      case 4:
        cls = '.cls-m-12{font-size:12px';
        svgIconP3 = '<text class="cls-m-12" transform="translate(7 26)">';
        break;
      case 5:
        cls = '.cls-m-10{font-size:10px';
        svgIconP3 = '<text class="cls-m-10" transform="translate(6 26)">';
        break;
      case 6:
        cls = '.cls-m-8{font-size:8px';
        svgIconP3 = '<text class="cls-m-8" transform="translate(6 25)">';
        break;
      case 7:
        cls = 'cls-m-7{font-size:7px';
        svgIconP3 = '<text class="cls-7" transform="translate(6 25)">';
        break;
      case 8:
        cls = 'cls-m-6{font-size:6px';
        svgIconP3 = '<text class="cls-m-6" transform="translate(7 25)">';
        break;
    }
    return (
      svgIconP1 + cls + svgIconP2 + svgIconP3 + casesCount + '</text></svg>'
    );
  }

  ngAfterViewInit(): void {
    this.myMap = L.map('mapid', {
      zoom: 6,
      minZoom: 2,
      layers: this.layerGroups,
    }).setView([34.551117, 9.369019], 5);
    L.tileLayer('http://mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}').addTo(
      this.myMap
    );
    setTimeout(() => {}, 2000);
  }

  drawFrigo(data: any) {
    // const compFactory = this.resolver.resolveComponentFactory(
    //   FrigoCardComponent
    // );
    // this.compFrigoRef = compFactory.create(this.injector);
    // this.compFrigoRef.instance.frigo = data;
    // this.compFrigoRef.changeDetectorRef.detectChanges();

    // // example of parent-child communication

    // let div = document.createElement("div");
    // div.appendChild(this.compFrigoRef.location.nativeElement);
    let div;
    let latlng: any = this.randomizeLocation(data.lat, data.lon);
    let marker = L.marker(latlng, {
      icon: this.getIcon(data.type),
    })
      .bindPopup('hello')
      .addTo(this.markersCluster);
  }

  getIcon(type: any) {
    let icon = this.iconPolice;
    switch (type) {
      case 'police':
        icon = this.iconPolice;
        break;
      case 'fire_station':
        icon = this.iconFire;
        break;
      default:
        icon = this.iconFire;
        break;
    }
    return icon;
  }

  randomizeLocation(lat: number, lon: number) {
    let random = (Math.random() * 5) / 111111; // 1/111111 === one meter
    if (Math.random() > 0.5) {
      random = -random;
    }
    random = random * 0; // eliminate randomize function
    return [Number(lat) + random, Number(lon) + random];
  }
}
