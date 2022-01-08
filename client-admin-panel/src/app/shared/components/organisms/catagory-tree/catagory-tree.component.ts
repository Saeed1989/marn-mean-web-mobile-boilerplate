import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-catagory-tree',
  templateUrl: './catagory-tree.component.html',
})
export class CatagoryTreeComponent implements OnInit {

  @Output() select = new EventEmitter<any>();

  testJson = [
    {
      name: 'Main Cat 1',
      sku: 'maincat001',
      catHierarchy: 'maincat001',
      sub: [
        {
          name: 'sub cat 1',
          sku: "subcat1",
          catHierarchy: '/maincat001/subcat1',
          sub: null,
        },
      ],
    },
    {
      name: 'Main Cat 3',
      sku: "maincat003",
      catHierarchy: '/maincat003',
      sub: null
    },
  ];

  constructor() {}

  ngOnInit() {}

  onSelect(item){
    console.log(item.catHierarchy);
    this.select.emit(item.catHierarchy);
  }
}
