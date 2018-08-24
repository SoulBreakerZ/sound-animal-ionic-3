import { DetailAnimalPage } from './../detail-animal/detail-animal';
import { Animal } from './../../interfaces/animal.interface';
import { Component } from '@angular/core';
import { ANIMALS } from '../../data/data.animals';
import { NavController,NavParams, Refresher,reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animals:Animal[] =[];
  private audio = new Audio();
  private timeAudio:any;
  public ordering = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.animals = ANIMALS.slice(0);
  }

  public playSound (animal:Animal){
    this.pauseSound(animal);

    if (animal.isPlaying){
      animal.isPlaying = false;
      return;
    }

    console.log(animal);
    this.audio = new Audio();
    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.isPlaying = true;

    this.timeAudio= setTimeout(() => animal.isPlaying = false , animal.duration * 1000);
  }
  
  private pauseSound(animalSel:Animal){
    clearTimeout(this.timeAudio);
    this.audio.pause();
    this.audio.currentTime = 0;

    this.animals.forEach(animal => {
      if (animal.id != animalSel.id)
        animal.isPlaying = false;
    });
  }

  public animalDelete(animalId:Number){
    this.animals = this.animals.filter(item => item.id !== animalId);
  }

  public doRefreshAnimals(refresher:Refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.animals = ANIMALS.slice(0);
      refresher.complete();
    }, 2000);
  }

  public reorderAnimals(index:any){
    console.log(index);
    this.animals = reorderArray(this.animals, index);
  }

  public animalInfo(animal:any){
    console.log(animal);
    this.navCtrl.push(DetailAnimalPage,{'animal':animal});
  }
}
