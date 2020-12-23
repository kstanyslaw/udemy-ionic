"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateBookingComponent = void 0;
var core_1 = require("@angular/core");
var CreateBookingComponent = /** @class */ (function () {
    function CreateBookingComponent(modalController) {
        this.modalController = modalController;
    }
    CreateBookingComponent.prototype.ngOnInit = function () {
        var avaliableFrom = new Date(this.selectedPlace.avaliableFrom);
        var avaliableTo = new Date(this.selectedPlace.avaliableTo);
        if (this.selectedMode === 'random') {
            this.startDate = new Date(avaliableFrom.getTime() + Math.random() * (avaliableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - avaliableFrom.getTime())).toISOString();
            this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * 6 * 24 * 60 * 60 * 1000).toISOString();
        }
    };
    CreateBookingComponent.prototype.onBookPlace = function () {
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
    };
    CreateBookingComponent.prototype.onCancel = function () {
        this.modalController.dismiss(null, 'cancel');
    };
    CreateBookingComponent.prototype.datesValid = function () {
        var startDate = new Date(this.form.value['date-from']);
        var endDate = new Date(this.form.value['date-to']);
        return endDate > startDate;
    };
    __decorate([
        core_1.Input()
    ], CreateBookingComponent.prototype, "selectedPlace");
    __decorate([
        core_1.Input()
    ], CreateBookingComponent.prototype, "selectedMode");
    __decorate([
        core_1.ViewChild('f', { static: true })
    ], CreateBookingComponent.prototype, "form");
    CreateBookingComponent = __decorate([
        core_1.Component({
            selector: 'app-create-booking',
            templateUrl: './create-booking.component.html',
            styleUrls: ['./create-booking.component.scss']
        })
    ], CreateBookingComponent);
    return CreateBookingComponent;
}());
exports.CreateBookingComponent = CreateBookingComponent;
