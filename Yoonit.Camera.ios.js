"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Yoonit_Camera_common_1 = require("./Yoonit.Camera.common");
var image_source_1 = require("tns-core-modules/image-source");
var file_system_1 = require("tns-core-modules/file-system");
var YoonitCamera = (function (_super) {
    __extends(YoonitCamera, _super);
    function YoonitCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permission = false;
        return _this;
    }
    YoonitCamera.prototype.createNativeView = function () {
        this.nativeView = CameraView.new();
        this.nativeView.cameraEventListener = CameraEventListener.initWithOwner(new WeakRef(this));
        return this.nativeView;
    };
    YoonitCamera.prototype.initNativeView = function () {
        this.nativeView.owner = this;
        _super.prototype.initNativeView.call(this);
    };
    YoonitCamera.prototype.disposeNativeView = function () {
        this.nativeView.stopCapture();
        this.nativeView.cameraEventListener = null;
        this.nativeView.owner = null;
        _super.prototype.disposeNativeView.call(this);
    };
    YoonitCamera.prototype.startCapture = function (captureType) {
        this.nativeView.startCaptureTypeWithCaptureType(captureType);
    };
    YoonitCamera.prototype.setFaceNumberOfImages = function (faceNumberOfImages) {
        this.nativeView.setFaceNumberOfImagesWithFaceNumberOfImages(faceNumberOfImages);
    };
    YoonitCamera.prototype.setFaceDetectionBox = function (faceDetectionBox) {
        this.nativeView.setFaceDetectionBoxWithFaceDetectionBox(faceDetectionBox);
    };
    YoonitCamera.prototype.setFaceTimeBetweenImages = function (faceTimeBetweenImages) {
        this.nativeView.setFaceTimeBetweenImagesWithFaceTimeBetweenImages(faceTimeBetweenImages);
    };
    YoonitCamera.prototype.setFacePaddingPercent = function (facePaddingPercent) {
        this.nativeView.setFacePaddingPercentWithFacePaddingPercent(facePaddingPercent);
    };
    YoonitCamera.prototype.setFaceImageSize = function (width, height) {
        this.nativeView.setFaceImageSizeWithWidthHeight(width, height);
    };
    YoonitCamera.prototype.setFrameNumberOfImages = function (frameNumberOfImages) {
        this.nativeView.setFrameNumberOfImagesWithFrameNumberOfImages(frameNumberOfImages);
    };
    YoonitCamera.prototype.setFrameTimeBetweenImages = function (frameTimeBetweenImages) {
        this.nativeView.setFrameTimeBetweenImagesWithFrameTimeBetweenImages(frameTimeBetweenImages);
    };
    YoonitCamera.prototype.requestPermission = function (explanation) {
        var _this = this;
        if (explanation === void 0) { explanation = ''; }
        return new Promise(function (resolve, reject) {
            var cameraStatus = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);
            switch (cameraStatus) {
                case 0: {
                    AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, function (granted) {
                        if (granted) {
                            _this.permission = true;
                            resolve(true);
                        }
                        else {
                            _this.permission = false;
                            reject(false);
                        }
                    });
                    break;
                }
                case 3: {
                    _this.permission = true;
                    resolve(true);
                    break;
                }
                case 1:
                case 2: {
                    _this.permission = false;
                    reject(false);
                    break;
                }
            }
        });
    };
    YoonitCamera.prototype.hasPermission = function () {
        return this.permission;
    };
    return YoonitCamera;
}(Yoonit_Camera_common_1.CameraBase));
exports.YoonitCamera = YoonitCamera;
var CameraEventListener = (function (_super) {
    __extends(CameraEventListener, _super);
    function CameraEventListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CameraEventListener_1 = CameraEventListener;
    CameraEventListener.initWithOwner = function (owner) {
        var delegate = CameraEventListener_1.new();
        delegate.owner = owner;
        return delegate;
    };
    CameraEventListener.prototype.onFaceImageCreatedWithCountTotalImagePath = function (count, total, imagePath) {
        var owner = this.owner.get();
        var imageName = imagePath.split('/');
        imageName = imageName[imageName.length - 1];
        var finalPath = file_system_1.path.join(file_system_1.knownFolders.documents().path, imageName);
        var imageSource = image_source_1.ImageSource.fromFileSync(finalPath);
        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count: count,
                total: total,
                image: {
                    path: finalPath,
                    source: imageSource
                }
            });
        }
    };
    CameraEventListener.prototype.onFrameImageCreatedWithCountTotalImagePath = function (count, total, imagePath) {
        var owner = this.owner.get();
        var imageName = imagePath.split('/');
        imageName = imageName[imageName.length - 1];
        var finalPath = file_system_1.path.join(file_system_1.knownFolders.documents().path, imageName);
        var imageSource = image_source_1.ImageSource.fromFileSync(finalPath);
        if (owner) {
            owner.notify({
                eventName: 'frameImage',
                object: owner,
                count: count,
                total: total,
                image: {
                    path: finalPath,
                    source: imageSource
                }
            });
        }
    };
    CameraEventListener.prototype.onFaceDetectedWithXYWidthHeight = function (x, y, width, height) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x: x,
                y: y,
                width: width,
                height: height
            });
        }
    };
    CameraEventListener.prototype.onFaceUndetected = function () {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x: null,
                y: null,
                width: null,
                height: null
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
    CameraEventListener.prototype.onErrorWithError = function (error) {
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
    CameraEventListener.prototype.onMessageWithMessage = function (message) {
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
    CameraEventListener.prototype.onBarcodeScannedWithContent = function (content) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content: content
            });
        }
    };
    var CameraEventListener_1;
    CameraEventListener = CameraEventListener_1 = __decorate([
        ObjCClass(CameraEventListenerDelegate)
    ], CameraEventListener);
    return CameraEventListener;
}(NSObject));
//# sourceMappingURL=Yoonit.Camera.ios.js.map