import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alert } from '../core/modles/alert.model';
import { State } from '../state/app.state';
import { getCurrentUser } from '../login/state/user.reducer';
import { AlertPageActions } from './state/actions';
import { getAlerts, getError } from './state/alert.selectors';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { SelfUrl } from '../core/constants/url.constant';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public pageTitle = 'Welcome';

  alerts$: Observable<Alert[]>;

  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select(getCurrentUser).subscribe((user) => {
      this.store.dispatch(
        AlertPageActions.loadAlerts({ userId: (user?.type || '').toString() })
      );
    });
    this.alerts$ = this.store.select(getAlerts);
    this.errorMessage$ = this.store.select(getError);
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate([SelfUrl.LOGIN]);
  }
}
