"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var environment_1 = require("src/environments/environment");
var booking_model_1 = require("./booking.model");
var BookingService = /** @class */ (function () {
    function BookingService(authService, http) {
        this.authService = authService;
        this.http = http;
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
        return this.http
            .post(environment_1.environment.firebase + 'bookings.json', __assign(__assign({}, newBooking), { id: null }))
            .pipe(operators_1.switchMap(function (resData) {
            newBooking.id = resData.name;
            return _this.bookings;
        }), operators_1.take(1), operators_1.tap(function (bookings) {
            return _this._bookings.next(bookings.concat(newBooking));
        }));
    };
    BookingService.prototype.cancelBooking = function (bookingId) {
        var _this = this;
        return this.http["delete"](environment_1.environment.firebase + 'bookings/' + (bookingId + ".json"))
            .pipe(operators_1.switchMap(function () {
            return _this.bookings;
        }), operators_1.take(1), operators_1.tap(function (bookings) {
            return _this._bookings.next(bookings.filter(function (b) { return b.id !== bookingId; }));
        }));
    };
    BookingService.prototype.fetchBookings = function () {
        var _this = this;
        return this.http
            .get(environment_1.environment.firebase + ("bookings.json?orderBy=\"userId\"&equalTo=\"" + this.authService.userId + "\""))
            .pipe(operators_1.map(function (bookingData) {
            var bookings = [];
            for (var key in bookingData) {
                if (bookingData.hasOwnProperty(key)) {
                    bookings.push(new booking_model_1.Booking(key, bookingData[key].placeId, bookingData[key].userId, bookingData[key].placeTitle, bookingData[key].placeImage, bookingData[key].guestNumber, bookingData[key].firstName, bookingData[key].lastName, new Date(bookingData[key].bookedFrom), new Date(bookingData[key].bookedTo)));
                }
            }
            return bookings;
        }), operators_1.tap(function (bookings) {
            return _this._bookings.next(bookings);
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
