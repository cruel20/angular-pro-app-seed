import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

// shared modules
import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: "auth",
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      {
        path: "login",
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./register/register.module").then((m) => m.RegisterModule),
      },
    ],
  },
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCmiOTCfXBgAEg2vKcNvJFTpFbteUCe6cA",
  authDomain: "fitness-app-2c089.firebaseapp.com",
  databaseURL: "https://fitness-app-2c089.firebaseio.com",
  projectId: "fitness-app-2c089",
  storageBucket: "fitness-app-2c089.appspot.com",
  messagingSenderId: "628873253552",
  appId: "1:628873253552:web:983afdf96c0236ea08e175",
  measurementId: "G-QXN4RFYR6R",
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
})
export class AuthModule {}
