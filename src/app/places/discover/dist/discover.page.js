"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DiscoverPage = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var DiscoverPage = /** @class */ (function () {
    function DiscoverPage(placesService, authService) {
        this.placesService = placesService;
        this.authService = authService;
        this.isLoading = false;
    }
    DiscoverPage.prototype.ngOnInit = function () {
        var _this = this;
        this.placesSub = this.placesService.places.subscribe(function (places) {
            _this.loadedPlaces = places;
            _this.relevantPlaces = _this.loadedPlaces;
        });
    };
    DiscoverPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.isLoading = true;
        this.placesService.fetchPlaces().subscribe(function () {
            _this.isLoading = false;
        });
    };
    DiscoverPage.prototype.onFilterUpdate = function (event) {
        var _this = this;
        this.authService.userId.pipe(operators_1.take(1)).subscribe(function (userId) {
            if (event.detail.value === 'all') {
                _this.relevantPlaces = _this.loadedPlaces;
            }
            else {
                _this.relevantPlaces = _this.loadedPlaces.filter(function (place) { return place.userId !== userId; });
            }
        });
    };
    DiscoverPage.prototype.ngOnDestroy = function () {
        this.placesSub.unsubscribe();
    };
    DiscoverPage = __decorate([
        core_1.Component({
            selector: 'app-discover',
            templateUrl: './discover.page.html',
            styleUrls: ['./discover.page.scss']
        })
    ], DiscoverPage);
    return DiscoverPage;
}());
exports.DiscoverPage = DiscoverPage;
