import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import {
  ScheduleService,
  ScheduleItem,
} from "../../../shared/services/schedule/schedule.service";
import {
  Meal,
  MealsService,
} from "../../../shared/services/meals/meals.service";
import { Store } from "src/store";
import {
  Workout,
  WorkoutsService,
} from "src/health/shared/services/workouts/workouts.service";

@Component({
  selector: "schedule",
  styleUrls: ["schedule.component.scss"],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      >
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="cancelAssign()"
      >
      </schedule-assign>
    </div>
  `,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private store: Store,
    private mealService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select("date");
    this.schedule$ = this.store.select("schedule");
    this.selected$ = this.store.select("selected");
    this.list$ = this.store.select("list");

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  cancelAssign() {
    this.open = false;
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.cancelAssign();
  }
}
