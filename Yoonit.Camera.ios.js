import { CameraBase } from './Yoonit.Camera.common';
import { ImageSource, knownFolders, path, File } from '@nativescript/core';
import Validator from "./helpers/Validator";
const { ValidateProps, Required, NativeMethod, RegexColor, ParseToNsColor, } = Validator;
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
        Validator.PropMap.forEach((prop) => {
            if (this.nativeView[prop.name]) {
                if (prop.length > 1) {
                    return this.nativeView[prop.name](...prop.value);
                }
                this.nativeView[prop.name](prop.value);
            }
        });
        Validator.PropMap = [];
    }
    disposeNativeView() {
        this.nativeView.destroy();
        this.nativeView.cameraEventListener = null;
        this.nativeView.owner = null;
        super.disposeNativeView();
    }
    requestPermission(explanation = '') {
        return new Promise((resolve, reject) => {
            let PermissionStatus;
            (function (PermissionStatus) {
                PermissionStatus[PermissionStatus["NO_EXPLICIT_PERMISSION"] = 0] = "NO_EXPLICIT_PERMISSION";
                PermissionStatus[PermissionStatus["NOT_ALLOWED"] = 1] = "NOT_ALLOWED";
                PermissionStatus[PermissionStatus["EXPLICIT_DENIED"] = 2] = "EXPLICIT_DENIED";
                PermissionStatus[PermissionStatus["EXPLICIT_ALLOWED"] = 3] = "EXPLICIT_ALLOWED";
            })(PermissionStatus || (PermissionStatus = {}));
            const cameraStatus = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);
            switch (cameraStatus) {
                case PermissionStatus.NO_EXPLICIT_PERMISSION: {
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
                case PermissionStatus.NOT_ALLOWED:
                case PermissionStatus.EXPLICIT_DENIED: {
                    this.permission = false;
                    reject(false);
                    break;
                }
                case PermissionStatus.EXPLICIT_ALLOWED: {
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
    setFaceContours(enable) {
        this.nativeView.setFaceContours(enable);
    }
    setFaceContoursColor(color) {
        this.nativeView.setFaceContoursColor(...color);
    }
}
__decorate([
    ValidateProps('faceContours', [false, true]),
    NativeMethod({ name: 'setFaceContours', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], YoonitCamera.prototype, "setFaceContours", null);
__decorate([
    ValidateProps('faceContoursColor', RegexColor),
    ParseToNsColor,
    NativeMethod({ name: 'setFaceContoursColor', length: 4 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], YoonitCamera.prototype, "setFaceContoursColor", null);
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
    CameraEventListener.prototype.onImageCaptured = function (type, count, total, imagePath) {
        var owner = this.owner.get();
        if (owner && !!imagePath) {
            var image = this.imageProcessing(imagePath);
            owner.notify({
                eventName: 'imageCaptured',
                object: owner,
                type: type,
                count: count,
                total: total,
                image: image,
                inferences: []
            });
        }
    };
    CameraEventListener.prototype.onFaceDetected = function (x, y, width, height, leftEyeOpenProbability, rightEyeOpenProbability, smilingProbability, headEulerAngleX, headEulerAngleY, headEulerAngleZ) {
        var owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x: x,
                y: y,
                width: width,
                height: height,
                leftEyeOpenProbability: leftEyeOpenProbability,
                rightEyeOpenProbability: rightEyeOpenProbability,
                smilingProbability: smilingProbability,
                headEulerAngleX: headEulerAngleX,
                headEulerAngleY: headEulerAngleY,
                headEulerAngleZ: headEulerAngleZ
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
                height: null,
                leftEyeOpenProbability: null,
                rightEyeOpenProbability: null,
                smilingProbability: null,
                headEulerAngleX: null,
                headEulerAngleY: null,
                headEulerAngleZ: null
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
    CameraEventListener.prototype.onQRCodeScanned = function (content) {
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
        ObjCClass(CameraEventListenerDelegate)
    ], CameraEventListener);
    return CameraEventListener;
}(NSObject));
//# sourceMappingURL=Yoonit.Camera.ios.js.map