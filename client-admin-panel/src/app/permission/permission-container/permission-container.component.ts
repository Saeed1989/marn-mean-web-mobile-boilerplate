import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PerState } from '../state/permission.reducer';
import { Permission } from 'src/app/core/modles/permission.model';
import { getCurrentPermission, getPermissionError, getPermissionList, getShowPermissionCode } from '../state/permission.selectors';
import { getCurrentUser, UserState } from 'src/app/login/state/user.reducer';
import { Authority } from 'src/app/core/constants/authority.constant';
import { take } from 'rxjs/operators';
import { PermissionPageActions } from '../state/actions';

@Component({
  templateUrl: './permission-container.component.html',
})
export class PermissionContainerComponent implements OnInit, AfterViewInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  permissionList$: Observable<Permission[]>;
  selectedPermission$: Observable<Permission>;
  hasEditPermission = false;

  constructor(
    private perStore: Store<PerState>,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    // Permission processing
    this.permissionList$ = this.perStore.select(getPermissionList);
    this.errorMessage$ = this.perStore.select(getPermissionError);
    this.selectedPermission$ = this.perStore.select(getCurrentPermission);
    this.displayCode$ = this.perStore.select(getShowPermissionCode);
  }

  ngAfterViewInit(): void {
    // load permission on start
    this.perStore.dispatch(PermissionPageActions.loadPermissionList());

    this.store
      .select(getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
        setTimeout(() => {
          this.hasEditPermission = [
            Authority.ADMIN,
            Authority.MANAGER,
          ].includes(user.currentAuthority);
        });
      });
  }

  checkChanged(): void {
    this.perStore.dispatch(PermissionPageActions.togglePermissionCode());
  }

  newPermission(roleName: string): void {
    this.perStore.dispatch(
      PermissionPageActions.initializeCurrentPermission({ roleName })
    );
  }

  permissionSelected(permission: Permission): void {
    this.perStore.dispatch(
      PermissionPageActions.setCurrentPermission({ currentPermissionId: permission.id })
    );
  }

  deletePermission(permission: Permission): void {
    if (permission && permission.id) {
      if (confirm(`Really delete the permission: ${permission.roleName}?`)) {
        this.perStore.dispatch(
          PermissionPageActions.deletePermission({ permissionId: permission.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      // this.permissionStore.dispatch(PermissionPageActions.clearCurrentPermission());
    }
  }

  savePermission(permission: Permission): void {
    if (permission) {
      this.perStore.dispatch(
        PermissionPageActions.createPermission({ permission: permission })
      );
    }
  }

  updatePermission(permission: Permission): void {
    if (permission) {
      this.perStore.dispatch(
        PermissionPageActions.updatePermission({ permission: permission })
      );
    }
  }

  onSelectpermission(item): void {
    //  load permission list for this permission hiararcy
    this.perStore.dispatch(
      PermissionPageActions.setCurrentPermission({
        currentPermissionId: item?.permission?.id || '0',
      })
    );
  }

  onAdd(item): void {
    console.log(item);
    this.newPermission(item?.permission?.sku || '');
  }
}
