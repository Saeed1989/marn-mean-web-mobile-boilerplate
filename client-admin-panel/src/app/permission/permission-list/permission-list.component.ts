import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Permission';

  @Input() errorMessage: string;
  
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
