import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthCardRoutingModule } from './health-card-routing.module';
import { HealthCardComponent } from './health-card.component';
import {
  DxFormModule,
  DxRadioGroupModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HealthCardComponent],
  imports: [
    CommonModule,
    HealthCardRoutingModule,
    DxRadioGroupModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    DxFormModule
  ],
})
export class HealthCardModule {}
