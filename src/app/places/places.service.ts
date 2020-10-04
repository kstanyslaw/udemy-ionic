import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface PlaceResponceData {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: string;
  avaliableFrom: string;
  avaliableTo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>([ ]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http
      .get<{[key: string]: PlaceResponceData}>(environment.firebase + 'offered-places.json')
      .pipe(
        map(resData => {
          const places = [];
          for (const key in resData) {
            if (Object.prototype.hasOwnProperty.call(resData, key)) {
              places.push(new Place(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].imageUrl,
                resData[key].price,
                new Date(resData[key].avaliableFrom),
                new Date(resData[key].avaliableTo),
                resData[key].userId
              ));
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlace(id: string) {
    // return this.places.pipe(take(1), map(places => {
    //   return {...places.find(p => p.id === id)};
    // }));
    return this.http
      .get<PlaceResponceData>(environment.firebase + 'offered-places/' + id + '.json')
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.avaliableFrom),
            new Date(placeData.avaliableTo),
            placeData.userId
          )
        })
      );
  } 

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    let generatedId = 'string'
    const newPlace = new Place(
      null,
      title,
      description,
      'https://www.visittirol.ru/images/hft6wwpj6ga-/f6dbf422437a38c29c9813d471bd05de.jpeg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.http
      .post<{name: string}>(environment.firebase + 'offered-places.json', { ...newPlace, id: null })
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
    );
  }

  updatePlace(placeId: string, title: string, description: string, imageUrl: string, price: number, dateFrom: Date, dateTo: Date) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),

      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
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
        return this.http.put(environment.firebase + 'offered-places/' + placeId + '.json', {...updatedPlaces[updatedPlaceIndex], id: null});
      }),

      tap(() => {
        this._places.next(updatedPlaces);
      }),
      
    );
  }
}


// new Place(
//   'p1',
//   'Manhattan Mansion',
//   'In the heart of New Yourk City',
//   'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
//   149.99,
//   new Date(),
//   new Date('2021-09-01'),
//   'abc'
// ),
// new Place(
//   'p2',
//   'L\'Amour Toujours',
//   'A Romantic place in Paris',
//   'https://miro.medium.com/max/4096/1*t-nXIcaD3oP6CS4ydXV1xw.jpeg',
//   189.99,
//   new Date(),
//   new Date('2021-09-01'),
//   'abc'
// ),
// new Place(
//   'p3',
//   'The Foggy Palace',
//   'Not your average city trip!',
//   'https://i.pinimg.com/originals/65/8f/77/658f77b9b527f89922ba996560a3e2b0.jpg',
//   99.99,
//   new Date(),
//   new Date('2021-09-01'),
//   'abc'
// ),

