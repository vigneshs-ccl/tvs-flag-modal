import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

import { FlagComponent } from '@app/modules/admin/flag/flag.component';
import { ProfileComponent } from '@app/modules/employee/profile/profile.component';
import { CoachProfileComponent } from '@app/modules/coach/coach-profile/coach-profile.component';
import { AdminProfileComponent } from '@app/modules/admin/admin-profile/admin-profile.component';
import { AddCoachComponent } from './modules/admin/add-coach/add-coach.component';

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
    component: FlagComponent,
  },
  {
    path: 'employee/profile',
    component: ProfileComponent,
  },
  {
    path: 'coach/profile',
    component: CoachProfileComponent,
  },
  {
    path: 'admin/profile',
    component: AdminProfileComponent,
  },
  {
    path: 'admin/add-coach',
    component: AddCoachComponent,
  },
  {
    path: '',
    redirectTo: 'admin/add-coach',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'admin/add-coach',
  },
];
