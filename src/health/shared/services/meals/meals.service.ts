import { Injectable } from "@angular/core";
import { Store } from "../../../../store";
import { AngularFireDatabase } from "@angular/fire/database";
import {
  AuthService,
  User,
} from "../../../../auth/shared/services/auth/auth.service";
import { Observable, of, empty } from "rxjs";
import { tap, map } from "rxjs/operators";

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
  key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db
    .list<Meal>(`meals/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map((next) => {
        let meals: Meal[] = next.map((action) => {
          return {
            key: action.key,
            ...action.payload.val(),
          };
        });
        this.store.set("meals", meals);
        return meals;
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

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  getMeal(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select<Meal[]>("meals").pipe(
      map((meals) => {
        if (meals === undefined) {
          return undefined;
        }
        meals.filter(Boolean);
        return meals.find((meal: Meal) => meal.key === key);
      })
    );
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }

  updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }
}
