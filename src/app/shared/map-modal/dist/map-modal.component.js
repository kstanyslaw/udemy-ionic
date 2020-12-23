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
exports.MapModalComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var MapModalComponent = /** @class */ (function () {
    function MapModalComponent(modalController, renderer) {
        this.modalController = modalController;
        this.renderer = renderer;
        this.center = { lat: -34.397, lng: 150.644 };
        this.selectable = true;
        this.closeButtonText = 'Cancel';
        this.title = 'Pick Location';
    }
    MapModalComponent.prototype.ngOnInit = function () { };
    MapModalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.getGoogleMaps()
            .then(function (googleMaps) {
            _this.googleMaps = googleMaps;
            var mapElement = _this.mapElementRef.nativeElement;
            var map = new googleMaps.Map(mapElement, {
                center: _this.center,
                zoom: 16
            });
            googleMaps.event.addListenerOnce(map, 'idle', function () {
                _this.renderer.addClass(mapElement, 'visible');
            });
            if (_this.selectable) {
                _this.clickListener = map.addListener('click', function (event) {
                    var selectedCoords = {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    };
                    _this.modalController.dismiss(selectedCoords);
                });
            }
            else {
                var marker = new googleMaps.Marker({
                    position: _this.center,
                    map: map,
                    title: 'Picked location'
                });
                marker.setMap(map);
            }
        })["catch"](function (err) {
            console.log(err);
        });
    };
    MapModalComponent.prototype.onCancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MapModalComponent.prototype.getGoogleMaps = function () {
        var win = window;
        var googleModule = win.google;
        if (googleModule && googleModule.maps) {
            return Promise.resolve(googleModule.maps);
        }
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src =
                'https://maps.googleapis.com/maps/api/js?key=' + environment_1.environment.maps_API_KEY;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            script.onload = function () {
                var loadedGoogleModule = win.google;
                if (loadedGoogleModule && loadedGoogleModule.maps) {
                    resolve(loadedGoogleModule.maps);
                }
                else {
                    reject('Google maps SDK not available.');
                }
            };
        });
    };
    MapModalComponent.prototype.ngOnDestroy = function () {
        if (this.clickListener) {
            this.googleMaps.event.removeListener(this.clickListener);
        }
    };
    __decorate([
        core_1.ViewChild('map', { static: false })
    ], MapModalComponent.prototype, "mapElementRef");
    __decorate([
        core_1.Input()
    ], MapModalComponent.prototype, "center");
    __decorate([
        core_1.Input()
    ], MapModalComponent.prototype, "selectable");
    __decorate([
        core_1.Input()
    ], MapModalComponent.prototype, "closeButtonText");
    __decorate([
        core_1.Input()
    ], MapModalComponent.prototype, "title");
    MapModalComponent = __decorate([
        core_1.Component({
            selector: 'app-map-modal',
            templateUrl: './map-modal.component.html',
            styleUrls: ['./map-modal.component.scss']
        })
    ], MapModalComponent);
    return MapModalComponent;
}());
exports.MapModalComponent = MapModalComponent;
// &callback=initMap
