import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import { DxLoadPanelModule } from "devextreme-angular";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    DxLoadPanelModule,
    MatButtonModule,
  ],
})
export class MapModule {}
