"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canLoad = function (route, segments) {
        var _this = this;
        return this.authService.userIsAuth.pipe(operators_1.take(1), operators_1.switchMap(function (isAuth) {
            if (!isAuth) {
                return _this.authService.autoLogin();
            }
            else {
                return rxjs_1.of(isAuth);
            }
        }), operators_1.tap(function (isAuth) {
            if (!isAuth) {
                _this.router.navigate(['/', 'auth']);
            }
        }));
    };
    AuthGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
