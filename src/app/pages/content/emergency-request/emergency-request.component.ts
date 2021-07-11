import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UrgenceService } from 'src/app/services/data/urgence.service';
import { HealthCardComponent } from '../health-card/health-card.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-emergency-request',
  templateUrl: './emergency-request.component.html',
  styleUrls: ['./emergency-request.component.scss'],
})
export class EmergencyRequestComponent implements OnInit {
  helpRequest = [];
  constructor(public dialog: MatDialog, private urgence: UrgenceService) {
    this.urgence.observableUrgence.subscribe((items:any) => {
      if (items != undefined) {
        this.helpRequest = items;
      }
    });
  }

  ngOnInit(): void {
    this.urgence.getUrgences();
  }

  showUserInfo(data: any) {
    const dialogRef = this.dialog.open(HealthCardComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.5 + 'px',
      height: window.innerWidth < 720 ? '70%' : '70%',
      data: data,
      maxWidth: 'none',
    });
  }

  showMap(data: any) {
    const dialogRef = this.dialog.open(MapComponent, {
      width: window.innerWidth < 720 ? '100%' : window.innerWidth / 1.5 + 'px',
      height: window.innerWidth < 720 ? '100%' : 'auto',
      data: data,
      maxWidth: 'none',
    });
  }

  sendHelp(id:any){
    this.urgence.sendHelp(id);

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
        } else if (event.data.type.toUpperCase() === 'FIRE_STATION') {
          event.rowElement.bgColor = '#777777';
        }
      } else {
        event.rowElement.bgColor = '#ff1111';
      }
    } else {
      event.rowElement.bgColor = '#ff1111';
    }
  }
}
