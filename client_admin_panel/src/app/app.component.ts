import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import { getCurrentLoading } from './state/loading.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-admin-panel';

  isLoading: boolean = false;

  constructor(private store: Store<State>) {}

  ngAfterViewInit(): void {
    this.store.select(getCurrentLoading).subscribe((val) => {
      setTimeout(() => {
        this.isLoading = val;
      });
    });
  }
}
