"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_view_1 = require("tns-core-modules/ui/content-view");
var CameraBase = (function (_super) {
    __extends(CameraBase, _super);
    function CameraBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CameraBase.prototype.preview = function () {
        this.nativeView.startPreview();
    };
    CameraBase.prototype.stopCapture = function () {
        this.nativeView.stopCapture();
    };
    CameraBase.prototype.toggleLens = function () {
        this.nativeView.toggleCameraLens();
    };
    CameraBase.prototype.getLens = function () {
        return this.nativeView.getCameraLens();
    };
    CameraBase.prototype.startCapture = function (captureType) { };
    CameraBase.prototype.setFaceNumberOfImages = function (faceNumberOfImages) { };
    CameraBase.prototype.setFaceDetectionBox = function (faceDetectionBox) { };
    CameraBase.prototype.setFaceTimeBetweenImages = function (faceTimeBetweenImages) { };
    CameraBase.prototype.setFacePaddingPercent = function (facePaddingPercent) { };
    CameraBase.prototype.setFaceImageSize = function (faceImageSize) { };
    CameraBase.prototype.requestPermission = function (explanationText) {
        return new Promise(function (resolve, reject) { return resolve(); });
    };
    CameraBase.prototype.hasPermission = function () { return false; };
    return CameraBase;
}(content_view_1.ContentView));
exports.CameraBase = CameraBase;
//# sourceMappingURL=Yoonit.Camera.common.js.map