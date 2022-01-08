import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../core/modles/data.model';
import { Store } from '@ngrx/store';
import {
  State,
  getShowDataCode,
  getCurrentData,
  getDataList,
  getError,
} from './state/data.selectors';
import { DataPageActions } from './state/actions';

@Component({
  templateUrl: './data-container.component.html',
})
export class DataContainerComponent implements OnInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  dataList$: Observable<Data[]>;
  selectedData$: Observable<Data>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {

    this.dataList$ = this.store.select(getDataList);
    this.errorMessage$ = this.store.select(getError);
    this.selectedData$ = this.store.select(getCurrentData);
    this.displayCode$ = this.store.select(getShowDataCode);
  }

  checkChanged(): void {
    this.store.dispatch(DataPageActions.toggleDataCode());
  }

  newData(): void {
    this.store.dispatch(DataPageActions.initializeCurrentData());
  }

  dataSelected(data: Data): void {
    this.store.dispatch(
      DataPageActions.setCurrentData({ currentDataId: data.id })
    );
  }

  deleteData(data: Data): void {
    if (data && data.id) {
      if (confirm(`Really delete the data: ${data.dataName}?`)) {
        this.store.dispatch(
          DataPageActions.deleteData({ dataId: data.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(DataPageActions.clearCurrentData());
    }
  }

  saveData(data: Data): void {
    if (data) {
      this.store.dispatch(DataPageActions.createData({ data }));
    }
  }

  updateData(data: Data): void {
    if (data) {
      this.store.dispatch(DataPageActions.updateData({ data }));
    }
  }

  onSelectCatagory(catHiararcy): void {
    this.store.dispatch(DataPageActions.loadDataList({catHierarchy: (catHiararcy || '')}));
  }
}
