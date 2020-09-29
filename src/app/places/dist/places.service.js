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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PlacesService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var place_model_1 = require("./place.model");
var operators_1 = require("rxjs/operators");
var PlacesService = /** @class */ (function () {
    function PlacesService(authService) {
        this.authService = authService;
        this._places = new rxjs_1.BehaviorSubject([
            new place_model_1.Place('p1', 'Manhattan Mansion', 'In the heart of New Yourk City', 'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg', 149.99, new Date(), new Date('2021-09-01'), 'abc'),
            new place_model_1.Place('p2', 'L\'Amour Toujours', 'A Romantic place in Paris', 'https://miro.medium.com/max/4096/1*t-nXIcaD3oP6CS4ydXV1xw.jpeg', 189.99, new Date(), new Date('2021-09-01'), 'abc'),
            new place_model_1.Place('p3', 'The Foggy Palace', 'Not your average city trip!', 'https://i.pinimg.com/originals/65/8f/77/658f77b9b527f89922ba996560a3e2b0.jpg', 99.99, new Date(), new Date('2021-09-01'), 'abc'),
        ]);
    }
    Object.defineProperty(PlacesService.prototype, "places", {
        get: function () {
            return this._places.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    PlacesService.prototype.getPlace = function (id) {
        return this.places.pipe(operators_1.take(1), operators_1.map(function (places) {
            return __assign({}, places.find(function (p) { return p.id === id; }));
        }));
    };
    PlacesService.prototype.addPlace = function (title, description, price, dateFrom, dateTo) {
        var _this = this;
        var newPlace = new place_model_1.Place(Math.random().toString(), title, description, 'https://www.visittirol.ru/images/hft6wwpj6ga-/f6dbf422437a38c29c9813d471bd05de.jpeg', price, dateFrom, dateTo, this.authService.userId);
        return this.places.pipe(operators_1.take(1), operators_1.delay(1000), operators_1.tap(function (places) {
            _this._places.next(places.concat(newPlace));
        }));
    };
    PlacesService.prototype.updatePlace = function (placeId, title, description, imageUrl, price, dateFrom, dateTo) {
        var _this = this;
        return this.places.pipe(operators_1.take(1), operators_1.delay(1000), operators_1.tap(function (places) {
            var updatedPlaceIndex = places.findIndex(function (pl) { return pl.id === placeId; });
            var updatedPlaces = __spreadArrays(places);
            updatedPlaces[updatedPlaceIndex] = new place_model_1.Place(placeId, title, description, imageUrl, price, dateFrom, dateTo, _this.authService.userId);
            _this._places.next(updatedPlaces);
        }));
    };
    PlacesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PlacesService);
    return PlacesService;
}());
exports.PlacesService = PlacesService;
