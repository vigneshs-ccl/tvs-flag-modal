import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

import { FlagComponent } from '@app/modules/admin/flag/flag.component';
import { ProfileComponent } from '@app/modules/employee/profile/profile.component';
import { CoachProfileComponent } from '@app/modules/coach/coach-profile/coach-profile.component';
import { AdminProfileComponent } from '@app/modules/admin/admin-profile/admin-profile.component';
import { AddCoachComponent } from '@app/modules/admin/add-coach/add-coach.component';
import { SurveyFormComponents } from '@app/modules/admin/survey-form/survey-form.components';
import { CustomPanelComponent } from '@app/components/custom-panel/custom-panel.component';
import { Feedback } from '@app/modules/employee/feedback/feedback';

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
    path:'profile',
    component:CustomPanelComponent
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
    path: 'survey-form',
    component: SurveyFormComponents,
  },
  {
    path: 'feedback',
    component: Feedback
  },
  {
    path: '',
    redirectTo: 'feedback',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'feedback',
  },
];
