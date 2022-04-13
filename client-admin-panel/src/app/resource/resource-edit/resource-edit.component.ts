import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
})
export class ResourceEditComponent implements OnInit, AfterViewInit {

  pageTitle = 'Resource Edit';
  errorMessage = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
