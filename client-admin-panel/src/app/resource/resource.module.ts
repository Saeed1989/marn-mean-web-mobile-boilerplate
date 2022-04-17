import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ResourceContainerComponent } from './resource-container/resource-container.component';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceShellComponent } from './resource-shell.component';
import { ResourcePermissionGuard } from './services/guards/resource-permission-guard.service';

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
  imports: [SharedModule, RouterModule.forChild(resourceRoutes)],
  declarations: [
    ResourceShellComponent,
    ResourceContainerComponent,
    ResourceEditComponent,
    ResourceListComponent,
  ],
  providers: [ResourcePermissionGuard],
})
export class ResourceModule {}
