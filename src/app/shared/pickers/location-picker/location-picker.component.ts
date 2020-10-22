import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PlaceLocation, Coordinates } from 'src/app/places/location.model';
import { environment } from 'src/environments/environment';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { Plugins, Capacitor } from "@capacitor/core";

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPick = new EventEmitter<PlaceLocation>();
  @Input() showPreview = false;
  selectedLocationImage: string = null;
  isLoading = false;

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  async onPickLocation() {
    this.isLoading = true;
    const actionSheet = await this.actionSheetController.create({
      header: 'Please choose',
      buttons: [
        { text: 'Auto-Locate', handler: () => { this.locateUser(); } },
        { text: 'Pick on Map', handler: () => { this.openMap(); } },
        { text: 'Cancel', role: 'cancel', handler: () => { this.isLoading = false; } }
      ]
    });
    await actionSheet.present();
  }

  private locateUser() {
    if(!Capacitor.isPluginAvailable('Geolocation')) {
      this.showLocationErrorAlert();
      return;
    }
    Plugins.Geolocation
      .getCurrentPosition()
      .then(geoPosition => {
        const coordinates: Coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude
        };
        this.createPlace(coordinates.lat, coordinates.lng);
      })
      .catch(err => {
        this.isLoading = false;
        this.showLocationErrorAlert();
      });
  }

  private async showLocationErrorAlert() {
    const locationAlert = await this.alertController.create({
      header: 'Could not fetch location',
      message: 'Please use the map to pick location!',
      buttons: ['OK'] 
    });

    await locationAlert.present();
  }

  private createPlace(lat: number, lng: number) {
    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null
    };

    this.getAdress(lat, lng)
      .pipe(
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

  private async openMap() {
    const modalEl = await this.modalController.create({ component: MapModalComponent });
    await modalEl.present();
    const { data } = await modalEl.onDidDismiss();
    if (!data) {
      this.isLoading = false;
      return;
    }
    const coordinates: Coordinates = {
      lat: data.lat,
      lng: data.lng
    };
    this.createPlace(coordinates.lat, coordinates.lng);
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
