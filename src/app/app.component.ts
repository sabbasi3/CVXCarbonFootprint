/*
Original author: Syed Husain
Version: 1.1
*/

import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { makeModel, modelModel } from './models/make.model';
import { photosModel } from './models/photos.model';
import { of, from } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { emissionModel } from './models/emission.model';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'carbon-tracker';
  makes: string[] = [];
  models: string[] = [];
  emissions: any[] = [];
  photos: string[] = [];
  selectedMake: string = "";

  constructor(private _searchSrv: SearchService) { }

  ngOnInit() {
    this.clearAllArrays();
    this.fetchAllMakes();
    this.makes.push("Honda", "Toyota", "Tesla")
  }

  fetchAllMakes() {
    //to be implemented
  }

  onMakeSelect(event: any) {
    //to be implemented
  }

  getAllModels(make: string) {
    //to be implemented
  }


  async getEmissions(model: string) {
    //to be implemented
  }

  getPhotos(make: string, model: string) {
    // to be implemented
    // imp note: the duckduckgo api has a limit of 1 call per sec
    // so we need to take care of that too
  }

  clearAllArrays() {
    this.models = [];
    this.emissions = [];
    this.photos = [];
    this.selectedMake = ""
  }
}
