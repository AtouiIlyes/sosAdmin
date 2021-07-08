import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    MatCardModule,
    MatDialogModule,
    DxButtonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
