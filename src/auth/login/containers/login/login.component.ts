import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "login-component",
  template: `
    <auth-form (submitted)="loginUser($event)">
      <h1>Login</h1>
      <a routerLink="/auth/register">Not Registered?</a>
      <button type="submit">Login</button>
      <div class="error" *ngIf="error">{{ error }}</div>
    </auth-form>
  `
})
export class LoginComponent {
  error: string;
  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(["/"]);
    } catch (error) {
      this.error = error.message;
    }
  }
}
