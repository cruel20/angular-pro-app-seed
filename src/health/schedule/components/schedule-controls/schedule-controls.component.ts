import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "schedule-controls",
  styleUrls: ["schedule-controls.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="controls">
      <button type="button" (click)="moveDate(offset - 1)">
        <img src="assets/img/chevron-left.svg" />
      </button>
      <p>{{ selected | date: "longDate" }}</p>
      <button type="button" (click)="moveDate(offset + 1)">
        <img src="assets/img/chevron-right.svg" />
      </button>
    </div>
  `,
})
export class ScheduleControlsComponent {
  offset: number = 0;

  @Input()
  selected: Date;

  @Output()
  move = new EventEmitter<number>();

  moveDate(number: number) {
    this.offset = number;
    this.move.emit(this.offset);
  }
}
