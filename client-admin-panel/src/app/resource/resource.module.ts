import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ResourceShellComponent } from './resource-shell.component';
import { ResourcePermissionGuard } from './services/guards/resource-permission-guard.service';

const resourceRoutes: Routes = [
  {
    path: '',
    canActivate: [ResourcePermissionGuard],
    component: ResourceShellComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(resourceRoutes)],
  declarations: [ResourceShellComponent],
  providers: [ResourcePermissionGuard],
})
export class ResourceModule {}
