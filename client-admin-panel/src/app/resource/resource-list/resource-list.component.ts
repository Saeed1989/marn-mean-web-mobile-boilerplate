import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Resource } from 'src/app/core/modles/resource.model';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
})
export class ResourceListComponent {
  pageTitle = 'Resource';

  @Input() errorMessage: string;
  @Input() resourceList: Resource[];
  @Input() displayCode: boolean;
  @Input() selectedResource: Resource;
  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initializeNewResource = new EventEmitter<void>();
  @Output() resourceSelect = new EventEmitter<Resource>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newResource(): void {
    this.initializeNewResource.emit();
  }

  onResourceSelected(resource: Resource): void {
    this.resourceSelect.emit(resource);
  }
}
