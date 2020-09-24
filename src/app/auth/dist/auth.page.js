"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthPage = void 0;
var core_1 = require("@angular/core");
var AuthPage = /** @class */ (function () {
    function AuthPage(authService, router, loadingController) {
        this.authService = authService;
        this.router = router;
        this.loadingController = loadingController;
        this.isLoading = false;
    }
    AuthPage.prototype.ngOnInit = function () {
    };
    AuthPage.prototype.onLogin = function () {
        var _this = this;
        this.authService.login();
        this.isLoading = true;
        this.loadingController.create({ keyboardClose: true, message: 'Loggin in...' }).then(function (loadingEl) {
            loadingEl.present();
            setTimeout(function () {
                loadingEl.dismiss();
                _this.isLoading = false;
                _this.router.navigate(['/', 'places', 'tabs', 'discover']);
            }, 1500);
        });
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
