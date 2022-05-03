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
  @Input() hasAdd: boolean = false;
  @Input() catList: Catagory[];
  @Output() catagorySelect = new EventEmitter<Catagory>();
  @Output() add = new EventEmitter<string>();

  catListStructure = [];

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes.catList) {
      this.catListStructure = CatagoryUtil.getCatListStructure(this.catList);
    }
  }

  onSelectCatagory(Catagory: Catagory): void {
    this.catagorySelect.emit(Catagory);
  }

  onAdd(item): void {
    this.add.emit(item);
  }
}
