import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "schedule-days",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["schedule-days.component.scss"],
  template: `
    <div class="days">
      <button
        type="button"
        class="day"
        *ngFor="let day of days; index as i"
        (click)="selectDay(i)"
      >
        <span [class.active]="i === selected">
          {{ day }}
        </span>
      </button>
    </div>
  `,
})
export class ScheduleDaysComponent {
  days = ["P", "W", "Ś", "C", "P", "S", "N"];

  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>();

  constructor() {}

  selectDay(index: number) {
    this.select.emit(index);
  }
}
