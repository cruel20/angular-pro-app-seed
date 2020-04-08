import { Injectable } from "@angular/core";
import { Store } from "../../../../store";
import { AngularFireDatabase } from "@angular/fire/database";
import {
  AuthService,
  User,
} from "../../../../auth/shared/services/auth/auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export interface Meal {
  name: String;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {
  // meals$: Observable<Meal[]> = this.db
  //   .list<Meal>(`meals/${this.uid()}`)
  //   .valueChanges()
  //   .pipe(tap((next) => this.store.set("meals", next)));
  meals$: Observable<Meal[]>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.meals$ = this.db
      .list<Meal>(`meals/${this.uid}`)
      .valueChanges()
      .pipe(tap((next) => this.store.set("meals", next)));
  }
  get uid() {
    console.log(this.authService.user.uid);
    return this.authService.user.uid;
  }
}
