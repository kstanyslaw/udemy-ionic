import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings: Booking[] = [
    new Booking('b1', 'p1', 'u1', 'Manhattan Mansion', 10),
    new Booking('b2', 'p2', 'u1', 'L\'Amour Toujours', 10),
  ];

  constructor() { }

  get bookings(): Booking[] {
    return [...this._bookings];
  }
}
