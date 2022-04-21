import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RoleContainerComponent } from './role-container/role-container.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role]-list.component';
import { RoleShellComponent } from './role-shell.component';
import { RolePermissionGuard } from './services/guards/role-permission-guard.service';
import { RoleService } from './services/role.service';

const roleRoutes = [
  {
    path: '',
    canActivate: [RolePermissionGuard],
    component: RoleShellComponent,
    children: [
      { path: '', redirectTo: 'role-edit', pathMatch: 'full' },
      { path: 'role-edit', component: RoleContainerComponent },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(roleRoutes)],
  declarations: [
    RoleShellComponent,
    RoleContainerComponent,
    RoleEditComponent,
    RoleListComponent,
  ],
  providers: [RoleService, RolePermissionGuard],
})
export class RoleModule {}
