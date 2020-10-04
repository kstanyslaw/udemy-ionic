import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  isLoading = false;
  bookingSub: Subscription;

  constructor(private bookingService: BookingService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    });
  }

  async onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    const loading = await this.loadingController.create({
      message: 'Cancelling...'
    });
    await loading.present();
    this.bookingService.cancelBooking(bookingId).subscribe(async () => {
      await loading.dismiss();
    });
  }

  ngOnDestroy() {
    this.bookingSub.unsubscribe();
  }

}
