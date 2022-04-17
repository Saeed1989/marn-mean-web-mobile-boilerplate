import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
})
export class EditCard implements OnInit {

  @Input() title: string = '';
  @Input() errorMessage: string = '';

  constructor() {}

  ngOnInit() {}

}
