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
  { path: 'departments', loadChildren: () => import('./pages/content/departments/departments.module').then(m => m.DepartmentsModule) },
  { path: 'users', loadChildren: () => import('./pages/content/users/users.module').then(m => m.UsersModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
