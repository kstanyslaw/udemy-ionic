import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PlaceLocation } from 'src/app/places/location.model';
import { environment } from 'src/environments/environment';
import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string = null;
  isLoading = false;

  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {}

  async onPickLocation() {
    this.isLoading = true;
    const modalEl = await this.modalController.create({ component: MapModalComponent });
    modalEl.present();
    const { data } = await modalEl.onDidDismiss();
    if (!data) {
      this.isLoading = false;
      return;
    }
    const pickedLocation: PlaceLocation = {
      lat: data.lat,
      lng: data.lng,
      address: null,
      staticMapImageUrl: null
    };
    this.getAdress(data.lat, data.lng).pipe(
      switchMap(address => {
        pickedLocation.address = address;
        return of(this.getMapImage(
          pickedLocation.lat,
          pickedLocation.lng,
          14
        ))
      })
    )
      .subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedLocationImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
  }

  private getAdress(lat: number, lng: number) {
    return this.http
      .get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.maps_API_KEY}`)
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:Place%7C${lat},${lng}
    &key=${environment.maps_API_KEY}`
  }
}
