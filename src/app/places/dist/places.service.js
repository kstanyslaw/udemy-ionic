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
var environment_1 = require("src/environments/environment");
var PlacesService = /** @class */ (function () {
    function PlacesService(authService, http) {
        this.authService = authService;
        this.http = http;
        this._places = new rxjs_1.BehaviorSubject([]);
    }
    Object.defineProperty(PlacesService.prototype, "places", {
        get: function () {
            return this._places.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    PlacesService.prototype.fetchPlaces = function () {
        var _this = this;
        return this.http
            .get(environment_1.environment.firebase + 'offered-places.json')
            .pipe(operators_1.map(function (resData) {
            var places = [];
            for (var key in resData) {
                if (Object.prototype.hasOwnProperty.call(resData, key)) {
                    places.push(new place_model_1.Place(key, resData[key].title, resData[key].description, resData[key].imageUrl, resData[key].price, new Date(resData[key].avaliableFrom), new Date(resData[key].avaliableTo), resData[key].userId, resData[key].location));
                }
            }
            return places;
        }), operators_1.tap(function (places) {
            _this._places.next(places);
        }));
    };
    PlacesService.prototype.getPlace = function (id) {
        // return this.places.pipe(take(1), map(places => {
        //   return {...places.find(p => p.id === id)};
        // }));
        return this.http
            .get(environment_1.environment.firebase + 'offered-places/' + id + '.json')
            .pipe(operators_1.map(function (placeData) {
            return new place_model_1.Place(id, placeData.title, placeData.description, placeData.imageUrl, placeData.price, new Date(placeData.avaliableFrom), new Date(placeData.avaliableTo), placeData.userId, placeData.location);
        }));
    };
    PlacesService.prototype.addPlace = function (title, description, price, dateFrom, dateTo, location) {
        var _this = this;
        var generatedId = 'string';
        var newPlace = new place_model_1.Place(null, title, description, 'https://www.visittirol.ru/images/hft6wwpj6ga-/f6dbf422437a38c29c9813d471bd05de.jpeg', price, dateFrom, dateTo, this.authService.userId, location);
        return this.http
            .post(environment_1.environment.firebase + 'offered-places.json', __assign(__assign({}, newPlace), { id: null }))
            .pipe(operators_1.switchMap(function (resData) {
            generatedId = resData.name;
            return _this.places;
        }), operators_1.take(1), operators_1.tap(function (places) {
            newPlace.id = generatedId;
            _this._places.next(places.concat(newPlace));
        }));
    };
    PlacesService.prototype.updatePlace = function (placeId, title, description, imageUrl, price, dateFrom, dateTo, location) {
        var _this = this;
        var updatedPlaces;
        return this.places.pipe(operators_1.take(1), operators_1.switchMap(function (places) {
            if (!places || places.length <= 0) {
                return _this.fetchPlaces();
            }
            else {
                return rxjs_1.of(places);
            }
        }), operators_1.switchMap(function (places) {
            var updatedPlaceIndex = places.findIndex(function (pl) { return pl.id === placeId; });
            updatedPlaces = __spreadArrays(places);
            updatedPlaces[updatedPlaceIndex] = new place_model_1.Place(placeId, title, description, imageUrl, price, dateFrom, dateTo, _this.authService.userId, location);
            return _this.http.put(environment_1.environment.firebase + 'offered-places/' + placeId + '.json', __assign(__assign({}, updatedPlaces[updatedPlaceIndex]), { id: null }));
        }), operators_1.tap(function () {
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
// new Place(
//   'p1',
//   'Manhattan Mansion',
//   'In the heart of New Yourk City',
//   'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
//   149.99,
//   new Date(),
//   new Date('2021-09-01'),
//   'abc'
// ),
// new Place(
//   'p2',
//   'L\'Amour Toujours',
//   'A Romantic place in Paris',
//   'https://miro.medium.com/max/4096/1*t-nXIcaD3oP6CS4ydXV1xw.jpeg',
//   189.99,
//   new Date(),
//   new Date('2021-09-01'),
//   'abc'
// ),
// new Place(
//   'p3',
//   'The Foggy Palace',
//   'Not your average city trip!',
//   'https://i.pinimg.com/originals/65/8f/77/658f77b9b527f89922ba996560a3e2b0.jpg',
//   99.99,
//   new Date(),
//   new Date('2021-09-01'),
//   'abc'
// ),
