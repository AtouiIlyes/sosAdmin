import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DxDataGridModule } from 'devextreme-angular';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [DepartmentsComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    MatCardModule,
    DepartmentsRoutingModule
  ]
})
export class DepartmentsModule { }
