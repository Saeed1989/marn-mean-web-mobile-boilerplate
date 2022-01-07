import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Data } from '../../core/modles/data.model';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataListComponent {
  pageTitle = 'Data';

  @Input() errorMessage: string;
  @Input() dataList: Data[];
  @Input() displayCode: boolean;
  @Input() selectedData: Data;
  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initializeNewData = new EventEmitter<void>();
  @Output() dataSelect = new EventEmitter<Data>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newData(): void {
    this.initializeNewData.emit();
  }

  onDataSelected(data: Data): void {
    this.dataSelect.emit(data);
  }
}
