import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getCurrentLoading } from 'src/app/state/loading.reducer';
import { LoadingIndicatorComponent } from '../shared/components/organisms/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  // Wires up BlockUI instance
  blockTemplate: LoadingIndicatorComponent;

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.store.select(getCurrentLoading).subscribe((val) => {
      if (val) {
       // this.blockUI.start();
      } else {
        //this.blockUI.stop();
      }
    });
  }
}
