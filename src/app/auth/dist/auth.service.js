"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var user_model_1 = require("./user.model");
var core_2 = require("@capacitor/core");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this._user = new rxjs_1.BehaviorSubject(null);
    }
    Object.defineProperty(AuthService.prototype, "userIsAuth", {
        get: function () {
            return this._user.asObservable().pipe(operators_1.map(function (user) {
                if (user) {
                    return !!user.token;
                }
                else {
                    return false;
                }
            }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "userId", {
        get: function () {
            return this._user.asObservable().pipe(operators_1.map(function (user) {
                if (user) {
                    return user.id;
                }
                else {
                    return null;
                }
            }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "token", {
        get: function () {
            return this._user.asObservable().pipe(operators_1.map(function (user) {
                if (user) {
                    return user.token;
                }
                else {
                    return null;
                }
            }));
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.autoLogin = function () {
        var _this = this;
        return rxjs_1.from(core_2.Plugins.Storage.get({ key: 'authData' })).pipe(operators_1.map(function (storedData) {
            if (!storedData || !storedData.value) {
                return null;
            }
            var parsedData = JSON.parse(storedData.value);
            var expirationTime = new Date(parsedData.tokenExpirationDate);
            if (expirationTime <= new Date()) {
                return null;
            }
            var user = new user_model_1.User(parsedData.userId, parsedData.email, parsedData.token, expirationTime);
            return user;
        }), operators_1.tap(function (user) {
            _this._user.next(user);
            if (!user) {
                _this.setAutoLogout(0);
            }
            else {
                _this.setAutoLogout(user.tokenDuration);
            }
        }), operators_1.map(function (user) {
            return !!user;
        }));
    };
    AuthService.prototype.signup = function (email, password) {
        return this.http
            .post(environment_1.environment.auth_API_signup +
            environment_1.environment.auth_API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .pipe(operators_1.tap(this.setUserData.bind(this)));
    };
    AuthService.prototype.login = function (email, password) {
        return this.http
            .post(environment_1.environment.auth_API_login +
            environment_1.environment.auth_API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .pipe(operators_1.tap(this.setUserData.bind(this)));
    };
    AuthService.prototype.logout = function () {
        this._user.next(null);
        core_2.Plugins.Storage.remove({ key: 'authData' });
    };
    AuthService.prototype.setAutoLogout = function (duration) {
        var _this = this;
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this.activeLogoutTimer = setTimeout(function () {
            _this.logout();
        }, duration);
    };
    AuthService.prototype.setUserData = function (userData) {
        var expirationTime = new Date().getTime() + (+userData.expiresIn * 1000);
        var user = new user_model_1.User(userData.localId, userData.email, userData.idToken, new Date(expirationTime));
        this._user.next(user);
        this.setAutoLogout(user.tokenDuration);
        this.storeAuthData(userData.localId, userData.idToken, new Date(expirationTime).toISOString(), userData.email);
    };
    AuthService.prototype.storeAuthData = function (userId, token, tokenExpirationDate, email) {
        var data = JSON.stringify({ userId: userId, token: token, tokenExpirationDate: tokenExpirationDate, email: email });
        core_2.Plugins.Storage.set({ key: 'authData', value: data });
    };
    AuthService.prototype.ngOnDestroy = function () {
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
