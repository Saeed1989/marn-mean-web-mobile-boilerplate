import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { CategoryUtil } from 'src/app/core/utils/cat.util';
import { Category } from '../../core/modles/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input() hasAdd: boolean = false;
  @Input() catList: Category[];
  @Output() categorySelect = new EventEmitter<Category>();
  @Output() add = new EventEmitter<string>();

  catListStructure = [];

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes.catList) {
      this.catListStructure = CategoryUtil.getCatListStructure(this.catList);
    }
  }

  onSelectCategory(Category: Category): void {
    this.categorySelect.emit(Category);
  }

  onAdd(item): void {
    this.add.emit(item);
  }
}
