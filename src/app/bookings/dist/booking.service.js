"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BookingService = void 0;
var core_1 = require("@angular/core");
var booking_model_1 = require("./booking.model");
var BookingService = /** @class */ (function () {
    function BookingService() {
        this._bookings = [
            new booking_model_1.Booking('b1', 'p1', 'u1', 'Manhattan Mansion', 10),
            new booking_model_1.Booking('b2', 'p2', 'u1', 'L\'Amour Toujours', 10),
        ];
    }
    Object.defineProperty(BookingService.prototype, "bookings", {
        get: function () {
            return __spreadArrays(this._bookings);
        },
        enumerable: false,
        configurable: true
    });
    BookingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
