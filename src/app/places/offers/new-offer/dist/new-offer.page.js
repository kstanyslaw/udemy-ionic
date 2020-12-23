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
var operators_1 = require("rxjs/operators");
function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = window.atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}
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
            dateTo: new forms_1.FormControl(null, { updateOn: 'blur', validators: [forms_1.Validators.required] }),
            location: new forms_1.FormControl(null, { validators: forms_1.Validators.required }),
            image: new forms_1.FormControl(null)
        });
    };
    NewOfferPage.prototype.onLocationPicked = function (location) {
        this.form.patchValue({ location: location });
    };
    NewOfferPage.prototype.onImagePicked = function (imageData) {
        var imageFile;
        if (typeof imageData === 'string') {
            try {
                imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
            }
            catch (error) {
                console.log(error);
                return;
            }
        }
        else {
            imageFile = imageData;
        }
        this.form.patchValue({ image: imageFile });
    };
    NewOfferPage.prototype.onCreateOffer = function () {
        var _this = this;
        if (this.form.invalid || !this.form.get('image').value) {
            return;
        }
        this.loadingController.create({
            message: 'Creating place...'
        }).then(function (loadingEl) {
            loadingEl.present();
            _this.placesService.uploadImage(_this.form.get('image').value).pipe(operators_1.switchMap(function (uploadRes) {
                return _this.placesService.addPlace(_this.form.value.title, _this.form.value.description, +_this.form.value.price, new Date(_this.form.value.dateFrom), new Date(_this.form.value.dateTo), _this.form.value.location, uploadRes.imageUrl);
            })).subscribe(function () {
                loadingEl.dismiss();
                _this.form.reset();
                _this.router.navigate(['/', 'places', 'tabs', 'offers']);
            }, function (error) {
                console.log(error);
                loadingEl.dismiss();
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
