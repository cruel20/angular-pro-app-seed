import { Injectable } from "@angular/core";
import { Store } from "../../../../store";
import { AngularFireDatabase } from "@angular/fire/database";
import {
  AuthService,
  User,
} from "../../../../auth/shared/services/auth/auth.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> = this.db
    .list<Workout>(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map((next) => {
        let workouts: Workout[] = next.map((action) => {
          return {
            key: action.key,
            ...action.payload.val(),
          };
        });
        this.store.set("workouts", workouts);
        return workouts;
      })
    );

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {}
  get uid() {
    return this.authService.user.uid;
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  getWorkout(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select<Workout[]>("workouts").pipe(
      map((workouts) => {
        if (workouts === undefined) {
          return undefined;
        }
        workouts.filter(Boolean);
        return workouts.find((workout: Workout) => workout.key === key);
      })
    );
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }
}
