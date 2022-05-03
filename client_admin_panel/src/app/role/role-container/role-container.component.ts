import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ResState } from '../state/role.reducer';
import { getCurrentUser, UserState } from 'src/app/login/state/user.reducer';
import { Role } from 'src/app/core/modles/role.model';
import { getCurrentRole, getRoleError, getRoleList, getShowRoleCode } from '../state/role.selectors';
import { RolePageActions } from '../state/actions';
import { Authority } from 'src/app/core/constants/authority.constant';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './role-container.component.html',
})
export class RoleContainerComponent implements OnInit, AfterViewInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  roleList$: Observable<Role[]>;
  selectedRole$: Observable<Role>;
  hasEditRole = false;

  constructor(
    private perStore: Store<ResState>,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    // Role processing
    this.roleList$ = this.perStore.select(getRoleList);
    this.errorMessage$ = this.perStore.select(getRoleError);
    this.selectedRole$ = this.perStore.select(getCurrentRole);
    this.displayCode$ = this.perStore.select(getShowRoleCode);
  }

  ngAfterViewInit(): void {
    // load role on start
    this.perStore.dispatch(RolePageActions.loadRoleList());

    this.store
      .select(getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
        setTimeout(() => {
          this.hasEditRole = [
            Authority.ADMIN,
            Authority.MANAGER,
          ].includes(user.currentAuthority);
        });
      });
  }

  checkChanged(): void {
    this.perStore.dispatch(RolePageActions.toggleRoleCode());
  }

  newRole(name: string): void {
    this.perStore.dispatch(
      RolePageActions.initializeCurrentRole({ name })
    );
  }

  roleSelected(role: Role): void {
    this.perStore.dispatch(
      RolePageActions.setCurrentRole({ currentRoleId: role.id })
    );
  }

  deleteRole(role: Role): void {
    if (role && role.id) {
      if (confirm(`Really delete the role: ${role.name}?`)) {
        this.perStore.dispatch(
          RolePageActions.deleteRole({ roleId: role.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      // this.roleStore.dispatch(RolePageActions.clearCurrentRole());
    }
  }

  saveRole(role: Role): void {
    if (role) {
      this.perStore.dispatch(
        RolePageActions.createRole({ role: role })
      );
    }
  }

  updateRole(role: Role): void {
    if (role) {
      this.perStore.dispatch(
        RolePageActions.updateRole({ role: role })
      );
    }
  }

  onSelectrole(item): void {
    //  load role list for this role hiararcy
    this.perStore.dispatch(
      RolePageActions.setCurrentRole({
        currentRoleId: item?.role?.id || '0',
      })
    );
  }

  onAdd(item): void {
    console.log(item);
    this.newRole(item?.role?.sku || '');
  }
}
