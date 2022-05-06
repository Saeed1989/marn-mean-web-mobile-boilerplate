import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { CategoryState } from './category.reducer';

export interface State extends AppState.State {
  categoryList: CategoryState;
}

const getCategoryFeatureState = createFeatureSelector<CategoryState>('categoryList');

export const getShowCategoryCode = createSelector(
  getCategoryFeatureState,
  (state) => state.showCategoryCode
);

export const getCurrentCategoryId = createSelector(
  getCategoryFeatureState,
  (state) => state.currentCategoryId
);

export const getCurrentCategory = createSelector(
  getCategoryFeatureState,
  getCurrentCategoryId,
  (state, currentCategoryId) => {
    if (currentCategoryId === '0') {
      return {
        id: '0',
        catName: '',
        sku: '',
        description: '',
        parentSku: state.currentParentSku,
      };
    } else {
      return currentCategoryId
        ? state.categoryList.find((p) => p.id === currentCategoryId)
        : null;
    }
  }
);

export const getCategoryList = createSelector(
  getCategoryFeatureState,
  (state) => state.categoryList
);

export const getCategoryError = createSelector(
  getCategoryFeatureState,
  (state) => state.error
);
