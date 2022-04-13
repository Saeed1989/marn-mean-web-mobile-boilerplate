import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
})
export class RoleEditComponent implements OnInit, AfterViewInit {
  pageTitle = 'Role Edit';
  errorMessage = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
