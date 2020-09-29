"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaceDetailPage = void 0;
var core_1 = require("@angular/core");
var create_booking_component_1 = require("src/app/bookings/create-booking/create-booking.component");
var PlaceDetailPage = /** @class */ (function () {
    function PlaceDetailPage(navCtrl, route, placesService, modalController, actionSheetController) {
        this.navCtrl = navCtrl;
        this.route = route;
        this.placesService = placesService;
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
    }
    PlaceDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (paramMap) {
            if (!paramMap.has('placeId')) {
                _this.navCtrl.navigateBack(['/', 'places', 'tabs', 'discover']);
                return;
            }
            _this.place = _this.placesService.getPlace(paramMap.get('placeId'));
        });
    };
    PlaceDetailPage.prototype.onBookPlace = function () {
        var _this = this;
        // this.navCtrl.navigateBack(['/', 'places', 'tabs', 'discover']);
        this.actionSheetController.create({
            header: 'Choose an Action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: function () {
                        _this.openBookingModal('select');
                    }
                },
                {
                    text: 'Random Date',
                    handler: function () {
                        _this.openBookingModal('random');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        }).then(function (actionSheetEl) {
            actionSheetEl.present();
        });
    };
    PlaceDetailPage.prototype.openBookingModal = function (mode) {
        this.modalController.create({
            component: create_booking_component_1.CreateBookingComponent,
            componentProps: { selectedPlace: this.place, selectedMode: mode }
        }).then(function (modalEl) {
            modalEl.present();
            return modalEl.onDidDismiss();
        }).then(function (resultData) {
            if (resultData.role === 'confirm') {
                console.log(resultData);
            }
        });
    };
    PlaceDetailPage = __decorate([
        core_1.Component({
            selector: 'app-place-detail',
            templateUrl: './place-detail.page.html',
            styleUrls: ['./place-detail.page.scss']
        })
    ], PlaceDetailPage);
    return PlaceDetailPage;
}());
exports.PlaceDetailPage = PlaceDetailPage;
