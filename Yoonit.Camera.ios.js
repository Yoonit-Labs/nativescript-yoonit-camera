var CameraEventListener_1;
import { CameraBase } from './Yoonit.Camera.common';
import { ImageSource, knownFolders, path } from '@nativescript/core';
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
                case 3: {
                    this.permission = true;
                    resolve(true);
                    break;
                }
                case 1:
                case 2: {
                    this.permission = false;
                    reject(false);
                    break;
                }
            }
        });
    }
    hasPermission() {
        return this.permission;
    }
}
let CameraEventListener = CameraEventListener_1 = class CameraEventListener extends NSObject {
    static initWithOwner(owner) {
        const delegate = CameraEventListener_1.new();
        delegate.owner = owner;
        return delegate;
    }
    onFaceImageCreatedWithCountTotalImagePath(count, total, imagePath) {
        const owner = this.owner.get();
        let imageName = imagePath.split('/');
        imageName = imageName[imageName.length - 1];
        const finalPath = path.join(knownFolders.documents().path, imageName);
        const imageSource = ImageSource.fromFileSync(finalPath);
        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count,
                total,
                image: {
                    path: finalPath,
                    source: imageSource
                }
            });
        }
    }
    onFrameImageCreatedWithCountTotalImagePath(count, total, imagePath) {
        const owner = this.owner.get();
        let imageName = imagePath.split('/');
        imageName = imageName[imageName.length - 1];
        const finalPath = path.join(knownFolders.documents().path, imageName);
        const imageSource = ImageSource.fromFileSync(finalPath);
        if (owner) {
            owner.notify({
                eventName: 'frameImage',
                object: owner,
                count,
                total,
                image: {
                    path: finalPath,
                    source: imageSource
                }
            });
        }
    }
    onFaceDetectedWithXYWidthHeight(x, y, width, height) {
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
    onErrorWithError(error) {
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
    onMessageWithMessage(message) {
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
    onBarcodeScannedWithContent(content) {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content
            });
        }
    }
};
CameraEventListener = CameraEventListener_1 = __decorate([
    ObjCClass(CameraEventListenerDelegate),
    NativeClass()
], CameraEventListener);
//# sourceMappingURL=Yoonit.Camera.ios.js.map