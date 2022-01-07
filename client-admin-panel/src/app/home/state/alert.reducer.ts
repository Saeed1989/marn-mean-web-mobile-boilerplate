import { AlertApiActions } from './actions';
import { createReducer, on } from '@ngrx/store';
import { Alert } from 'src/app/core/modles/alert.model';


export interface AlertState {
  alerts: Alert[];
  error: string;
}

const initialState: AlertState = {
  alerts: [],
  error: '',
};

export const alertReducer = createReducer<AlertState>(
  initialState,
  on(AlertApiActions.loadAlertSuccess, (state, action): AlertState => {
    return {
      ...state,
      alerts: action.alerts,
      error: '',
    };
  }),
  on(AlertApiActions.loadAlertFailure, (state, action): AlertState => {
    return {
      ...state,
      alerts: [],
      error: action.error,
    };
  })
);
