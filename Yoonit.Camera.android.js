var CameraEventListener_1;
import { CameraBase } from './Yoonit.Camera.common';
import * as permissions from 'nativescript-permissions';
import { ImageSource } from '@nativescript/core';
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
    }
    disposeNativeView() {
        this.nativeView.stopCapture();
        this.nativeView.setCameraEventListener(null);
        this.nativeView.owner = null;
        super.disposeNativeView();
    }
    startCapture(captureType) {
        this.nativeView.startCaptureType(captureType);
    }
    setFaceNumberOfImages(faceNumberOfImages) {
        this.nativeView.setFaceNumberOfImages(faceNumberOfImages);
    }
    setFaceDetectionBox(faceDetectionBox) {
        this.nativeView.setFaceDetectionBox(faceDetectionBox);
    }
    setFaceTimeBetweenImages(faceTimeBetweenImages) {
        this.nativeView.setFaceTimeBetweenImages(faceTimeBetweenImages);
    }
    setFacePaddingPercent(facePaddingPercent) {
        this.nativeView.setFacePaddingPercent(facePaddingPercent);
    }
    setFaceImageSize(width, height) {
        this.nativeView.setFaceImageSize(width, height);
    }
    setFrameNumberOfImages(frameNumberOfImages) {
        this.nativeView.setFrameNumberOfImages(frameNumberOfImages);
    }
    setFrameTimeBetweenImages(frameTimeBetweenImages) {
        this.nativeView.setFrameTimeBetweenImages(frameTimeBetweenImages);
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
}
let CameraEventListener = CameraEventListener_1 = class CameraEventListener extends java.lang.Object {
    constructor(owner) {
        super();
        this.owner = owner;
        return global.__native(this);
    }
    static initWithOwner(owner) {
        return new CameraEventListener_1(owner);
    }
    onFaceImageCreated(count, total, imagePath) {
        const owner = this.owner.get();
        const imageSource = ImageSource.fromFileSync(imagePath);
        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count,
                total,
                image: {
                    path: imagePath,
                    source: imageSource
                }
            });
        }
    }
    onFrameImageCreated(count, total, imagePath) {
        const owner = this.owner.get();
        const imageSource = ImageSource.fromFileSync(imagePath);
        if (owner) {
            owner.notify({
                eventName: 'frameImage',
                object: owner,
                count,
                total,
                image: {
                    path: imagePath,
                    source: imageSource
                }
            });
        }
    }
    onFaceDetected(x, y, width, height) {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x,
                y,
                width,
                height
            });
        }
    }
    onFaceUndetected() {
        const owner = this.owner.get();
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
    }
    onEndCapture() {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'endCapture',
                object: owner,
            });
        }
    }
    onBarcodeScanned(content) {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content
            });
        }
    }
    onError(error) {
        const owner = this.owner.get();
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
    }
    onMessage(message) {
        const owner = this.owner.get();
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
    }
    onPermissionDenied() {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'permissionDenied',
                object: owner,
            });
        }
    }
};
CameraEventListener = CameraEventListener_1 = __decorate([
    Interfaces([ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener]),
    NativeClass(),
    __metadata("design:paramtypes", [WeakRef])
], CameraEventListener);
//# sourceMappingURL=Yoonit.Camera.android.js.map