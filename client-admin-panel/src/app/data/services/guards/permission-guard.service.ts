import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Authority } from 'src/app/core/constants/authority.constant';
import { SelfUrl } from 'src/app/core/constants/url.constant';
import { getCurrentUser, UserState } from 'src/app/login/state/user.reducer';

@Injectable()
export class DataPermissionGuard implements CanActivate {
  constructor(private store: Store<UserState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(getCurrentUser).pipe(
      map((authUser) => {
        if (
          !authUser ||
          ![Authority.ADMIN, Authority.MANAGER, Authority.EDITOR].includes(
            authUser.currentAuthority
          )
        ) {
          console.log('no permission');
          this.router.navigate([SelfUrl.HOME]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
