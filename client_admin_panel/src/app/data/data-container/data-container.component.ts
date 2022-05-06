import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../../core/modles/data.model';
import { Store } from '@ngrx/store';
import {
  State as DataState,
  getShowDataCode,
  getCurrentData,
  getDataList,
  getError as getDataError,
} from '../state/data.selectors';
import {
  State as CatState,
  getShowCategoryCode,
  getCurrentCategory,
  getCategoryList,
  getCategoryError as getCatError,
} from '../state/category.selectors';
import { CategoryPageActions, DataPageActions } from '../state/actions';
import { Category } from '../../core/modles/category.model';

@Component({
  templateUrl: './data-container.component.html',
})
export class DataContainerComponent implements OnInit, AfterViewInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  dataList$: Observable<Data[]>;
  catList$: Observable<Category[]>;
  selectedData$: Observable<Data>;

  constructor(
    private dataStore: Store<DataState>,
    private catStore: Store<CatState>
  ) {}

  ngOnInit(): void {
    // Category processing
    this.catList$ = this.catStore.select(getCategoryList);
    // Data processing
    this.dataList$ = this.dataStore.select(getDataList);
    this.errorMessage$ = this.dataStore.select(getDataError);
    this.selectedData$ = this.dataStore.select(getCurrentData);
    this.displayCode$ = this.dataStore.select(getShowDataCode);
  }

  ngAfterViewInit(): void {
    // load category on start
    this.catStore.dispatch(CategoryPageActions.loadCategoryList());
  }

  checkChanged(): void {
    this.dataStore.dispatch(DataPageActions.toggleDataCode());
  }

  newData(): void {
    this.dataStore.dispatch(DataPageActions.initializeCurrentData());
  }

  dataSelected(data: Data): void {
    this.dataStore.dispatch(
      DataPageActions.setCurrentData({ currentDataId: data.id })
    );
  }

  deleteData(data: Data): void {
    if (data && data.id) {
      if (confirm(`Really delete the data: ${data.name}?`)) {
        this.dataStore.dispatch(
          DataPageActions.deleteData({ dataId: data.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      // this.dataStore.dispatch(DataPageActions.clearCurrentData());
    }
  }

  saveData(data: Data): void {
    if (data) {
      this.dataStore.dispatch(DataPageActions.createData({ data }));
    }
  }

  updateData(data: Data): void {
    if (data) {
      this.dataStore.dispatch(DataPageActions.updateData({ data }));
    }
  }

  onSelectcategory(item): void {
    console.log(item);
    // set current cat hiararcy
    this.dataStore.dispatch(
      DataPageActions.setCurrentCatHiararcy({ catHiararcy: item.catHierarchy })
    );
    //  load data list for this cat hiararcy
    this.dataStore.dispatch(
      DataPageActions.loadDataList({ catHierarchy: item?.catHierarchy || '' })
    );
  }
}
