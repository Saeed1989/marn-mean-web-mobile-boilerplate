import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatagoryUtil } from 'src/app/core/utils/cat.util';

@Component({
  selector: 'app-catagory-view',
  templateUrl: './catagory-view.component.html',
})
export class CatagoryViewComponent implements OnInit {

  @Input() data: any;
  @Output() select = new EventEmitter<string>();



  constructor() {}

  ngOnInit() {}

  onSelect(item){
    console.log(item);
    this.select.emit(item);
  }


}
