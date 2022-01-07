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
import { Data } from '../../core/modles/data.model';
import { NumberValidators } from '../../core/validators/number.validator';
import { GenericValidator } from 'src/app/core/validators/generic-validator';

/* NgRx */

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
})
export class DataEditComponent implements OnInit, OnChanges {
  pageTitle = 'Data Edit';
  errorMessage = '';
  dataForm: FormGroup;
  @Input() selectedData: Data;

  @Output() create = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Data>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      dataName: {
        required: 'Data name is required.',
        minlength: 'Data name must be at least three characters.',
        maxlength: 'Data name cannot exceed 50 characters.',
      },
      jerseyNumber: {
        required: 'Data code is required.',
      },
      starRating: {
        range: 'Rate the data between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.dataForm = this.fb.group({
      dataName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      jerseyNumber: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 10)],
      description: '',
    });

    // Watch for value changes for validation
    this.dataForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.dataForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['selectedData'];

    if (change && !change.firstChange) {
      this.displayData(change.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.dataForm
    );
  }

  displayData(data: Data | null): void {
    if (data) {
      // Reset the form back to pristine
      this.dataForm.reset();

      // Display the appropriate page title
      if (data.id === 0) {
        this.pageTitle = 'Add Data';
      } else {
        this.pageTitle = `Edit Data: ${data.dataName}`;
      }

      // Update the data on the form
      this.dataForm.patchValue({
        dataName: data.dataName,
        jerseyNumber: data.jerseyNumber,
        starRating: data.starRating,
        description: data.description,
      });
    }
  }

  cancelEdit(data: Data): void {
    // Redisplay the currently selected data
    // replacing any edits made
    this.displayData(data);
  }

  deleteData(data: Data): void {
    this.delete.emit(data);
  }

  saveData(originalData: Data): void {
    if (this.dataForm.valid) {
      if (this.dataForm.dirty) {
        // Copy over all of the original data properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const data = { ...originalData, ...this.dataForm.value };

        if (data.id === 0) {
          this.create.emit(data);
        } else {
          this.update.emit(data);
        }
      }
    }
  }
}
