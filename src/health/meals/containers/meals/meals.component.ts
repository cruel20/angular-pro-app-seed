import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  MealsService,
  Meal,
} from "../../../shared/services/meals/meals.service";
import { Observable, Subscription } from "rxjs";
import { Store } from "../../../../store";

@Component({
  selector: "meals",
  styleUrls: ["meals.component.scss"],
  template: `
    <div>
      Mealssss
      {{ meals$ | async | json }}
    </div>
  `,
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(private store: Store, private mealsService: MealsService) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>("meals");
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}