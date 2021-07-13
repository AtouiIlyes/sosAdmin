import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyRequestHistoryComponent } from './emergency-request-history.component';

const routes: Routes = [{ path: '', component: EmergencyRequestHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyRequestHistoryRoutingModule { }
