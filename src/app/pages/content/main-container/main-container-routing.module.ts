import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainContainerComponent } from './main-container.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      // {
      //   path: "supervision",
      //   loadChildren: () =>
      //     import("../frigo/frigo.module").then((m) => m.FrigoModule),
      // },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('../departments/departments.module').then(
            (m) => m.DepartmentsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'help_request',
        loadChildren: () =>
          import('../emergency-request/emergency-request.module').then(
            (m) => m.EmergencyRequestModule
          ),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../map/map.module').then((m) => m.MapModule),
      },
      {
        path: "health-card",
        loadChildren: () =>
          import("../health-card/health-card.module").then((m) => m.HealthCardModule),
      },
      // {
      //   path: "report",
      //   loadChildren: () =>
      //     import("../report/report.module").then((m) => m.ReportModule),
      // },
      // {
      //   path: "contrainte",
      //   loadChildren: () =>
      //     import("../contrainte/contrainte.module").then(
      //       (m) => m.ContrainteModule
      //     ),
      // },
      // {
      //   path: "zone",
      //   loadChildren: () =>
      //     import("../zone/zone.module").then((m) => m.ZoneModule),
      // },
      // {
      //   path: "type-category",
      //   loadChildren: () =>
      //     import("../frigo-category-type/frigo-category-type.module").then(
      //       (m) => m.FrigoCategoryTypeModule
      //     ),
      // },
      // {
      //   path: "account",
      //   loadChildren: () =>
      //     import("../account/account.module").then((m) => m.AccountModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainContainerRoutingModule {}
