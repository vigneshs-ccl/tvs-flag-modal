import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { FlagComponent } from './modules/admin/flag/flag.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'coach',
    loadChildren: () => import('./modules/coach/coach.module').then((m) => m.CoachModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'flag',
    component:FlagComponent,
  },
  {
    path: '',
    redirectTo: '/flag',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/flag',
  },
];
