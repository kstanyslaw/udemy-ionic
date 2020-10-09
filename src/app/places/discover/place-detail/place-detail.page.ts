import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from 'src/app/bookings/booking.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack(['/', 'places', 'tabs', 'discover']);
        this.isLoading = false;
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(
        place => {
          this.place = place;
          this.isBookable = place.userId !== this.authService.userId;
          this.isLoading = false;
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'An error occurred!',
            message: 'Place could not e fethced!',
            buttons: [{text: 'OK', handler: () => {
              this.router.navigate(['/', 'places', 'tabs', 'discover']);
            }}]
          });

          await alert.present();
        }
      );
    })
  }

  onBookPlace() {
    // this.navCtrl.navigateBack(['/', 'places', 'tabs', 'discover']);
    this.actionSheetController.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select')
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });



  }

  async openBookingModal(mode: 'select' | 'random') {

    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(async resultData => {
      if (resultData.role === 'confirm') {
        const loading = await this.loadingController.create({
          message: 'Booking place...'
        });
        await loading.present();
        this.bookingService.addBooking(
          this.place.id,
          this.place.title,
          this.place.imageUrl,
          resultData.data.bookingData.firstName,
          resultData.data.bookingData.lastName,
          resultData.data.bookingData.guestNumber,
          resultData.data.bookingData.startDate,
          resultData.data.bookingData.endDate
        ).subscribe(async () => {
          await loading.dismiss();
          this.router.navigate(['/', 'bookings']);
        })
      }
    });
  }

  async onShowFullMap() {
    const mapModalEl = await this.modalController.create({
      component: MapModalComponent,
      componentProps: {
        center: {...this.place.location},
        selectable: false,
        closeButtonText: 'Close',
        title: this.place.location.address
      }
    });
    await mapModalEl.present();
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe();
  }
}
