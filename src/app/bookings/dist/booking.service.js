"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookingService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var booking_model_1 = require("./booking.model");
var BookingService = /** @class */ (function () {
    function BookingService(authService) {
        this.authService = authService;
        this._bookings = new rxjs_1.BehaviorSubject([]);
    }
    Object.defineProperty(BookingService.prototype, "bookings", {
        get: function () {
            return this._bookings.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    BookingService.prototype.addBooking = function (placeId, placeTitle, placeImage, firstName, lastMane, guestNumber, dateFrom, dateTo) {
        var _this = this;
        var newBooking = new booking_model_1.Booking(Math.random().toString(), placeId, this.authService.userId, placeTitle, placeImage, guestNumber, firstName, lastMane, dateFrom, dateTo);
        return this.bookings.pipe(operators_1.take(1), operators_1.tap(function (bookings) {
            _this._bookings.next(bookings.concat(newBooking));
        }));
    };
    BookingService.prototype.cancelBooking = function (bookingId) {
        var _this = this;
        return this.bookings.pipe(operators_1.take(1), operators_1.tap(function (bookings) {
            _this._bookings.next(bookings.filter(function (b) { return b.id !== bookingId; }));
        }));
    };
    BookingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
