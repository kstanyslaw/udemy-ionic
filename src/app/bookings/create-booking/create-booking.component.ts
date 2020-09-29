import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { from, range } from 'rxjs';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: true }) form: NgForm;
  startDate: string;
  endDate: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const avaliableFrom = new Date(this.selectedPlace.avaliableFrom);
    const avaliableTo = new Date(this.selectedPlace.avaliableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(avaliableFrom.getTime() + Math.random() * (avaliableTo.getTime() - 7*24*60*60*1000 - avaliableFrom.getTime())).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * 6*24*60*60*1000).toISOString();
    }
  }

  onBookPlace() {
    if (this.form.invalid || !this.datesValid()) {
      return;
    }
    this.modalController.dismiss({
      bookingData: {
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        guestNumber: +this.form.value['guest-number'],
        startDate: new Date(this.form.value['date-from']),
        endDate: new Date(this.form.value['date-to'])
      }
    }, 'confirm');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}
