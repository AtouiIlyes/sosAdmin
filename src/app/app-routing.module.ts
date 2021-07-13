import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/full/full.module').then((m) => m.FullModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/content/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: 'health-card', loadChildren: () => import('./pages/content/health-card/health-card.module').then(m => m.HealthCardModule) },
  { path: 'departments', loadChildren: () => import('./pages/content/departments/departments.module').then(m => m.DepartmentsModule) },
  { path: 'users', loadChildren: () => import('./pages/content/users/users.module').then(m => m.UsersModule) },
  { path: 'emergency-request', loadChildren: () => import('./pages/content/emergency-request/emergency-request.module').then(m => m.EmergencyRequestModule) },
  { path: 'emergency-request-history', loadChildren: () => import('./pages/content/emergency-request-history/emergency-request-history.module').then(m => m.EmergencyRequestHistoryModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
