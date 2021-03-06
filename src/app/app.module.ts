import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { JourneysPage } from "../pages/journeys/journeys";
import { ProfilPage } from "../pages/profil/profil";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from "angularfire2";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AngularFireAuth , AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "../services/auth.service";
import { GooglePlus } from "@ionic-native/google-plus";
import {FirestoreService} from "../services/firestore.service";
import {JourneyPage} from "../pages/journey/journey";
import { Camera } from "@ionic-native/camera";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {DetailJourneyPage} from "../pages/detail-journey/detail-journey";

@NgModule({
  declarations: [
    MyApp,
    JourneysPage,
    ProfilPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    JourneyPage,
    DetailJourneyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    JourneysPage,
    ProfilPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    JourneyPage,
    DetailJourneyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    FirestoreService,
    AngularFireAuth,
    GooglePlus,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
