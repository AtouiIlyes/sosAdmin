import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyRequestRoutingModule } from './emergency-request-routing.module';
import { EmergencyRequestComponent } from './emergency-request.component';
import { MatCardModule } from '@angular/material/card';
import { DxDataGridModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [EmergencyRequestComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    EmergencyRequestRoutingModule
  ]
})
export class EmergencyRequestModule { }
