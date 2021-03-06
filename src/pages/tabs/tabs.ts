import { Component } from '@angular/core';

import { JourneysPage } from '../journeys/journeys';
import { ProfilPage } from '../profil/profil';
import { HomePage } from '../home/home';
import { AuthService } from "../../services/auth.service";
import {User, USER_PATH} from "../../models/user";
import {AlertController, NavController} from "ionic-angular";
import {FirestoreService} from "../../services/firestore.service";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  static user = {} as User;
  static userId: string;

  tab1Root = HomePage;
  tab2Root = JourneysPage;
  tab3Root = ProfilPage;

  constructor(private auth: AuthService, public navCtrl: NavController, private firebase: FirestoreService, private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    TabsPage.userId = this.auth.uid;
    this.loadProfile();
  }

  get authenticated(): boolean {
    return this.auth.authenticated;
  }

  private loadProfile() {
    this.firebase.getDocument(USER_PATH, this.auth.uid)
      .then((result) => {
        if (result == null) {
          this.navCtrl.setRoot(ProfilPage, { isInitProfile: true });
        } else {
          TabsPage.user = result;
        }
      })
      .catch(() => {
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          message: 'Impossible de charge le profile de l\'utilisateur.',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
