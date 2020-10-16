"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Yoonit_Camera_common_1 = require("./Yoonit.Camera.common");
var permissions = require("nativescript-permissions");
var image_source_1 = require("tns-core-modules/image-source");
var CAMERA = function () { return android.Manifest.permission.CAMERA; };
var YoonitCamera = (function (_super) {
    __extends(YoonitCamera, _super);
    function YoonitCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YoonitCamera.prototype.createNativeView = function () {
        this.nativeView = new ai.cyberlabs.yoonit.camera.CameraView(this._context);
        this.nativeView.setCameraEventListener(CameraEventListener.initWithOwner(new WeakRef(this)));
        return this.nativeView;
    };
    YoonitCamera.prototype.initNativeView = function () {
        this.nativeView.owner = this;
        _super.prototype.initNativeView.call(this);
    };
    YoonitCamera.prototype.disposeNativeView = function () {
        this.nativeView.stopCapture();
        this.nativeView.setCameraEventListener(null);
        this.nativeView.owner = null;
        _super.prototype.disposeNativeView.call(this);
    };
    YoonitCamera.prototype.startCapture = function (captureType) {
        this.nativeView.startCaptureType(captureType);
    };
    YoonitCamera.prototype.setFaceNumberOfImages = function (faceNumberOfImages) {
        this.nativeView.setFaceNumberOfImages(faceNumberOfImages);
    };
    YoonitCamera.prototype.setFaceDetectionBox = function (faceDetectionBox) {
        this.nativeView.setFaceDetectionBox(faceDetectionBox);
    };
    YoonitCamera.prototype.setFaceTimeBetweenImages = function (faceTimeBetweenImages) {
        this.nativeView.setFaceTimeBetweenImages(faceTimeBetweenImages);
    };
    YoonitCamera.prototype.setFacePaddingPercent = function (facePaddingPercent) {
        this.nativeView.setFacePaddingPercent(facePaddingPercent);
    };
    YoonitCamera.prototype.setFaceImageSize = function (faceImageSize) {
        this.nativeView.setFaceImageSize(faceImageSize);
    };
    YoonitCamera.prototype.requestPermission = function (explanation) {
        if (explanation === void 0) { explanation = ''; }
        return new Promise(function (resolve, reject) { return permissions
            .requestPermission(CAMERA(), explanation)
            .then(function () { return resolve(true); })
            .catch(function (err) { return reject(false); }); });
    };
    YoonitCamera.prototype.hasPermission = function () {
        return permissions.hasPermission(CAMERA());
    };
    return YoonitCamera;
}(Yoonit_Camera_common_1.CameraBase));
exports.YoonitCamera = YoonitCamera;
var CameraEventListener = (function (_super) {
    __extends(CameraEventListener, _super);
    function CameraEventListener(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    CameraEventListener_1 = CameraEventListener;
    CameraEventListener.initWithOwner = function (owner) {
        return new CameraEventListener_1(owner);
    };
    CameraEventListener.prototype.onFaceImageCreated = function (count, total, imagePath) {
        var owner = this.owner.get();
        var imageSource = image_source_1.ImageSource.fromFileSync(imagePath);
        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count: count,
                total: total,
                image: {
                    path: imagePath,
                    source: imageSource
                }
            });
        }
    };
    CameraEventListener.prototype.onFaceDetected = function (faceDetected) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                faceDetected: faceDetected
            });
        }
    };
    CameraEventListener.prototype.onEndCapture = function () {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'endCapture',
                object: owner,
            });
        }
    };
    CameraEventListener.prototype.onBarcodeScanned = function (content) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content: content
            });
        }
    };
    CameraEventListener.prototype.onError = function (error) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'status',
                object: owner,
                status: {
                    type: 'error',
                    status: error
                }
            });
        }
    };
    CameraEventListener.prototype.onMessage = function (message) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'status',
                object: owner,
                status: {
                    type: 'message',
                    status: message
                }
            });
        }
    };
    CameraEventListener.prototype.onPermissionDenied = function () {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'permissionDenied',
                object: owner,
            });
        }
    };
    var CameraEventListener_1;
    CameraEventListener = CameraEventListener_1 = __decorate([
        Interfaces([ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener]),
        __metadata("design:paramtypes", [WeakRef])
    ], CameraEventListener);
    return CameraEventListener;
}(java.lang.Object));
//# sourceMappingURL=Yoonit.Camera.android.js.map