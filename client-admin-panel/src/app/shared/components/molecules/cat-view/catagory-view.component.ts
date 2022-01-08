import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catagory-view',
  templateUrl: './catagory-view.component.html',
})
export class CatagoryViewComponent implements OnInit {

  @Input() data: any;

  constructor() {}

  ngOnInit() {}

  select(item){
    console.log(item);
  }


}
