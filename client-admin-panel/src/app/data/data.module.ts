import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DataContainerComponent } from './data-container.component';
import { DataListComponent } from './data-list/data-list.component';
import { DataEditComponent } from './data-edit/data-edit.component';
import { DataService } from './services/data.service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { dataReducer } from './state/data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './state/data.effects';
import { CatagoryService } from './services/catagory.service';
import { CatagoryListComponent } from './catagory-list/catagory-list.component';
import { catagoryReducer } from './state/catagory.reducer';
import { CatagoryEffects } from './state/catagory.effects';

const dataRoutes: Routes = [{ path: '', component: DataContainerComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dataRoutes),
    StoreModule.forFeature('dataList', dataReducer),
    StoreModule.forFeature('catagoryList', catagoryReducer),
    EffectsModule.forFeature([DataEffects, CatagoryEffects]),
  ],
  declarations: [
    DataContainerComponent,
    DataListComponent,
    DataEditComponent,
    CatagoryListComponent,
  ],
  providers: [DataService, CatagoryService],
})
export class DataModule {}
