import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'src/app/core/modles/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
  readonly TITLE = 'Alerts';

  @Input() alerts: Alert[];
  @Input() errorMessage: string;

  constructor() {}

  ngOnInit() {}
}
