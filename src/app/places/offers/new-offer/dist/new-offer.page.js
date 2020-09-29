"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewOfferPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NewOfferPage = /** @class */ (function () {
    function NewOfferPage(placesService, router, loadingController) {
        this.placesService = placesService;
        this.router = router;
        this.loadingController = loadingController;
    }
    NewOfferPage.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            title: new forms_1.FormControl(null, { updateOn: 'blur', validators: [forms_1.Validators.required] }),
            description: new forms_1.FormControl(null, { updateOn: 'blur', validators: [forms_1.Validators.required, forms_1.Validators.maxLength(180)] }),
            price: new forms_1.FormControl(null, { updateOn: 'blur', validators: [forms_1.Validators.required, forms_1.Validators.min(1)] }),
            dateFrom: new forms_1.FormControl(null, { updateOn: 'blur', validators: [forms_1.Validators.required] }),
            dateTo: new forms_1.FormControl(null, { updateOn: 'blur', validators: [forms_1.Validators.required] })
        });
    };
    NewOfferPage.prototype.onCreateOffer = function () {
        var _this = this;
        if (this.form.invalid) {
            return;
        }
        this.loadingController.create({
            message: 'Creating place...'
        }).then(function (loadingEl) {
            loadingEl.present();
            _this.placesService.addPlace(_this.form.value.title, _this.form.value.description, +_this.form.value.price, new Date(_this.form.value.dateFrom), new Date(_this.form.value.dateTo)).subscribe(function () {
                loadingEl.dismiss();
                _this.form.reset();
                _this.router.navigate(['/', 'places', 'tabs', 'offers']);
            });
        });
    };
    NewOfferPage = __decorate([
        core_1.Component({
            selector: 'app-new-offer',
            templateUrl: './new-offer.page.html',
            styleUrls: ['./new-offer.page.scss']
        })
    ], NewOfferPage);
    return NewOfferPage;
}());
exports.NewOfferPage = NewOfferPage;
