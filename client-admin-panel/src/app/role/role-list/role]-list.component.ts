import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Role';

  @Input() errorMessage: string;
  
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
