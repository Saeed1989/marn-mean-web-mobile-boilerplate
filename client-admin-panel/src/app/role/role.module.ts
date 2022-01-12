import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RoleShellComponent } from './role-shell.component';
import { RolePermissionGuard } from './services/guards/role-permission-guard.service';

const resourceRoutes: Routes = [
  {
    path: '',
    canActivate: [RolePermissionGuard],
    component: RoleShellComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(resourceRoutes)],
  declarations: [RoleShellComponent],
  providers: [RolePermissionGuard],
})
export class RoleModule {}
