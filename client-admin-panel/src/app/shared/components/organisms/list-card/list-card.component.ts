import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
})
export class ListCard implements OnInit {

  @Input() catListStructure = [];
  @Input() showList: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() title: string = '';
  @Input() errorMessage: string = '';


  constructor() {}

  ngOnInit() {}


}
