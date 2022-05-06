import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  State as CatState,
  getShowCategoryCode,
  getCurrentCategory,
  getCategoryList,
  getCategoryError,
} from '../state/category.selectors';
import { CategoryPageActions } from '../state/actions';
import { Category } from '../../core/modles/category.model';
import { getCurrentUser, UserState } from 'src/app/login/state/user.reducer';
import { take } from 'rxjs/operators';
import { Authority } from 'src/app/core/constants/authority.constant';

@Component({
  templateUrl: './category-container.component.html',
})
export class CategoryContainerComponent implements OnInit, AfterViewInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  catList$: Observable<Category[]>;
  selectedCategory$: Observable<Category>;
  hasEditPermission = false;

  constructor(
    private catStore: Store<CatState>,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    // Category processing
    this.catList$ = this.catStore.select(getCategoryList);
    // Category processing
    this.errorMessage$ = this.catStore.select(getCategoryError);
    this.selectedCategory$ = this.catStore.select(getCurrentCategory);
    this.displayCode$ = this.catStore.select(getShowCategoryCode);
  }

  ngAfterViewInit(): void {
    // load category on start
    this.catStore.dispatch(CategoryPageActions.loadCategoryList());

    this.store
      .select(getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
        setTimeout(() => {
          this.hasEditPermission = [
            Authority.ADMIN,
            Authority.MANAGER,
          ].includes(user.currentAuthority);
        });
      });
  }

  checkChanged(): void {
    this.catStore.dispatch(CategoryPageActions.toggleCategoryCode());
  }

  newCategory(parentSku: string): void {
    this.catStore.dispatch(
      CategoryPageActions.initializeCurrentCategory({ parentSku })
    );
  }

  categorySelected(category: Category): void {
    this.catStore.dispatch(
      CategoryPageActions.setCurrentCategory({ currentCategoryId: category.id })
    );
  }

  deleteCategory(category: Category): void {
    if (category && category.id) {
      if (confirm(`Really delete the category: ${category.catName}?`)) {
        this.catStore.dispatch(
          CategoryPageActions.deleteCategory({ categoryId: category.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      // this.catStore.dispatch(CategoryPageActions.clearCurrentCategory());
    }
  }

  saveCategory(category: Category): void {
    if (category) {
      this.catStore.dispatch(
        CategoryPageActions.createCategory({ category: category })
      );
    }
  }

  updateCategory(category: Category): void {
    if (category) {
      this.catStore.dispatch(
        CategoryPageActions.updateCategory({ category: category })
      );
    }
  }

  onSelectcategory(item): void {
    //  load category list for this cat hiararcy
    this.catStore.dispatch(
      CategoryPageActions.setCurrentCategory({
        currentCategoryId: item?.category?.id || '0',
      })
    );
  }

  onAdd(item): void {
    console.log(item);
    this.newCategory(item?.category?.sku || '');
  }
}
