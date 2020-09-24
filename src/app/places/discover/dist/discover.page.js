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
var DiscoverPage = /** @class */ (function () {
    function DiscoverPage(placesService) {
        this.placesService = placesService;
    }
    DiscoverPage.prototype.ngOnInit = function () {
        this.loadedPlaces = this.placesService.places;
    };
    DiscoverPage.prototype.onFilterUpdate = function (event) {
        console.log(event);
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
