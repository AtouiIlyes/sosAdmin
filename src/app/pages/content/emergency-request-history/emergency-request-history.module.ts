import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { DxDataGridModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { EmergencyRequestHistoryRoutingModule } from './emergency-request-history-routing.module';
import { EmergencyRequestHistoryComponent } from './emergency-request-history.component';

@NgModule({
  declarations: [EmergencyRequestHistoryComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    EmergencyRequestHistoryRoutingModule,
  ],
})
export class EmergencyRequestHistoryModule {}
