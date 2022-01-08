import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfUrl } from './core/constants/url.constant';
import { AuthGuard } from './core/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: SelfUrl.HOME,
    pathMatch: 'full',
  },
  {
    path: SelfUrl.HOME,
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: SelfUrl.LOGIN,
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: SelfUrl.DATA,
    canActivate: [AuthGuard],
    loadChildren: () => import('./data/data.module').then((m) => m.DataModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
