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
exports.AuthPage = void 0;
var core_1 = require("@angular/core");
var AuthPage = /** @class */ (function () {
    function AuthPage(authService, router, loadingController, alertController) {
        this.authService = authService;
        this.router = router;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.isLoading = false;
        this.isLogin = true;
    }
    AuthPage.prototype.ngOnInit = function () {
    };
    AuthPage.prototype.authenticate = function (authObs) {
        var _this = this;
        this.isLoading = true;
        this.loadingController
            .create({ keyboardClose: true, message: 'Loggin in...' })
            .then(function (loadingEl) {
            loadingEl.present();
            authObs.subscribe(function (resData) {
                loadingEl.dismiss();
                _this.isLoading = false;
                _this.router.navigate(['/', 'places', 'tabs', 'discover']);
            }, function (errorRes) {
                loadingEl.dismiss();
                _this.isLoading = false;
                var code = errorRes.error.error.message;
                switch (code) {
                    case 'EMAIL_EXISTS':
                        _this.showAlert('The email address is already in use by another account.');
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        _this.showAlert('Password sign-in is disabled for this project.');
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        _this.showAlert('We have blocked all requests from this device due to unusual activity. Try again later.');
                        break;
                    case 'EMAIL_NOT_FOUND':
                        _this.showAlert('There is no user record corresponding to this identifier. The user may have been deleted.');
                        break;
                    case 'INVALID_PASSWORD':
                        _this.showAlert('The password is invalid or the user does not have a password.');
                        break;
                    case 'USER_DISABLED':
                        _this.showAlert('The user account has been disabled by an administrator.');
                        break;
                    default:
                        _this.showAlert('Could not sign you up, please try again.');
                        break;
                }
            });
        });
    };
    AuthPage.prototype.onSubmit = function (form) {
        if (form.invalid) {
            return;
        }
        var email = form.value.email;
        var password = form.value.password;
        var authObs;
        if (this.isLogin) {
            authObs = this.authService.login(email, password);
        }
        else {
            authObs = this.authService.signup(email, password);
        }
        this.authenticate(authObs);
    };
    AuthPage.prototype.showAlert = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var alertEl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Authentication failed',
                            message: message,
                            buttons: ['OK']
                        })];
                    case 1:
                        alertEl = _a.sent();
                        return [4 /*yield*/, alertEl.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthPage.prototype.onSwitchAuthMode = function () {
        this.isLogin = !this.isLogin;
    };
    AuthPage = __decorate([
        core_1.Component({
            selector: 'app-auth',
            templateUrl: './auth.page.html',
            styleUrls: ['./auth.page.scss']
        })
    ], AuthPage);
    return AuthPage;
}());
exports.AuthPage = AuthPage;
