import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-catagory-tree',
  templateUrl: './catagory-tree.component.html',
})
export class CatagoryTreeComponent implements OnInit {

  @Input() catListStructure = [];
  @Output() select = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onSelect(item){
    console.log(item.catHierarchy);
    this.select.emit(item.catHierarchy);
  }
}
