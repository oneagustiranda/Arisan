import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnOtherPage } from '../../app/login/login.page';

anOtherPage: AnOtherPage;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goAnOtherPage() {
    this.navCtrl.setRoot(anOtherPage);
  }

}
