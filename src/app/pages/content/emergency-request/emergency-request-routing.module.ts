import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyRequestComponent } from './emergency-request.component';

const routes: Routes = [{ path: '', component: EmergencyRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyRequestRoutingModule { }
