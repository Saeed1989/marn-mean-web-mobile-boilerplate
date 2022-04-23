import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResourceService } from '../services/resource.service';
import { ResourceApiActions, ResourcePageActions } from './actions';

@Injectable()
export class ResourceEffects {
  constructor(
    private actions$: Actions,
    private resourceService: ResourceService
  ) {}

  loadResourceList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcePageActions.loadResourceList),
      mergeMap((action) =>
        this.resourceService.getResourceList().pipe(
          map((resourceList) =>
            ResourceApiActions.loadResourceSuccess({ resourceList })
          ),
          catchError((error) =>
            of(ResourceApiActions.loadResourceFailure({ error }))
          )
        )
      )
    );
  });

  updateResource$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcePageActions.updateResource),
      concatMap((action) =>
        this.resourceService.updateResource(action.resource).pipe(
          map((resource) =>
            ResourceApiActions.updateResourceSuccess({ resource })
          ),
          catchError((error) =>
            of(ResourceApiActions.updateResourceFailure({ error }))
          )
        )
      )
    );
  });

  createResource$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcePageActions.createResource),
      concatMap((action) =>
        this.resourceService.createResource(action.resource).pipe(
          tap((resId) => console.log(resId)),
          map((resId) =>
            ResourceApiActions.createResourceSuccess({
              resource: { ...action.resource, id: resId },
            })
          ),
          catchError((error) =>
            of(ResourceApiActions.createResourceFailure({ error }))
          )
        )
      )
    );
  });

  deleteResource$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ResourcePageActions.deleteResource),
      mergeMap((action) =>
        this.resourceService.deleteResource(action.resourceId).pipe(
          map(() =>
            ResourceApiActions.deleteResourceSuccess({
              resourceId: action.resourceId,
            })
          ),
          catchError((error) =>
            of(ResourceApiActions.deleteResourceFailure({ error }))
          )
        )
      )
    );
  });
}
