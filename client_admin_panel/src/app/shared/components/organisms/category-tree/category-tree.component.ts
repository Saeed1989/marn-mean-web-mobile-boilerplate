import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
})
export class CategoryTreeComponent implements OnInit {

  @Input() catListStructure = [];
  @Input() hasAdd: boolean = false;
  @Output() select = new EventEmitter<any>();
  @Output() add = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSelect(item){
    this.select.emit(item);
  }

  onAdd(item) {
    this.add.emit(item);
  }
}
