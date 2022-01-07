import { LoadingSatate } from './loading.reducer';
import { UserState } from '../login/state/user.reducer';

export interface State {
  user: UserState;
  isLoading: LoadingSatate;
}
