import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  State as CatState,
  getShowCatagoryCode,
  getCurrentCatagory,
  getCatagoryList,
  getCatagoryError,
} from '../state/catagory.selectors';
import { CatagoryPageActions } from '../state/actions';
import { Catagory } from '../../core/modles/catagory.model';

@Component({
  templateUrl: './catagory-container.component.html',
})
export class CatagoryContainerComponent implements OnInit, AfterViewInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  catList$: Observable<Catagory[]>;
  selectedCatagory$: Observable<Catagory>;

  constructor(
    private catStore: Store<CatState>
  ) {}

  ngOnInit(): void {
    // Catagory processing
    this.catList$ = this.catStore.select(getCatagoryList);
    // Catagory processing
    this.errorMessage$ = this.catStore.select(getCatagoryError);
    this.selectedCatagory$ = this.catStore.select(getCurrentCatagory);
    this.displayCode$ = this.catStore.select(getShowCatagoryCode);
  }

  ngAfterViewInit(): void {
    // load catagory on start
    this.catStore.dispatch(CatagoryPageActions.loadCatagoryList());
  }

  checkChanged(): void {
    this.catStore.dispatch(CatagoryPageActions.toggleCatagoryCode());
  }

  newCatagory(parentSku: string): void {
    this.catStore.dispatch(CatagoryPageActions.initializeCurrentCatagory({parentSku}));
  }

  catagorySelected(catagory: Catagory): void {
    this.catStore.dispatch(
      CatagoryPageActions.setCurrentCatagory({ currentCatagoryId: catagory.id })
    );
  }

  deleteCatagory(catagory: Catagory): void {
    if (catagory && catagory.id) {
      if (confirm(`Really delete the catagory: ${catagory.catName}?`)) {
        this.catStore.dispatch(
          CatagoryPageActions.deleteCatagory({ catagoryId: catagory.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      // this.catStore.dispatch(CatagoryPageActions.clearCurrentCatagory());
    }
  }

  saveCatagory(catagory: Catagory): void {
    if (catagory) {
      this.catStore.dispatch(CatagoryPageActions.createCatagory({ catagory: catagory }));
    }
  }

  updateCatagory(catagory: Catagory): void {
    if (catagory) {
      this.catStore.dispatch(CatagoryPageActions.updateCatagory({ catagory: catagory }));
    }
  }

  onSelectcatagory(item): void {
     //  load catagory list for this cat hiararcy
    this.catStore.dispatch(
      CatagoryPageActions.setCurrentCatagory ({ currentCatagoryId: item?.catagory?.id || '0' })
    );
  }

  onAdd(item): void {
    console.log(item);
    this.newCatagory(item?.catagory?.sku || '');
  }
}
