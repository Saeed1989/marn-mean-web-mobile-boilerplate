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
import { Role } from 'src/app/core/modles/role.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/core/validators/generic-validator';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
})
export class RoleEditComponent implements OnInit {
  pageTitle = 'Role Edit';
  errorMessage = '';
  roleForm: FormGroup;
  @Input() selectedRole: Role;

  @Output() create = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Role>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or rolebase.
    this.validationMessages = {
      name: {
        required: 'Role name is required.',
        minlength: 'Role name must be at least three characters.',
        maxlength: 'Role name cannot exceed 50 characters.',
      },
      alias: {
        required: 'Role alias is required.',
        minlength: 'Role alias must be at least three characters.',
        maxlength: 'Role alias cannot exceed 50 characters.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.roleForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      alias: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });

    // Watch for value changes for validation
    this.roleForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.roleForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['selectedRole'];

    if (change && !change.firstChange) {
      this.displayRole(change.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.roleForm);
  }

  displayRole(role: Role | null): void {
    if (role) {
      // Reset the form back to pristine
      this.roleForm.reset();

      // Display the appropriate page title
      if (role.id === '0') {
        this.pageTitle = 'Add Role';
      } else {
        this.pageTitle = `Edit Role: ${role.name} - ${role.alias}`;
      }

      // Update the role on the form
      this.roleForm.patchValue({
        name: role.name,
        alias: role.alias,
      });
    }
  }

  cancelEdit(role: Role): void {
    // Redisplay the currently selected role
    // replacing any edits made
    this.displayRole(role);
  }

  deleteRole(role: Role): void {
    this.delete.emit(role);
  }

  saveRole(originalRole: Role): void {
    if (this.roleForm.valid) {
      if (this.roleForm.dirty) {
        // Copy over all of the original role properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const role = {
          ...originalRole,
          ...this.roleForm.value,
        };

        if (role.id === '0') {
          this.create.emit(role);
        } else {
          this.update.emit(role);
        }
      }
    }
  }
}
