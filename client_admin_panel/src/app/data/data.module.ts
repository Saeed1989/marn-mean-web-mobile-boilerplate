import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataContainerComponent } from './data-container/data-container.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataEditComponent } from './data-edit/data-edit.component';
import { DataService } from './services/data.service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { dataReducer } from './state/data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './state/data.effects';
import { CategoryService } from './services/category.service';
import { CategoryListComponent } from './category-list/category-list.component';
import { categoryReducer } from './state/category.reducer';
import { CategoryEffects } from './state/category.effects';
import { DataShellComponent } from './data-shell.component';
import { CategoryContainerComponent } from './category-container/category-container.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { DataPermissionGuard } from './services/guards/data-permission-guard.service';

const dataRoutes: Routes = [{ path: '', canActivate: [DataPermissionGuard], component: DataShellComponent, children: [
  { path: '', redirectTo: 'data-edit', pathMatch: 'full' },
  { path: 'data-edit', component: DataContainerComponent },
  { path: 'category-edit', component: CategoryContainerComponent }
] }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dataRoutes),
    StoreModule.forFeature('dataList', dataReducer),
    StoreModule.forFeature('categoryList', categoryReducer),
    EffectsModule.forFeature([DataEffects, CategoryEffects]),
  ],
  declarations: [
    DataContainerComponent,
    CategoryContainerComponent,
    DataListComponent,
    DataEditComponent,
    CategoryEditComponent,
    CategoryListComponent,
    DataShellComponent
  ],
  providers: [DataService, CategoryService, DataPermissionGuard],
})
export class DataModule {}
