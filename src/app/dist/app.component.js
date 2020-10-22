"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, authService, router) {
        this.platform = platform;
        this.authService = authService;
        this.router = router;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            if (core_2.Capacitor.isPluginAvailable('SplashScreen')) {
                core_2.Plugins.SplashScreen.hide();
            }
        });
    };
    AppComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/', 'auth']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
