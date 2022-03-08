import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PermissionContainerComponent } from './permission-container/permission-container.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionShellComponent } from './permission-shell.component';
import { PermissionPermissionGuard } from './services/guards/permission-permission-guard.service';

const permissionRoutes = [
  {
    path: '',
    canActivate: [PermissionPermissionGuard],
    component: PermissionShellComponent,
    children: [
      { path: '', redirectTo: 'permission-edit', pathMatch: 'full' },
      { path: 'permission-edit', component: PermissionContainerComponent },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(permissionRoutes)],
  declarations: [
    PermissionShellComponent,
    PermissionContainerComponent,
    PermissionListComponent,
    PermissionEditComponent,
  ],
  providers: [PermissionPermissionGuard],
})
export class PermissionModule {}
