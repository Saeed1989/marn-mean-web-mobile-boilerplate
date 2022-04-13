import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PermissionService } from '../services/permission.service';
import { PermissionApiActions, PermissionPageActions } from './actions';

@Injectable()
export class PermissionEffects {
  constructor(
    private actions$: Actions,
    private permissionService: PermissionService
  ) {}

  loadPermissionList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PermissionPageActions.loadPermissionList),
      mergeMap((action) =>
        this.permissionService.getPermissionList().pipe(
          map((permissionList) =>
            PermissionApiActions.loadPermissionSuccess({ permissionList })
          ),
          catchError((error) =>
            of(PermissionApiActions.loadPermissionFailure({ error }))
          )
        )
      )
    );
  });

  updatePermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PermissionPageActions.updatePermission),
      concatMap((action) =>
        this.permissionService.updatePermission(action.permission).pipe(
          map((permission) =>
            PermissionApiActions.updatePermissionSuccess({ permission })
          ),
          catchError((error) =>
            of(PermissionApiActions.updatePermissionFailure({ error }))
          )
        )
      )
    );
  });

  createPermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PermissionPageActions.createPermission),
      concatMap((action) =>
        this.permissionService.createPermission(action.permission).pipe(
          tap((roleName) => console.log(roleName)),
          map((roleName) =>
            PermissionApiActions.createPermissionSuccess({
              permission: { ...action.permission, roleName: roleName },
            })
          ),
          catchError((error) =>
            of(PermissionApiActions.createPermissionFailure({ error }))
          )
        )
      )
    );
  });

  deletePermission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PermissionPageActions.deletePermission),
      mergeMap((action) =>
        this.permissionService.deletePermission(action.permissionId).pipe(
          map(() =>
            PermissionApiActions.deletePermissionSuccess({
              permissionId: action.permissionId,
            })
          ),
          catchError((error) =>
            of(PermissionApiActions.deletePermissionFailure({ error }))
          )
        )
      )
    );
  });
}
