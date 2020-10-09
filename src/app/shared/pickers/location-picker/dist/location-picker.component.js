"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LocationPickerComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var map_modal_component_1 = require("../../map-modal/map-modal.component");
var LocationPickerComponent = /** @class */ (function () {
    function LocationPickerComponent(modalController, http) {
        this.modalController = modalController;
        this.http = http;
        this.locationPick = new core_1.EventEmitter();
        this.selectedLocationImage = null;
        this.isLoading = false;
    }
    LocationPickerComponent.prototype.ngOnInit = function () { };
    LocationPickerComponent.prototype.onPickLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modalEl, data, pickedLocation;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.modalController.create({ component: map_modal_component_1.MapModalComponent })];
                    case 1:
                        modalEl = _a.sent();
                        modalEl.present();
                        return [4 /*yield*/, modalEl.onDidDismiss()];
                    case 2:
                        data = (_a.sent()).data;
                        if (!data) {
                            this.isLoading = false;
                            return [2 /*return*/];
                        }
                        pickedLocation = {
                            lat: data.lat,
                            lng: data.lng,
                            address: null,
                            staticMapImageUrl: null
                        };
                        this.getAdress(data.lat, data.lng).pipe(operators_1.switchMap(function (address) {
                            pickedLocation.address = address;
                            return rxjs_1.of(_this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14));
                        }))
                            .subscribe(function (staticMapImageUrl) {
                            pickedLocation.staticMapImageUrl = staticMapImageUrl;
                            _this.selectedLocationImage = staticMapImageUrl;
                            _this.isLoading = false;
                            _this.locationPick.emit(pickedLocation);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LocationPickerComponent.prototype.getAdress = function (lat, lng) {
        return this.http
            .get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + environment_1.environment.maps_API_KEY)
            .pipe(operators_1.map(function (geoData) {
            if (!geoData || !geoData.results || geoData.results.length === 0) {
                return null;
            }
            return geoData.results[0].formatted_address;
        }));
    };
    LocationPickerComponent.prototype.getMapImage = function (lat, lng, zoom) {
        return "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=" + zoom + "&size=500x300&maptype=roadmap\n    &markers=color:red%7Clabel:Place%7C" + lat + "," + lng + "\n    &key=" + environment_1.environment.maps_API_KEY;
    };
    __decorate([
        core_1.Output()
    ], LocationPickerComponent.prototype, "locationPick");
    LocationPickerComponent = __decorate([
        core_1.Component({
            selector: 'app-location-picker',
            templateUrl: './location-picker.component.html',
            styleUrls: ['./location-picker.component.scss']
        })
    ], LocationPickerComponent);
    return LocationPickerComponent;
}());
exports.LocationPickerComponent = LocationPickerComponent;
