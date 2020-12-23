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
var operators_1 = require("rxjs/operators");
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, authService, router) {
        this.platform = platform;
        this.authService = authService;
        this.router = router;
        this.previousAuthState = false;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            if (core_2.Capacitor.isPluginAvailable('SplashScreen')) {
                core_2.Plugins.SplashScreen.hide();
            }
        });
        core_2.Plugins.App.addListener('appStateChange', this.checkAuthOnResume.bind(this));
    };
    AppComponent.prototype.onLogout = function () {
        this.authService.logout();
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authSub = this.authService.userIsAuth.subscribe(function (isAuth) {
            if (!isAuth && _this.previousAuthState !== isAuth) {
                _this.router.navigate(['/', 'auth']);
            }
            _this.previousAuthState = isAuth;
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.authSub.unsubscribe();
    };
    AppComponent.prototype.checkAuthOnResume = function (state) {
        var _this = this;
        if (state.isActive) {
            this.authService
                .autoLogin()
                .pipe(operators_1.take(1))
                .subscribe(function (success) {
                if (!success) {
                    _this.onLogout();
                }
            });
        }
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
