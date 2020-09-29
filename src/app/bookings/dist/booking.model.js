"use strict";
exports.__esModule = true;
exports.Booking = void 0;
var Booking = /** @class */ (function () {
    function Booking(id, placeId, userId, placeTitle, placeImage, guestNumber, firstName, lastName, bookedFrom, bookedTo) {
        this.id = id;
        this.placeId = placeId;
        this.userId = userId;
        this.placeTitle = placeTitle;
        this.placeImage = placeImage;
        this.guestNumber = guestNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bookedFrom = bookedFrom;
        this.bookedTo = bookedTo;
    }
    return Booking;
}());
exports.Booking = Booking;
