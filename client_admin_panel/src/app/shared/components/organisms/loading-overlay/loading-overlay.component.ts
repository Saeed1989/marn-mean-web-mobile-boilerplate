/**
 * Loading overlay component
 *
 */

import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
})
export class LoadingOverlayComponent implements OnInit, OnChanges {
  /** flag for loading status */
  @Input() isLoading: boolean;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleScroll(changes.isLoading.currentValue);
  }

  handleScroll(isLoading: boolean) {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }
}
