import { Injectable } from "@angular/core";
import { Store } from "../../../../store";
import { AngularFireAuth } from "@angular/fire/auth";
import { tap, map, first } from "rxjs/operators";
import { auth } from "firebase/app";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  current_user: User;
  auth$ = this.af.authState.pipe(
    tap((next) => {
      if (!next) {
        this.store.set("user", null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
      };
      this.current_user = user;
      this.store.set("user", user);
    })
  );
  constructor(private store: Store, private af: AngularFireAuth) {}

  get authState() {
    return this.af.authState;
  }

  get user() {
    return this.current_user;
  }

  createUser(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.signOut();
  }
}
