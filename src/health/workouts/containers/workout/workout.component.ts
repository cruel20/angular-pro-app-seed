import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Workout,
  WorkoutsService,
} from "../../../shared/services/workouts/workouts.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable, Subscription, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "workout",
  styleUrls: ["workout.component.scss"],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/assets/img/workout.svg" />
          <span *ngIf="workout$ | async as workout; else title">
            {{ workout.name ? "Edit" : "Create" }} Workout
          </span>
          <ng-template #title>
            {{ workout$ | async }}
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
        >
        </workout-form>
        <ng-template #loading>
          <div class="message">
            <img src="/assets/img/loading.svg" />
            Fetching workout...
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<any>;
  subscription: Subscription;

  constructor(
    private workoutService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async addWorkout(event: Workout) {
    await this.workoutService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(["workouts"]);
  }
  ngOnInit() {
    this.subscription = this.workoutService.workouts$.subscribe();

    this.workout$ = this.route.params.pipe(
      switchMap((param) => {
        return this.workoutService.getWorkout(param.id);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
