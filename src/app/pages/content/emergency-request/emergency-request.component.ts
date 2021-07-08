import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HealthCardComponent } from '../health-card/health-card.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-emergency-request',
  templateUrl: './emergency-request.component.html',
  styleUrls: ['./emergency-request.component.scss'],
})
export class EmergencyRequestComponent implements OnInit {
  helpRequest = [
    {
      id: 1,
      user: { id: 1264302, firstName: 'Hadj Abid', lastName: 'Oumaima' },
      lat: 35.508754,
      lon: 11.048408,
      type: 'police',
      date: '2021-06-27 16:30:03',
    },
  ];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  showUserInfo(id: any) {
    const dialogRef = this.dialog.open(HealthCardComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.5 + 'px',
      height: window.innerWidth < 720 ? '100%' : 'auto',
      maxWidth: 'none',
    });
  }

  showMap(id: any) {
    const dialogRef = this.dialog.open(MapComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.5 + 'px',
      height: window.innerWidth < 720 ? '100%' : 'auto',
      maxWidth: 'none',
    });
  }

  getBackgroundColor(event: any) {
    if (event.data !== undefined) {
      if (event.data.type !== undefined) {
        if (event.data.type.toUpperCase() === 'POLICE') {
          event.rowElement.bgColor = '#337ab7';
        } else if (event.data.type.toUpperCase() === 'AMBULENCE') {
          event.rowElement.bgColor = '#ff4081';
        } else if (event.data.type.toUpperCase() === 'SAMU') {
          event.rowElement.bgColor = '#4cae4c';
        } else if (event.data.type.toUpperCase() === 'POMPIER') {
          event.rowElement.bgColor = '#777777';
        }
      } else {
        event.rowElement.bgColor = '#ff1111';
      }
    } else {
      event.rowElement.bgColor = '#fff';
    }
  }
}
