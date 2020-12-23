import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';
import { take, map, tap, switchMap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlaceLocation } from './location.model';
import { stringify } from 'querystring';

interface PlaceResponceData {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: string;
  avaliableFrom: string;
  avaliableTo: string;
  location: PlaceLocation;
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
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{[key: string]: PlaceResponceData}>(environment.firebase + 'offered-places.json' + `?auth=${token}`);
      }),
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
              resData[key].userId,
              resData[key].location
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
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<PlaceResponceData>(environment.firebase + 'offered-places/' + id + '.json' + `?auth=${token}`);
      }),
      map(placeData => {
        return new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.imageUrl,
          placeData.price,
          new Date(placeData.avaliableFrom),
          new Date(placeData.avaliableTo),
          placeData.userId,
          placeData.location
        )
      })
    );
  }

  uploadImage(image: File) {
    console.log(image);
    const uploadData = new FormData();
    uploadData.append('image', image);
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.post<{imageUrl: string, imagePath: string}>(environment.firebase_cloud_function, uploadData, {headers: {Authorization: `Bearer ${token}`}});
      })
    )
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    imageUrl: string
  ) {
    let generatedId: string;
    let newPlace: Place;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error("Found no user!");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newPlace = new Place(
          Math.random().toString(),
          title,
          description,
          imageUrl,
          price,
          dateFrom,
          dateTo,
          fetchedUserId,
          location
        );
        return this.http.post<{name: string}>(environment.firebase + 'offered-places.json' + `?auth=${token}`, { ...newPlace, id: null })
      }),
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

  updatePlace(placeId: string, title: string, description: string, imageUrl: string, price: number, dateFrom: Date, dateTo: Date, location: PlaceLocation) {
    let updatedPlaces: Place[];
    let fetchedUserId: string;
    let userToken;
    return this.authService.token.pipe(

      take(1),

      switchMap(token => {
        userToken = token;
        return this.authService.userId
      }),

      take(1),

      switchMap(userId => {
        if (!userId) {
          throw new Error("No user found!");
        }
        fetchedUserId = userId;
        return this.places;
      }),

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
          fetchedUserId,
          location
        );
        return this.http.put(environment.firebase + 'offered-places/' + placeId + '.json' + `?auth=${userToken}`, {...updatedPlaces[updatedPlaceIndex], id: null});
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

