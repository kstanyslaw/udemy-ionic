"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImagePickerComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var ImagePickerComponent = /** @class */ (function () {
    function ImagePickerComponent() {
        this.imagePick = new core_1.EventEmitter();
        this.showPreview = false;
        this.usePicker = false;
    }
    ImagePickerComponent.prototype.ngOnInit = function () {
    };
    ImagePickerComponent.prototype.onPickImage = function () {
        var _this = this;
        if (!core_2.Capacitor.isPluginAvailable('Camera')) {
            this.filePicker.nativeElement.click();
            return;
        }
        core_2.Plugins.Camera.getPhoto({
            quality: 50,
            source: core_2.CameraSource.Prompt,
            correctOrientation: true,
            height: 320,
            width: 200,
            resultType: core_2.CameraResultType.Base64
        })
            .then(function (image) {
            _this.selectedImage = image.base64String;
            _this.imagePick.emit(image.base64String);
        })["catch"](function (error) {
            console.log(error);
            return false;
        });
    };
    ImagePickerComponent.prototype.onFileChosen = function (event) {
        var _this = this;
        var pickedFile = event.target.files[0];
        if (!pickedFile) {
            return;
        }
        var fr = new FileReader();
        fr.onload = function () {
            var dataUrl = fr.result.toString();
            _this.selectedImage = dataUrl;
        };
        fr.readAsDataURL(pickedFile);
    };
    __decorate([
        core_1.ViewChild('filePicker', { static: false })
    ], ImagePickerComponent.prototype, "filePicker");
    __decorate([
        core_1.Output()
    ], ImagePickerComponent.prototype, "imagePick");
    __decorate([
        core_1.Input()
    ], ImagePickerComponent.prototype, "showPreview");
    ImagePickerComponent = __decorate([
        core_1.Component({
            selector: 'app-image-picker',
            templateUrl: './image-picker.component.html',
            styleUrls: ['./image-picker.component.scss']
        })
    ], ImagePickerComponent);
    return ImagePickerComponent;
}());
exports.ImagePickerComponent = ImagePickerComponent;
