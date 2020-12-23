"use strict";
exports.__esModule = true;
exports.Place = void 0;
var Place = /** @class */ (function () {
    function Place(id, title, description, imageUrl, price, avaliableFrom, avaliableTo, userId, location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.avaliableFrom = avaliableFrom;
        this.avaliableTo = avaliableTo;
        this.userId = userId;
        this.location = location;
    }
    return Place;
}());
exports.Place = Place;
