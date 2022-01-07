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

const dataRoutes: Routes = [{ path: '', component: DataContainerComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dataRoutes),
    StoreModule.forFeature('dataList', dataReducer),
    EffectsModule.forFeature([DataEffects]),
  ],
  declarations: [
    DataContainerComponent,
    DataListComponent,
    DataEditComponent,
  ],
  providers: [DataService],
})
export class DataModule {}
