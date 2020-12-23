"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./auth/auth.guard");
var routes = [
    {
        path: 'auth',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./auth/auth.module'); }).then(function (m) { return m.AuthPageModule; }); }
    },
    {
        path: 'places',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./places/places.module'); }).then(function (m) { return m.PlacesPageModule; }); },
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: 'bookings',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./bookings/bookings.module'); }).then(function (m) { return m.BookingsPageModule; }); },
        canLoad: [auth_guard_1.AuthGuard]
    },
    {
        path: '',
        redirectTo: 'places',
        pathMatch: 'full'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
