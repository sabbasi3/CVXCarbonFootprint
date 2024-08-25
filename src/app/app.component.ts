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
  selectedMake: string = '';

  constructor(private _searchSrv: SearchService) {}

  ngOnInit() {
    this.clearAllArrays();
    this.fetchAllMakes();
    this.makes.push('Honda', 'Toyota', 'Tesla');
  }

  fetchAllMakes() {
    //to be implemented
    this._searchSrv.getMakes().subscribe({
      next: (response: makeModel) => {
        // something here
        this.makes = response.data.map((currMake) => currMake.make);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  onMakeSelect(event: any) {
    //to be implemented
    this.clearAllArrays();
    this.selectedMake = event;
    this.getAllModels(this.selectedMake);
  }

  getAllModels(make: string) {
    //to be implemented
    this._searchSrv.getModels(make).subscribe({
      next: (response: modelModel) => {
        // something here
        this.models = response.data.map((currModel) => currModel.model);

        this.models = this.models.slice(0, 10);

        this.models.forEach(async (model) => {
          await this.getEmissions(model);
          this.getPhotos(make, model);
        });
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  async getEmissions(model: string) {
    //to be implemented
    let make = this.selectedMake;
    this._searchSrv.getEmissions(make, model).subscribe({
      next: (response: emissionModel) => {
        // something here
        this.emissions.push(response.data);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  getPhotos(make: string, model: string) {
    // to be implemented
    // imp note: the duckduckgo api has a limit of 1 call per sec
    // so we need to take care of that too
    timer(1500).subscribe(() => {
      this._searchSrv.getPhotos(make + '' + model).subscribe({
        next: (response: photosModel) => {
          // something here
          this.photos.push(response.results[0].image);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  clearAllArrays() {
    this.models = [];
    this.emissions = [];
    this.photos = [];
    this.selectedMake = '';
  }
}
