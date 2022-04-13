import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import {
  getCurrentUser,
  getMaskUserName,
  getUserError,
} from './state/user.reducer';
import * as UserActions from './state/user.actions';
import { AuthService } from '../core/services/auth.service';
import { SelfUrl } from '../core/constants/url.constant';
import { User } from '../core/modles/user.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;
  getUser$: Observable<User>;
  logInError$: Observable<string>;
  errorMessage: string;

  constructor(
    private store: Store<State>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maskUserName$ = this.store.select(getMaskUserName);
    this.getUser$ = this.store.select(getCurrentUser);
    this.logInError$ = this.store.select(getUserError);
  }

  ngAfterViewInit(): void {
    this.getUser$.subscribe((res) => {
      if (!res) return;
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate([SelfUrl.HOME]);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['home']);
  }

  checkChanged(): void {
    this.store.dispatch(UserActions.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);
    }
  }
}
