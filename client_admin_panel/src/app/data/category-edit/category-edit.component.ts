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
import { Category } from '../../core/modles/category.model';
import { NumberValidators } from '../../core/validators/number.validator';
import { GenericValidator } from 'src/app/core/validators/generic-validator';

/* NgRx */

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
})
export class CategoryEditComponent implements OnInit, OnChanges {
  @Input() selectedCategory: Category;
  @Input() hasEditPermission = false;

  pageTitle = 'Category Edit';
  errorMessage = '';
  categoryForm: FormGroup;

  @Output() create = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Category>();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or categorybase.
    this.validationMessages = {
      catName: {
        required: 'Category catName is required.',
        minlength: 'Category catName must be at least three characters.',
        maxlength: 'Category catName cannot exceed 50 characters.',
      },
      category: {
        required: 'Category code is required.',
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.categoryForm = this.fb.group({
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
    this.categoryForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.categoryForm
        ))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['selectedCategory'];

    if (change && !change.firstChange) {
      this.displayCategory(change.currentValue);
    }
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.categoryForm
    );
  }

  displayCategory(category: Category | null): void {
    if (category) {
      // Reset the form back to pristine
      this.categoryForm.reset();

      // Display the appropriate page title
      if (category.id === '0') {
        this.pageTitle = 'Add Category';
      } else {
        this.pageTitle = `Edit Category: ${category.catName}`;
      }

      // Update the category on the form
      this.categoryForm.patchValue({
        catName: category.catName,
        sku: category.sku,
        description: category.description,
        parentSku: category.parentSku,
      });
    }
  }

  cancelEdit(category: Category): void {
    // Redisplay the currently selected category
    // replacing any edits made
    this.displayCategory(category);
  }

  deleteCategory(category: Category): void {
    this.delete.emit(category);
  }

  saveCategory(originalCategory: Category): void {
    if (this.categoryForm.valid) {
      if (this.categoryForm.dirty) {
        // Copy over all of the original category properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const category = { ...originalCategory, ...this.categoryForm.value };

        if (category.id === '0') {
          this.create.emit(category);
        } else {
          this.update.emit(category);
        }
      }
    }
  }
}
