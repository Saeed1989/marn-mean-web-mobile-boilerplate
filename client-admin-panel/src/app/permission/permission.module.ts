import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PermissionShellComponent } from './permission-shell.component';
import { PermissionPermissionGuard } from './services/guards/permission-permission-guard.service';

const resourceRoutes: Routes = [
  {
    path: '',
    canActivate: [PermissionPermissionGuard],
    component: PermissionShellComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(resourceRoutes)],
  declarations: [PermissionShellComponent],
  providers: [PermissionPermissionGuard],
})
export class PermissionModule {}
