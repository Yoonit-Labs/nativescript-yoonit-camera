import { ContentView } from '@nativescript/core';
export class CameraBase extends ContentView {
    requestPermission(explanationText) {
        return new Promise((resolve, reject) => resolve());
    }
    hasPermission() { return false; }
    preview() {
        this.nativeView.startPreview();
    }
    stopCapture() {
        this.nativeView.stopCapture();
    }
    setLens(lens) {
        this.getLens() !== lens && this.toggleLens();
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
    setFaceSaveImages(faceSaveImages) { }
    setFaceTimeBetweenImages(faceTimeBetweenImages) { }
    setFacePaddingPercent(facePaddingPercent) { }
    setFaceImageSize(width, height) { }
    setFaceCaptureMinSize(faceCaptureMinSize) { }
    setFaceCaptureMaxSize(faceCaptureMaxSize) { }
    setFrameNumberOfImages(frameNumberOfImages) { }
    setFrameTimeBetweenImages(frameTimeBetweenImages) { }
    setFaceROIEnable(faceROIEnable) { }
    setFaceROIOffset(topOffset, rightOffset, bottomOffset, leftOffset) { }
    setFaceROIMinSize(minimumSize) { }
}
//# sourceMappingURL=Yoonit.Camera.common.js.map