import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoleService } from '../services/role.service';
import { RoleApiActions, RolePageActions } from './actions';

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private roleService: RoleService
  ) {}

  loadRoleList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RolePageActions.loadRoleList),
      mergeMap((action) =>
        this.roleService.getRoleList().pipe(
          map((roleList) =>
            RoleApiActions.loadRoleSuccess({ roleList })
          ),
          catchError((error) =>
            of(RoleApiActions.loadRoleFailure({ error }))
          )
        )
      )
    );
  });

  updateRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RolePageActions.updateRole),
      concatMap((action) =>
        this.roleService.updateRole(action.role).pipe(
          map((role) =>
            RoleApiActions.updateRoleSuccess({ role })
          ),
          catchError((error) =>
            of(RoleApiActions.updateRoleFailure({ error }))
          )
        )
      )
    );
  });

  createRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RolePageActions.createRole),
      concatMap((action) =>
        this.roleService.createRole(action.role).pipe(
          tap((name) => console.log(name)),
          map((name) =>
            RoleApiActions.createRoleSuccess({
              role: { ...action.role, name: name },
            })
          ),
          catchError((error) =>
            of(RoleApiActions.createRoleFailure({ error }))
          )
        )
      )
    );
  });

  deleteRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RolePageActions.deleteRole),
      mergeMap((action) =>
        this.roleService.deleteRole(action.roleId).pipe(
          map(() =>
            RoleApiActions.deleteRoleSuccess({
              roleId: action.roleId,
            })
          ),
          catchError((error) =>
            of(RoleApiActions.deleteRoleFailure({ error }))
          )
        )
      )
    );
  });
}
