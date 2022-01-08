import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alert } from '../core/modles/alert.model';
import { State } from '../state/app.state';
import { getCurrentUser } from '../login/state/user.reducer';
import { AlertPageActions } from './state/actions';
import { getAlerts, getError } from './state/alert.selectors';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public pageTitle = 'Welcome';

  alerts$: Observable<Alert[]>;

  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(getCurrentUser).subscribe((user) => {
      this.store.dispatch(
        AlertPageActions.loadAlerts({ userId: (user?.type || '').toString() })
      );
    });
    this.alerts$ = this.store.select(getAlerts);
    this.errorMessage$ = this.store.select(getError);
  }
}
