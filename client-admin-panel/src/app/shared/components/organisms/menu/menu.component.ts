import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  @Input() userName = '';

  @Output() logOut = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onLogOut(): void {
    this.logOut.emit();
  }
}
