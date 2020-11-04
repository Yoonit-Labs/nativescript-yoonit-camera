import { ContentView } from '@nativescript/core';
export class CameraBase extends ContentView {
    preview() {
        this.nativeView.startPreview();
    }
    stopCapture() {
        this.nativeView.stopCapture();
    }
    toggleLens() {
        this.nativeView.toggleCameraLens();
    }
    getLens() {
        return this.nativeView.getCameraLens();
    }
    startCapture(captureType) { }
    setFaceNumberOfImages(faceNumberOfImages) { }
    setFaceDetectionBox(faceDetectionBox) { }
    setFaceTimeBetweenImages(faceTimeBetweenImages) { }
    setFacePaddingPercent(facePaddingPercent) { }
    setFaceImageSize(width, height) { }
    requestPermission(explanationText) {
        return new Promise((resolve, reject) => resolve());
    }
    hasPermission() { return false; }
}
//# sourceMappingURL=Yoonit.Camera.common.js.map