import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { latLng, tileLayer, circle, Map, marker, Marker, icon, Icon } from 'leaflet';
import { Office } from '../shared/interfaces/office';
import { PartnersQuery } from '../shared/interfaces/partners-query';
import { PartnersService } from '../shared/services/partners/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  // partners being shown in list
  partners: Array<Office> = [];

  // markers being displayed
  markersMap: any = {};
  panelClosed: boolean =  false; // search panel closed in mobile
  filtersForm: FormGroup = new FormGroup({
    radius: new FormControl(100, [Validators.required, Validators.min(1)])
  });

  // circle showing the radius
  circle = circle([ 51.5144636, -0.142571 ], { radius: this.radius * 1000 });

  // leaflet map options
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 7,
    center: latLng(51.5144636, -0.142571),
  };

  constructor(public partnersService: PartnersService) {
  }

  ngOnInit(): void {
    this.getPartners()
  }

  filter() {
    if (this.filtersForm.invalid) {
      return;
    }

    this.circle.setRadius(this.radius* 1000);
    this.map.fitBounds(this.circle.getBounds());
    this.getPartners();
    this.filtersForm.get('radius')?.updateValueAndValidity()
  }

  called=false;
  getPartners() {
    this.called = true;
    const params: PartnersQuery = {
      lat: 51.5144636,
      lon: -0.142571,
      distance: this.radius 
    }
    this.partnersService.list(params)
      .subscribe((res: any) => {
        this.partners = res;
        this.markersMap = {}
        this.partners.map(partner => {
          this.markersMap[`${partner.id}-${partner.offices.location}`] = marker(latLng(partner.offices.coordinates.lat, partner.offices.coordinates.lon), {
            icon: this.createIcon(false),
          }).bindPopup(`<p>${partner.organization}</p>`)
        })
      })
  }

  map!: Map;
  mapReady(map: Map) {
    this.map = map;
  }

  get radius() {
    return this.filtersForm.get('radius')?.value
  }

  get markers() {
    const marks = []
    for (const id in this.markersMap) {
      if (Object.prototype.hasOwnProperty.call(this.markersMap, id)) {
        const element = this.markersMap[id];
        marks.push(element);
      }
    }
    return marks
  }

  over(office: Office) {
    const marker: Marker = this.markersMap[`${office.id}-${office.offices.location}`];
    marker.setIcon(this.createIcon(true))
  }

  out(office: Office) {
    const marker: Marker = this.markersMap[`${office.id}-${office.offices.location}`];
    marker.setIcon(this.createIcon(false))
  }

  createIcon(highlight: boolean) {
    if (highlight) {
      return  icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/img/marker-highlight.png',
        iconRetinaUrl: 'assets/img/marker-highlight.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      })
    }  
    return icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/img/marker.png',
      iconRetinaUrl: 'assets/img/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    })
  }

}
