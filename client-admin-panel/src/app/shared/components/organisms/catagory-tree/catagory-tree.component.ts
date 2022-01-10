import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-catagory-tree',
  templateUrl: './catagory-tree.component.html',
})
export class CatagoryTreeComponent implements OnInit {

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
