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
  @Input() catList: Category[];
  @Output() categorySelect = new EventEmitter<Category>();

  catListStructure = [
    {
      name: 'Main Cat 1',
      sku: 'maincat001',
      catHierarchy: 'maincat001',
      sub: [
        {
          name: 'sub cat 1',
          sku: 'subcat1',
          catHierarchy: '/maincat001/subcat1',
          sub: null,
        },
      ],
    },
    {
      name: 'Main Cat 3',
      sku: 'maincat003',
      catHierarchy: '/maincat003',
      sub: null,
    },
  ];

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes.catList) {
      this.catListStructure = CategoryUtil.getCatListStructure(this.catList);
    }
  }

  onSelectCategory(Category: Category): void {
    this.categorySelect.emit(Category);
  }
}
