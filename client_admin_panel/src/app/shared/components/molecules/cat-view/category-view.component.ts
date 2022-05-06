import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryUtil } from 'src/app/core/utils/cat.util';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
})
export class CategoryViewComponent implements OnInit {

  @Input() hasAdd: boolean = false;
  @Input() data: any;
  @Output() select = new EventEmitter<string>();
  @Output() add = new EventEmitter<string>();



  constructor() {}

  ngOnInit() {}

  onSelect(item){
    console.log(item);
    this.select.emit(item);
  }

  onAdd(item) {
    this.add.emit(item);
  }
}
