import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) { }

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
    return this.bookings.pipe(take(1), tap(bookings => {
      this._bookings.next(bookings.concat(newBooking));
    }))
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(take(1), tap(bookings => {
      this._bookings.next(bookings.filter(b => b.id !== bookingId));
    }))
  }
}
