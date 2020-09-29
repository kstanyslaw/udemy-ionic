import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map, tap, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New Yourk City',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      149.99,
      new Date(),
      new Date('2021-09-01'),
      'abc'
    ),
    new Place(
      'p2',
      'L\'Amour Toujours',
      'A Romantic place in Paris',
      'https://miro.medium.com/max/4096/1*t-nXIcaD3oP6CS4ydXV1xw.jpeg',
      189.99,
      new Date(),
      new Date('2021-09-01'),
      'abc'
    ),
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://i.pinimg.com/originals/65/8f/77/658f77b9b527f89922ba996560a3e2b0.jpg',
      99.99,
      new Date(),
      new Date('2021-09-01'),
      'abc'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === id)};
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://www.visittirol.ru/images/hft6wwpj6ga-/f6dbf422437a38c29c9813d471bd05de.jpeg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.places.pipe(take(1), delay(1000), tap(places => {
        this._places.next(places.concat(newPlace));
    }));
  }

  updatePlace(placeId: string, title: string, description: string, imageUrl: string, price: number, dateFrom: Date, dateTo: Date) {
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      updatedPlaces[updatedPlaceIndex] = new Place(
        placeId,
        title,
        description,
        imageUrl,
        price,
        dateFrom,
        dateTo,
        this.authService.userId
      );
      this._places.next(updatedPlaces);
    }));
  }
}
