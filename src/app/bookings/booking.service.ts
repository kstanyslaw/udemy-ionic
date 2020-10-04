import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

interface BookingResponceData {
  placeId: string,
  userId: string,
  placeTitle: string,
  placeImage: string,
  guestNumber: number,
  firstName: string,
  lastName: string,
  bookedFrom: string,
  bookedTo: string
}


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get bookings(): Observable<Booking[]> {
    return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastMane: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      guestNumber,
      firstName,
      lastMane,
      dateFrom,
      dateTo
    );
    return this.http
      .post<{name: string}>(environment.firebase + 'bookings.json', {...newBooking, id: null})
      .pipe(
        switchMap(resData => {
          newBooking.id = resData.name;
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          return this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string) {
    return this.http
      .delete(environment.firebase + 'bookings/' + `${bookingId}.json`)
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          return this._bookings.next(bookings.filter(b => b.id !== bookingId));
        })
      );
  }

  fetchBookings() {
    return this.http
    .get<BookingResponceData>(environment.firebase + `bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
    .pipe(
      map(bookingData => {
        const bookings = [];
        for (const key in bookingData) {
          if (bookingData.hasOwnProperty(key)) {
            bookings.push(new Booking(
              key,
              bookingData[key].placeId,
              bookingData[key].userId,
              bookingData[key].placeTitle,
              bookingData[key].placeImage,
              bookingData[key].guestNumber,
              bookingData[key].firstName,
              bookingData[key].lastName,
              new Date(bookingData[key].bookedFrom),
              new Date(bookingData[key].bookedTo)
            ))
          }
        }
        return bookings;
      }),
      tap(bookings => {
        return this._bookings.next(bookings);
      })
    );
  }
}
