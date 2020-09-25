"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OfferItemComponent = void 0;
var core_1 = require("@angular/core");
var OfferItemComponent = /** @class */ (function () {
    function OfferItemComponent() {
    }
    OfferItemComponent.prototype.ngOnInit = function () { };
    OfferItemComponent.prototype.getDummyDate = function () {
        return new Date;
    };
    __decorate([
        core_1.Input()
    ], OfferItemComponent.prototype, "offer");
    OfferItemComponent = __decorate([
        core_1.Component({
            selector: 'app-offer-item',
            templateUrl: './offer-item.component.html',
            styleUrls: ['./offer-item.component.scss']
        })
    ], OfferItemComponent);
    return OfferItemComponent;
}());
exports.OfferItemComponent = OfferItemComponent;