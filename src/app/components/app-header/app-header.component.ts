import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { User } from "../../../auth/shared/services/auth/auth.service";

@Component({
  selector: "app-header",
  styleUrls: ["app-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="assets/img/logo.svg" />
        <div class="app-header__user-info" *ngIf="user?.authenticated">
          <span (click)="logoutUser()"> </span>
        </div>
      </div>
    </div>
  `,
})
export class AppHeaderComponent {
  @Output()
  logout = new EventEmitter<any>();

  @Input()
  user: User;

  constructor() {}

  logoutUser() {
    this.logout.emit();
  }
}
