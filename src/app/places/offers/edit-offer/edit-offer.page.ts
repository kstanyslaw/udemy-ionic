import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  editedOffer: Place;
  form: FormGroup;
  private offerSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingController: LoadingController
) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack(['/', 'places', 'tabs', 'offers']);
        return;
      }
      this.offerSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.editedOffer = place;
        this.form = new FormGroup({
          title: new FormControl(this.editedOffer.title, {updateOn: 'blur', validators: [Validators.required]}),
          description: new FormControl(this.editedOffer.description, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(180)]})
        });
      });

    })
  }

  async onUpdateOffer() {
    if (this.form.invalid) {
      return;
    }
    const loadingEl = await this.loadingController.create({
      message: 'Update offer...'
    });
    await loadingEl.present();

    this.placesService.updatePlace(
      this.editedOffer.id,
      this.form.value.title,
      this.form.value.description,
      this.editedOffer.imageUrl,
      this.editedOffer.price,
      this.editedOffer.avaliableFrom,
      this.editedOffer.avaliableTo
    ).subscribe(() => {
      loadingEl.dismiss();
      this.form.reset();
      this.router.navigate(['/', 'places', 'tabs', 'offers']);
    })

  }

  ngOnDestroy() {
    this.offerSub.unsubscribe();
  }
}
