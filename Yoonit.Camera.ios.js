import { CameraBase } from './Yoonit.Camera.common';
import { ImageSource, knownFolders, path, File } from '@nativescript/core';
export class YoonitCamera extends CameraBase {
    constructor() {
        super(...arguments);
        this.permission = false;
    }
    createNativeView() {
        this.nativeView = CameraView.new();
        this.nativeView.cameraEventListener = CameraEventListener.initWithOwner(new WeakRef(this));
        return this.nativeView;
    }
    initNativeView() {
        this.nativeView.owner = this;
        super.initNativeView();
    }
    disposeNativeView() {
        this.nativeView.stopCapture();
        this.nativeView.cameraEventListener = null;
        this.nativeView.owner = null;
        super.disposeNativeView();
    }
    startCapture(captureType) {
        this.nativeView.startCaptureTypeWithCaptureType(captureType);
    }
    setFaceNumberOfImages(faceNumberOfImages) {
        this.nativeView.setFaceNumberOfImagesWithFaceNumberOfImages(faceNumberOfImages);
    }
    setFaceDetectionBox(faceDetectionBox) {
        this.nativeView.setFaceDetectionBoxWithFaceDetectionBox(faceDetectionBox);
    }
    setFaceTimeBetweenImages(faceTimeBetweenImages) {
        this.nativeView.setFaceTimeBetweenImagesWithFaceTimeBetweenImages(faceTimeBetweenImages);
    }
    setFacePaddingPercent(facePaddingPercent) {
        this.nativeView.setFacePaddingPercentWithFacePaddingPercent(facePaddingPercent);
    }
    setFaceImageSize(width, height) {
        this.nativeView.setFaceImageSizeWithWidthHeight(width, height);
    }
    setFaceCaptureMinSize(faceCaptureMinSize) {
        this.nativeView.setFaceCaptureMinSizeWithFaceCaptureMinSize(faceCaptureMinSize);
    }
    setFaceCaptureMaxSize(faceCaptureMaxSize) {
        this.nativeView.setFaceCaptureMaxSizeWithFaceCaptureMaxSize(faceCaptureMaxSize);
    }
    setFrameNumberOfImages(frameNumberOfImages) {
        this.nativeView.setFrameNumberOfImagesWithFrameNumberOfImages(frameNumberOfImages);
    }
    setFrameTimeBetweenImages(frameTimeBetweenImages) {
        this.nativeView.setFrameTimeBetweenImagesWithFrameTimeBetweenImages(frameTimeBetweenImages);
    }
    requestPermission(explanation = '') {
        return new Promise((resolve, reject) => {
            const cameraStatus = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);
            switch (cameraStatus) {
                case 0: {
                    AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, (granted) => {
                        if (granted) {
                            this.permission = true;
                            resolve(true);
                        }
                        else {
                            this.permission = false;
                            reject(false);
                        }
                    });
                    break;
                }
                case 1:
                case 2: {
                    this.permission = false;
                    reject(false);
                    break;
                }
                case 3: {
                    this.permission = true;
                    resolve(true);
                    break;
                }
            }
        });
    }
    hasPermission() {
        return this.permission;
    }
}
var CameraEventListener = /** @class */ (function (_super) {
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
    CameraEventListener.prototype.imageProcessing = function (imagePath) {
        var imageName = imagePath.split('/');
        imageName = imageName[imageName.length - 1];
        var finalPath = path
            .join(knownFolders.documents().path, imageName)
            .replace('file://', '');
        var source = ImageSource.fromFileSync(finalPath);
        var imageFile = File.fromPath(finalPath);
        var binary = imageFile.readSync();
        return {
            path: finalPath,
            source: source,
            binary: binary
        };
    };
    CameraEventListener.prototype.onFaceImageCreatedWithCountTotalImagePath = function (count, total, imagePath) {
        var owner = this.owner.get();
        var image = this.imageProcessing(imagePath);
        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count: count,
                total: total,
                image: image
            });
        }
    };
    CameraEventListener.prototype.onFrameImageCreatedWithCountTotalImagePath = function (count, total, imagePath) {
        var owner = this.owner.get();
        var image = this.imageProcessing(imagePath);
        if (owner) {
            owner.notify({
                eventName: 'frameImage',
                object: owner,
                count: count,
                total: total,
                image: image
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