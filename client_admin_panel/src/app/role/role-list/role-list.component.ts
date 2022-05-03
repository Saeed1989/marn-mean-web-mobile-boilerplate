import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Role } from 'src/app/core/modles/role.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent {
  pageTitle = 'Role';

  @Input() errorMessage: string;
  @Input() roleList: Role[];
  @Input() displayCode: boolean;
  @Input() selectedRole: Role;
  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initializeNewRole = new EventEmitter<void>();
  @Output() roleSelect = new EventEmitter<Role>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newRole(): void {
    this.initializeNewRole.emit();
  }

  onRoleSelected(role: Role): void {
    this.roleSelect.emit(role);
  }
}
