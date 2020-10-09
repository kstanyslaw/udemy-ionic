"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var location_picker_component_1 = require("./pickers/location-picker/location-picker.component");
var map_modal_component_1 = require("./map-modal/map-modal.component");
var angular_1 = require("@ionic/angular");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                location_picker_component_1.LocationPickerComponent,
                map_modal_component_1.MapModalComponent
            ],
            imports: [
                common_1.CommonModule,
                angular_1.IonicModule
            ],
            exports: [
                location_picker_component_1.LocationPickerComponent,
                map_modal_component_1.MapModalComponent
            ],
            entryComponents: [
                map_modal_component_1.MapModalComponent
            ],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
