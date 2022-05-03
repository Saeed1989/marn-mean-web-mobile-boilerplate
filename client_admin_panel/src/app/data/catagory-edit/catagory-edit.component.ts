import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Catagory } from '../../core/modles/catagory.model';
import { NumberValidators } from '../../core/validators/number.validator';
import { GenericValidator } from 'src/app/core/validators/generic-validator';

/* NgRx */

@Component({
  selector: 'app-catagory-edit',
  templateUrl: './catagory-edit.component.html',
})
export class CatagoryEditComponent implements OnInit, OnChanges {
  @Input() selectedCatagory: Catagory;
  @Input() hasEditPermission = false;

  pageTitle = 'Catagory Edit';
  errorMessage = '';
  catagoryForm: FormGroup;

  @Output() create = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Catagory>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or catagorybase.
    this.validationMessages = {
      catName: {
        required: 'Catagory catName is required.',
        minlength: 'Catagory catName must be at least three characters.',
        maxlength: 'Catagory catName cannot exceed 50 characters.',
      },
      catagory: {
        required: 'Catagory code is required.',
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.catagoryForm = this.fb.group({
      catName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      sku: ['', Validators.required],
      description: '',
      parentSku: '',
    });

    // Watch for value changes for validation
    this.catagoryForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.catagoryForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['selectedCatagory'];

    if (change && !change.firstChange) {
      this.displayCatagory(change.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.catagoryForm
    );
  }

  displayCatagory(catagory: Catagory | null): void {
    if (catagory) {
      // Reset the form back to pristine
      this.catagoryForm.reset();

      // Display the appropriate page title
      if (catagory.id === '0') {
        this.pageTitle = 'Add Catagory';
      } else {
        this.pageTitle = `Edit Catagory: ${catagory.catName}`;
      }

      // Update the catagory on the form
      this.catagoryForm.patchValue({
        catName: catagory.catName,
        sku: catagory.sku,
        description: catagory.description,
        parentSku: catagory.parentSku,
      });
    }
  }

  cancelEdit(catagory: Catagory): void {
    // Redisplay the currently selected catagory
    // replacing any edits made
    this.displayCatagory(catagory);
  }

  deleteCatagory(catagory: Catagory): void {
    this.delete.emit(catagory);
  }

  saveCatagory(originalCatagory: Catagory): void {
    if (this.catagoryForm.valid) {
      if (this.catagoryForm.dirty) {
        // Copy over all of the original catagory properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const catagory = { ...originalCatagory, ...this.catagoryForm.value };

        if (catagory.id === '0') {
          this.create.emit(catagory);
        } else {
          this.update.emit(catagory);
        }
      }
    }
  }
}
