import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  editedOffer: Place;
  form: FormGroup;

  constructor(private placesService: PlacesService, private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack(['/', 'places', 'tabs', 'offers']);
        return;
      }
      this.editedOffer = this.placesService.getPlace(paramMap.get('placeId'));

      this.form = new FormGroup({
        title: new FormControl(this.editedOffer.title, {updateOn: 'blur', validators: [Validators.required]}),
        description: new FormControl(this.editedOffer.description, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(180)]})
      })
    })
  }

  onUpdateOffer() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form);
  }
}
