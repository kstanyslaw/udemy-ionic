"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditOfferPage = void 0;
var core_1 = require("@angular/core");
var EditOfferPage = /** @class */ (function () {
    function EditOfferPage(placesService, route, navCtrl) {
        this.placesService = placesService;
        this.route = route;
        this.navCtrl = navCtrl;
    }
    EditOfferPage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (paramMap) {
            if (!paramMap.has('placeId')) {
                _this.navCtrl.navigateBack(['/', 'places', 'tabs', 'offers']);
                return;
            }
            _this.editedOffer = _this.placesService.getPlace(paramMap.get('placeId'));
        });
    };
    EditOfferPage = __decorate([
        core_1.Component({
            selector: 'app-edit-offer',
            templateUrl: './edit-offer.page.html',
            styleUrls: ['./edit-offer.page.scss']
        })
    ], EditOfferPage);
    return EditOfferPage;
}());
exports.EditOfferPage = EditOfferPage;
