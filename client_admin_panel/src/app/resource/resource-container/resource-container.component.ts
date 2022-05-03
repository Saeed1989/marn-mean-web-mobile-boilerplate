import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCurrentResource, getResourceError, getResourceList, getShowResourceCode } from '../state/resource.selectors';
import { getCurrentUser, UserState } from 'src/app/login/state/user.reducer';
import { Authority } from 'src/app/core/constants/authority.constant';
import { take } from 'rxjs/operators';
import { ResourcePageActions } from '../state/actions';
import { Resource } from 'src/app/core/modles/resource.model';
import { ResState } from '../state/resource.reducer';

@Component({
  templateUrl: './resource-container.component.html',
})
export class ResourceContainerComponent implements OnInit, AfterViewInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  resourceList$: Observable<Resource[]>;
  selectedResource$: Observable<Resource>;
  hasEditResource = false;

  constructor(
    private perStore: Store<ResState>,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    // Resource processing
    this.resourceList$ = this.perStore.select(getResourceList);
    this.errorMessage$ = this.perStore.select(getResourceError);
    this.selectedResource$ = this.perStore.select(getCurrentResource);
    this.displayCode$ = this.perStore.select(getShowResourceCode);
  }

  ngAfterViewInit(): void {
    // load resource on start
    this.perStore.dispatch(ResourcePageActions.loadResourceList());

    this.store
      .select(getCurrentUser)
      .pipe(take(1))
      .subscribe((user) => {
        setTimeout(() => {
          this.hasEditResource = [
            Authority.ADMIN,
            Authority.MANAGER,
          ].includes(user.currentAuthority);
        });
      });
  }

  checkChanged(): void {
    this.perStore.dispatch(ResourcePageActions.toggleResourceCode());
  }

  newResource(name: string): void {
    this.perStore.dispatch(
      ResourcePageActions.initializeCurrentResource({ name })
    );
  }

  resourceSelected(resource: Resource): void {
    this.perStore.dispatch(
      ResourcePageActions.setCurrentResource({ currentResourceId: resource.id })
    );
  }

  deleteResource(resource: Resource): void {
    if (resource && resource.id) {
      if (confirm(`Really delete the resource: ${resource.name}?`)) {
        this.perStore.dispatch(
          ResourcePageActions.deleteResource({ resourceId: resource.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      // this.resourceStore.dispatch(ResourcePageActions.clearCurrentResource());
    }
  }

  saveResource(resource: Resource): void {
    if (resource) {
      this.perStore.dispatch(
        ResourcePageActions.createResource({ resource: resource })
      );
    }
  }

  updateResource(resource: Resource): void {
    if (resource) {
      this.perStore.dispatch(
        ResourcePageActions.updateResource({ resource: resource })
      );
    }
  }

  onSelectresource(item): void {
    //  load resource list for this resource hiararcy
    this.perStore.dispatch(
      ResourcePageActions.setCurrentResource({
        currentResourceId: item?.resource?.id || '0',
      })
    );
  }

  onAdd(item): void {
    console.log(item);
    this.newResource(item?.resource?.sku || '');
  }
}
