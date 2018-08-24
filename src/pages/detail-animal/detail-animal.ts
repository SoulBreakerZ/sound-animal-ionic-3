import { Animal } from './../../interfaces/animal.interface';
import { Component } from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';

@Component({
  selector: 'page-detail-animal',
  templateUrl: 'detail-animal.html',
})
export class DetailAnimalPage {


  public animal:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.animal = this.navParams.get('animal');
    console.log(this.animal);
  }

}
