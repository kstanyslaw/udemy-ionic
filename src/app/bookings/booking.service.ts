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
    let generatedId: string;
    let newBooking: Booking;
    let fetchedUserId: string;
    return this.authService.userId
      .pipe(
        take(1),

        switchMap(userId => {
          if (!userId) {
            throw new Error('No user ID found!');
          }
          fetchedUserId = userId;
          return this.authService.token;
        }),

        take(1),

        switchMap(token => {
          newBooking = new Booking(
            Math.random().toString(),
            placeId,
            fetchedUserId,
            placeTitle,
            placeImage,
            guestNumber,
            firstName,
            lastMane,
            dateFrom,
            dateTo
          );
          return this.http.post<{name: string}>(environment.firebase + 'bookings.json' + `?auth=${token}`, {...newBooking, id: null})
        }),

        switchMap(resData => {
          generatedId = resData.name;
          return this.bookings;
        }),

        take(1),

        tap(bookings => {
          return this._bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(bookingId: string) {
    return this.authService.token.pipe(
      take(1),

      switchMap(token => {
        return this.http.delete(environment.firebase + 'bookings/' + `${bookingId}.json` + `?auth=${token}`);
      }),

      take(1),

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
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),

      switchMap(userId => {
        if (!userId) {
          throw new Error("No user found!");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),

      take(1),

      switchMap(token => {
        return this.http.get<BookingResponceData>(environment.firebase + `bookings.json?orderBy="userId"&equalTo="${fetchedUserId}"` + `&auth=${token}`);
      }),

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
