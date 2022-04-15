import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Permission } from 'src/app/core/modles/permission.model';
import { GenericValidator } from 'src/app/core/validators/generic-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
})
export class PermissionEditComponent implements OnInit {
  pageTitle = 'Permission Edit';

  errorMessage = '';
  permissionForm: FormGroup;
  @Input() selectedPermission: Permission;

  @Output() create = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Permission>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or permissionbase.
    this.validationMessages = {
      roleName: {
        required: 'Permission roleName is required.',
        minlength: 'Permission roleName must be at least three characters.',
        maxlength: 'Permission roleName cannot exceed 50 characters.',
      },
      resourceName: {
        required: 'Permission code is required.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.permissionForm = this.fb.group({
      roleName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      resourceName: ['', Validators.required],
      isAllowed: '',
      isDisabled: '',
    });

    // Watch for value changes for validation
    this.permissionForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.permissionForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['selectedPermission'];

    if (change && !change.firstChange) {
      this.displayPermission(change.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.permissionForm
    );
  }

  displayPermission(permission: Permission | null): void {
    if (permission) {
      // Reset the form back to pristine
      this.permissionForm.reset();

      // Display the appropriate page title
      if (permission.id === '0') {
        this.pageTitle = 'Add Permission';
      } else {
        this.pageTitle = `Edit Permission: ${permission.roleName} - ${permission.resourceName}`;
      }

      // Update the permission on the form
      this.permissionForm.patchValue({
        roleName: permission.roleName,
        resourceName: permission.resourceName,
        isAllowed: permission.isAllowed,
        isDisabled: permission.isDisabled,
      });
    }
  }

  cancelEdit(permission: Permission): void {
    // Redisplay the currently selected permission
    // replacing any edits made
    this.displayPermission(permission);
  }

  deletePermission(permission: Permission): void {
    this.delete.emit(permission);
  }

  savePermission(originalPermission: Permission): void {
    if (this.permissionForm.valid) {
      if (this.permissionForm.dirty) {
        // Copy over all of the original permission properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const permission = {
          ...originalPermission,
          ...this.permissionForm.value,
        };

        if (permission.id === '0') {
          this.create.emit(permission);
        } else {
          this.update.emit(permission);
        }
      }
    }
  }
}
