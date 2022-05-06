import { CategoryApiActions, CategoryPageActions } from './actions';
import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/core/modles/category.model';

export interface CategoryState {
  showCategoryCode: boolean;
  currentCategoryId: string | null;
  currentParentSku: string;
  categoryList: Category[];
  error: string;
}

const initialState: CategoryState = {
  showCategoryCode: true,
  currentCategoryId: null,
  currentParentSku: '',
  categoryList: [],
  error: '',
};

export const categoryReducer = createReducer<CategoryState>(
  initialState,
  on(CategoryPageActions.toggleCategoryCode, (state): CategoryState => {
    return {
      ...state,
      showCategoryCode: !state.showCategoryCode,
    };
  }),
  on(CategoryPageActions.setCurrentCategory, (state, action): CategoryState => {
    return {
      ...state,
      currentCategoryId: action.currentCategoryId,
    };
  }),
  on(CategoryPageActions.clearCurrentCategory, (state): CategoryState => {
    return {
      ...state,
      currentCategoryId: null,
    };
  }),
  on(CategoryPageActions.initializeCurrentCategory, (state, action): CategoryState => {
    return {
      ...state,
      currentCategoryId: '0',
      currentParentSku: action.parentSku
    };
  }),
  on(CategoryApiActions.loadCategorySuccess, (state, action): CategoryState => {
    return {
      ...state,
      categoryList: action.categoryList,
      error: '',
    };
  }),
  on(CategoryApiActions.loadCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      categoryList: [],
      error: action.error,
    };
  }),
  on(CategoryApiActions.updateCategorySuccess, (state, action): CategoryState => {
    const updatedCategoryList = state.categoryList.map((item) =>
      action.category.id === item.id ? action.category : item
    );
    return {
      ...state,
      categoryList: updatedCategoryList,
      currentCategoryId: action.category.id,
      error: '',
    };
  }),
  on(CategoryApiActions.updateCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentCategory is the new category.
  on(CategoryApiActions.createCategorySuccess, (state, action): CategoryState => {
    console.log('create cat success');
    console.log(action.category);
    const updatedCategoryList = [...state.categoryList, action.category];
    return {
      ...state,
      categoryList: updatedCategoryList,
      currentCategoryId: action.category.id,
      error: '',
    };
  }),
  on(CategoryApiActions.createCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentCategory is null.
  on(CategoryApiActions.deleteCategorySuccess, (state, action): CategoryState => {
    return {
      ...state,
      categoryList: state.categoryList.filter((category) => category.id !== action.categoryId),
      currentCategoryId: null,
      error: '',
    };
  }),
  on(CategoryApiActions.deleteCategoryFailure, (state, action): CategoryState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
