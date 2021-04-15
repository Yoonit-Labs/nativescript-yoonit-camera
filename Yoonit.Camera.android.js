import { CameraBase } from './Yoonit.Camera.common';
import * as permissions from 'nativescript-permissions';
import { ImageSource, File } from '@nativescript/core';
import Validator from "./helpers/Validator";
const { ValidateProps, Required, NativeMethod, RegexColor, ParseToNsColor, } = Validator;
const CAMERA = () => android.Manifest.permission.CAMERA;
export class YoonitCamera extends CameraBase {
    createNativeView() {
        this.nativeView = new ai.cyberlabs.yoonit.camera.CameraView(this._context);
        this.nativeView.setCameraEventListener(CameraEventListener.initWithOwner(new WeakRef(this)));
        return this.nativeView;
    }
    initNativeView() {
        this.nativeView.owner = this;
        super.initNativeView();
        Validator.PropMap.forEach((prop) => {
            if (this.nativeView[prop.name] === null || this.nativeView[prop.name] === undefined) {
                return;
            }
            switch (prop.type) {
                case 'attribute':
                    this.nativeView[prop.name] = prop.value;
                    return;
                case 'method':
                    if (prop.length > 1) {
                        return this.nativeView[prop.name](...prop.value);
                    }
                    this.nativeView[prop.name](prop.value);
                    return;
                default:
                    return;
            }
        });
        Validator.PropMap = [];
    }
    disposeNativeView() {
        this.nativeView.destroy();
        this.nativeView.setCameraEventListener(null);
        this.nativeView.owner = null;
        super.disposeNativeView();
    }
    requestPermission(explanation = '') {
        return new Promise((resolve, reject) => permissions
            .requestPermission(CAMERA(), explanation)
            .then(() => resolve(true))
            .catch(err => reject(false)));
    }
    hasPermission() {
        return permissions.hasPermission(CAMERA());
    }
    setImageCaptureColorEncoding(colorEncoding) {
        this.nativeView.setColorEncodingCapture(colorEncoding);
    }
    setFaceContours(enable) {
        this.nativeView.setFaceContours(enable);
    }
    setFaceContoursColor(color) {
        this.nativeView.setFaceContoursColor(...color);
    }
    setComputerVision(enable) {
        this.nativeView.setComputerVision(enable);
    }
    setComputerVisionLoadModels(modelPaths) {
        const nativeArrayList = new java.util.ArrayList();
        modelPaths.forEach((path) => {
            nativeArrayList.add(path);
        });
        this.nativeView.setComputerVisionLoadModels(nativeArrayList);
    }
    computerVisionClearModels() {
        this.nativeView.computerVisionClearModels();
    }
}
__decorate([
    ValidateProps('colorEncoding', ['RGB', 'YUV']),
    NativeMethod({ name: 'setColorEncodingCapture', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], YoonitCamera.prototype, "setImageCaptureColorEncoding", null);
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
__decorate([
    ValidateProps('computerVision', [false, true]),
    NativeMethod({ name: 'setComputerVision', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], YoonitCamera.prototype, "setComputerVision", null);
var CameraEventListener = /** @class */ (function (_super) {
    __extends(CameraEventListener, _super);
    function CameraEventListener(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        // Required by Android runtime when native class is extended through TypeScript.
        return global.__native(_this);
    }
    CameraEventListener_1 = CameraEventListener;
    CameraEventListener.initWithOwner = function (owner) {
        return new CameraEventListener_1(owner);
    };
    CameraEventListener.prototype.imageProcessing = function (imagePath) {
        var source = ImageSource.fromFileSync(imagePath);
        var imageFile = File.fromPath(imagePath);
        var binary = imageFile.readSync();
        return {
            path: imagePath,
            source: source,
            binary: binary
        };
    };
    CameraEventListener.prototype.onImageCaptured = function (type, count, total, imagePath, inferences, darkness, lightness, sharpness) {
        var _a;
        var inferencesJsArray = new Array();
        for (var i = 0; i < inferences.size(); i++) {
            var modelKey = inferences.get(i).first;
            var javaArray = inferences.get(i).second;
            var modelOutput = [];
            for (var k = 0; k < javaArray.length; k++) {
                modelOutput.push(javaArray[k]);
            }
            inferencesJsArray.push((_a = {},
                _a[modelKey] = modelOutput,
                _a));
        }
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
                inferences: inferencesJsArray,
                darkness: darkness,
                lightness: lightness,
                sharpness: sharpness
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
        Interfaces([ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener])
    ], CameraEventListener);
    return CameraEventListener;
}(java.lang.Object));
//# sourceMappingURL=Yoonit.Camera.android.js.map