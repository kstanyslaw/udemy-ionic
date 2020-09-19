"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeDetailPage = void 0;
var core_1 = require("@angular/core");
var RecipeDetailPage = /** @class */ (function () {
    function RecipeDetailPage(activatedRoute, recipesService, router, alertController) {
        this.activatedRoute = activatedRoute;
        this.recipesService = recipesService;
        this.router = router;
        this.alertController = alertController;
    }
    RecipeDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            if (!paramMap.has('recipeId')) {
                _this.router.navigate(['/recipes']);
                return;
            }
            var recipeId = paramMap.get('recipeId');
            _this.loadedRecipe = _this.recipesService.getRecipe(recipeId);
        });
    };
    RecipeDetailPage.prototype.onDeleteRecipe = function () {
        var _this = this;
        this.alertController.create({
            header: 'Are You Sure?',
            message: 'Do you really want to delete the recipe?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Delete',
                    handler: function () {
                        _this.recipesService.deleteRecipe(_this.loadedRecipe.id);
                        _this.router.navigate(['/recipes']);
                    }
                }]
        }).then(function (alertEl) { return alertEl.present(); });
    };
    RecipeDetailPage = __decorate([
        core_1.Component({
            selector: 'app-recipe-detail',
            templateUrl: './recipe-detail.page.html',
            styleUrls: ['./recipe-detail.page.scss']
        })
    ], RecipeDetailPage);
    return RecipeDetailPage;
}());
exports.RecipeDetailPage = RecipeDetailPage;
