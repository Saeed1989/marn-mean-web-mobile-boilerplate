import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { setCurrentUser, setUserError } from 'src/app/login/state/user.actions';
import { getCurrentUser, userReducer } from 'src/app/login/state/user.reducer';
import { User } from '../modles/user.model';
import { SessionStorageService } from './sessiont-storage.service';
import { LoginNetworkService } from './network/login-network.service';
import { ConvertUtil } from '../utils/convert.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null = null;
  redirectUrl: string = '';

  constructor(
    private store: Store<State>,
    private ssService: SessionStorageService,
    private loginNetworkService: LoginNetworkService
  ) {
    // get user from session storage
    let currUser = this.ssService.getCurrentUser();
    if (currUser) {
      this.currentUser = currUser;
      this.store.dispatch(setCurrentUser({ currentUser: currUser }));
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    this.loginNetworkService.login(userName, password).subscribe({
      next: (res) => {
        this.currentUser = { ...res };
        this.ssService.setCurrentUser(this.currentUser);
        this.store.dispatch(setCurrentUser({ currentUser: this.currentUser }));
        this.store.dispatch(setUserError({ error: '' }));
      },
      error: (err) => {
        this.store.dispatch(
          setUserError({ error: ConvertUtil.errorToErrorMsg(err) })
        );
      },
    });
  }

  logout(): void {
    this.currentUser = null;
    this.ssService.setCurrentUser(this.currentUser);
    this.store.dispatch(setCurrentUser({ currentUser: this.currentUser }));
  }
}
