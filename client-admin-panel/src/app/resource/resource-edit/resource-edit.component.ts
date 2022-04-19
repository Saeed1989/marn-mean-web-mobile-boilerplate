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
import { Resource } from 'src/app/core/modles/resource.model';
import { GenericValidator } from 'src/app/core/validators/generic-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent implements OnInit {

  pageTitle = 'Resource Edit';
  errorMessage = '';
  resourceForm: FormGroup;
  @Input() selectedResource: Resource;

  @Output() create = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Resource>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or resourcebase.
    this.validationMessages = {
      roleName: {
        required: 'Resource roleName is required.',
        minlength: 'Resource roleName must be at least three characters.',
        maxlength: 'Resource roleName cannot exceed 50 characters.',
      },
      resourceName: {
        required: 'Resource code is required.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.resourceForm = this.fb.group({
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
    this.resourceForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.resourceForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['selectedResource'];

    if (change && !change.firstChange) {
      this.displayResource(change.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.resourceForm
    );
  }

  displayResource(resource: Resource | null): void {
    if (resource) {
      // Reset the form back to pristine
      this.resourceForm.reset();

      // Display the appropriate page title
      if (resource.id === '0') {
        this.pageTitle = 'Add Resource';
      } else {
        this.pageTitle = `Edit Resource: ${resource.name} - ${resource.type}`;
      }

      // Update the resource on the form
      this.resourceForm.patchValue({
        name: resource.name,
        type: resource.type,
      });
    }
  }

  cancelEdit(resource: Resource): void {
    // Redisplay the currently selected resource
    // replacing any edits made
    this.displayResource(resource);
  }

  deleteResource(resource: Resource): void {
    this.delete.emit(resource);
  }

  saveResource(originalResource: Resource): void {
    if (this.resourceForm.valid) {
      if (this.resourceForm.dirty) {
        // Copy over all of the original resource properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const resource = {
          ...originalResource,
          ...this.resourceForm.value,
        };

        if (resource.id === '0') {
          this.create.emit(resource);
        } else {
          this.update.emit(resource);
        }
      }
    }
  }
}
