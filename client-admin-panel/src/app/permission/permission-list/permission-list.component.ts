import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Permission } from 'src/app/core/modles/permission.model';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent {
  pageTitle = 'Permission';

  @Input() errorMessage: string;
  @Input() permissionList: Permission[];
  @Input() displayCode: boolean;
  @Input() selectedPermission: Permission;
  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initializeNewPermission = new EventEmitter<void>();
  @Output() permissionSelect = new EventEmitter<Permission>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newPermission(): void {
    this.initializeNewPermission.emit();
  }

  onPermissionSelected(permission: Permission): void {
    this.permissionSelect.emit(permission);
  }
}
