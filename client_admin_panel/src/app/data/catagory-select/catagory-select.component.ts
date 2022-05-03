import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { CatagoryUtil } from 'src/app/core/utils/cat.util';
import { Catagory } from '../../core/modles/catagory.model';

@Component({
  selector: 'app-catagory-list',
  templateUrl: './catagory-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatagoryListComponent {
  @Input() catList: Catagory[];
  @Output() catagorySelect = new EventEmitter<Catagory>();

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
      this.catListStructure = CatagoryUtil.getCatListStructure(this.catList);
    }
  }

  onSelectCatagory(Catagory: Catagory): void {
    this.catagorySelect.emit(Catagory);
  }
}
