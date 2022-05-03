import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alert } from '../core/modles/alert.model';
import { State } from '../state/app.state';
import { getCurrentUser } from '../login/state/user.reducer';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { SelfUrl } from '../core/constants/url.constant';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public pageTitle = 'Menu';

  alerts: Alert[];

  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select(getCurrentUser).subscribe((user) => {
     this.alerts = user.userInfo.alerts;
    });
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate([SelfUrl.LOGIN]);
  }
}
