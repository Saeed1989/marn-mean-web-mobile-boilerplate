import { createReducer, on } from '@ngrx/store';
import { Resource } from 'src/app/core/modles/resource.model';
import { ResourceApiActions, ResourcePageActions } from './actions';

export interface ResState {
  showResourceCode: boolean;
  currentResourceId: string | null;
  resourceList: Resource[];
  error: string;
}

const initialState: ResState = {
  showResourceCode: true,
  currentResourceId: null,
  resourceList: [],
  error: '',
};

export const resourceReducer = createReducer<ResState>(
  initialState,
  on(ResourcePageActions.toggleResourceCode, (state): ResState => {
    return {
      ...state,
      showResourceCode: !state.showResourceCode,
    };
  }),
  on(ResourcePageActions.setCurrentResource, (state, action): ResState => {
    return {
      ...state,
      currentResourceId: action.currentResourceId,
    };
  }),
  on(ResourcePageActions.clearCurrentResource, (state): ResState => {
    return {
      ...state,
      currentResourceId: null,
    };
  }),
  on(
    ResourcePageActions.initializeCurrentResource,
    (state, action): ResState => {
      return {
        ...state,
        currentResourceId: '0'
      };
    }
  ),
  on(ResourceApiActions.loadResourceSuccess, (state, action): ResState => {
    console.log(action);
    return {
      ...state,
      resourceList: action.resourceList,
      error: '',
    };
  }),
  on(ResourceApiActions.loadResourceFailure, (state, action): ResState => {
    return {
      ...state,
      resourceList: [],
      error: action.error,
    };
  }),
  on(ResourceApiActions.updateResourceSuccess, (state, action): ResState => {
    const updatedResourceList = state.resourceList.map((item) =>
      action.resource.name === item.name ? action.resource : item
    );
    return {
      ...state,
      resourceList: updatedResourceList,
      currentResourceId: action.resource.name,
      error: '',
    };
  }),
  on(ResourceApiActions.updateResourceFailure, (state, action): ResState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentResource is the new resource.
  on(ResourceApiActions.createResourceSuccess, (state, action): ResState => {
    console.log('create resource success');
    console.log(action.resource);
    const updatedResourceList = [...state.resourceList, action.resource];
    return {
      ...state,
      resourceList: updatedResourceList,
      currentResourceId: action.resource.name,
      error: '',
    };
  }),
  on(ResourceApiActions.createResourceFailure, (state, action): ResState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentResource is null.
  on(ResourceApiActions.deleteResourceSuccess, (state, action): ResState => {
    return {
      ...state,
      resourceList: state.resourceList.filter(
        (resource) => resource.name !== action.resourceId
      ),
      currentResourceId: null,
      error: '',
    };
  }),
  on(ResourceApiActions.deleteResourceFailure, (state, action): ResState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
