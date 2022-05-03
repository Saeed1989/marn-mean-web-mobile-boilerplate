import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { ResourceContainerComponent } from './resource-container/resource-container.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceShellComponent } from './resource-shell.component';
import { ResourcePermissionGuard } from './services/guards/resource-permission-guard.service';
import { ResourceService } from './services/resource.service';
import { ResourceEffects } from './state/resource.effects';
import { resourceReducer } from './state/resource.reducer';

const resourceRoutes = [
  {
    path: '',
    canActivate: [ResourcePermissionGuard],
    component: ResourceShellComponent,
    children: [
      { path: '', redirectTo: 'resource-edit', pathMatch: 'full' },
      { path: 'resource-edit', component: ResourceContainerComponent },
    ],
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(resourceRoutes),
    StoreModule.forFeature('resourceList', resourceReducer),
    EffectsModule.forFeature([ResourceEffects]),
  ],
  declarations: [
    ResourceShellComponent,
    ResourceContainerComponent,
    ResourceEditComponent,
    ResourceListComponent,
  ],
  providers: [ResourceService, ResourcePermissionGuard],
})
export class ResourceModule {}
