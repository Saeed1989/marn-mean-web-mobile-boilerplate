import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { PermissionContainerComponent } from './permission-container/permission-container.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionShellComponent } from './permission-shell.component';
import { PermissionPermissionGuard } from './services/guards/permission-permission-guard.service';
import { PermissionService } from './services/permission.service';
import { PermissionEffects } from './state/permission.effects';
import { permissionReducer } from './state/permission.reducer';

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
  imports: [
    SharedModule,
    RouterModule.forChild(permissionRoutes),
    StoreModule.forFeature('permissionList', permissionReducer),
    EffectsModule.forFeature([PermissionEffects]),
  ],
  declarations: [
    PermissionShellComponent,
    PermissionContainerComponent,
    PermissionListComponent,
    PermissionEditComponent,
  ],
  providers: [PermissionService, PermissionPermissionGuard],
})
export class PermissionModule {}
