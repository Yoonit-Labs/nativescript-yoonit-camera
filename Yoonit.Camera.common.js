import { ContentView, } from '@nativescript/core';
import Validator from "./helpers/Validator";
const { ValidateProps, Required, NativeMethod, RegexNumber, RegexPX, PercentageToNumber, RegexPercentage, NumberToPixel, } = Validator;
export class CameraBase extends ContentView {
    set lens(value) {
        this.setCameraLens(value);
    }
    set captureType(value) {
        this.startCapture(value);
    }
    set imageCapture(value) {
        this.setImageCapture(value);
    }
    set imageCaptureAmount(value) {
        this.setImageCaptureAmount(value);
    }
    set imageCaptureInterval(value) {
        this.setImageCaptureInterval(value);
    }
    set imageCaptureWidth(value) {
        this.setImageCaptureWidth(value);
    }
    set imageCaptureHeight(value) {
        this.setImageCaptureHeight(value);
    }
    set colorEncoding(value) {
        this.setImageCaptureColorEncoding(value);
    }
    set faceMinSize(value) {
        this.setFaceCaptureMinSize(value);
    }
    set faceMaxSize(value) {
        this.setFaceCaptureMaxSize(value);
    }
    set faceDetectionBox(value) {
        this.setFaceDetectionBox(value);
    }
    set faceROI(value) {
        this.setFaceROIEnable(value);
    }
    set faceROITopOffset(value) {
        this.setFaceROITopOffset(value);
    }
    set faceROIRightOffset(value) {
        this.setFaceROIRightOffset(value);
    }
    set faceROIBottomOffset(value) {
        this.setFaceROIBottomOffset(value);
    }
    set faceROILeftOffset(value) {
        this.setFaceROILeftOffset(value);
    }
    set faceROIMinSize(value) {
        this.setFaceROIMinSize(value);
    }
    requestPermission(explanationText) {
        return new Promise((resolve, reject) => resolve());
    }
    hasPermission() {
        return false;
    }
    preview() {
        this.nativeView.startPreview();
    }
    stopCapture() {
        this.nativeView.stopCapture();
    }
    destroy() {
        this.nativeView.destroy();
    }
    toggleLens() {
        this.nativeView.toggleCameraLens();
    }
    setCameraLens(lens) {
        this.nativeView.setCameraLens(lens);
    }
    getLens() {
        return this.nativeView.getCameraLens();
    }
    startCapture(type) {
        this.nativeView.startCaptureType(type);
    }
    setImageCaptureAmount(amount) {
        this.nativeView.setNumberOfImages(amount);
    }
    setImageCaptureInterval(interval) {
        this.nativeView.setTimeBetweenImages(interval);
    }
    setImageCaptureWidth(width) {
        this.nativeView.setOutputImageWidth(width);
    }
    setImageCaptureHeight(height) {
        this.nativeView.setOutputImageHeight(height);
    }
    setImageCapture(enable) {
        this.nativeView.setSaveImageCaptured(enable);
    }
    setImageCaptureColorEncoding(colorEncoding) { }
    setFaceDetectionBox(enable) {
        this.nativeView.setFaceDetectionBox(enable);
    }
    setFacePaddingPercent(percentage) {
        this.nativeView.setFacePaddingPercent(percentage);
    }
    setFaceCaptureMinSize(percentage) {
        this.nativeView.setFaceCaptureMinSize(percentage);
    }
    setFaceCaptureMaxSize(percentage) {
        this.nativeView.setFaceCaptureMaxSize(percentage);
    }
    setFaceROIEnable(enable) {
        this.nativeView.setFaceROIEnable(enable);
    }
    setFaceROITopOffset(percentage) {
        this.nativeView.setFaceROITopOffset(percentage);
    }
    setFaceROIRightOffset(percentage) {
        this.nativeView.setFaceROIRightOffset(percentage);
    }
    setFaceROIBottomOffset(percentage) {
        this.nativeView.setFaceROIBottomOffset(percentage);
    }
    setFaceROILeftOffset(percentage) {
        this.nativeView.setFaceROILeftOffset(percentage);
    }
    setFaceROIMinSize(percentage) {
        this.nativeView.setFaceROIMinSize(percentage);
    }
}
__decorate([
    ValidateProps('lens', ['front', 'back']),
    NativeMethod('setCameraLens'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setCameraLens", null);
__decorate([
    ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none']),
    NativeMethod('startCaptureType'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "startCapture", null);
__decorate([
    ValidateProps('imageCaptureAmount', RegexNumber),
    NativeMethod('setNumberOfImages'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureAmount", null);
__decorate([
    ValidateProps('imageCaptureInterval', RegexNumber),
    NativeMethod('setTimeBetweenImages'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureInterval", null);
__decorate([
    ValidateProps('imageCaptureWidth', RegexPX),
    NumberToPixel,
    NativeMethod('setOutputImageWidth'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureWidth", null);
__decorate([
    ValidateProps('imageCaptureHeight', RegexPX),
    NumberToPixel,
    NativeMethod('setOutputImageHeight'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureHeight", null);
__decorate([
    ValidateProps('imageCapture', [false, true]),
    NativeMethod('setSaveImageCaptured'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCapture", null);
__decorate([
    ValidateProps('faceDetectionBox', [false, true]),
    NativeMethod('setFaceDetectionBox'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceDetectionBox", null);
__decorate([
    PercentageToNumber,
    NativeMethod('setFacePaddingPercent'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFacePaddingPercent", null);
__decorate([
    ValidateProps('faceMinSize', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceCaptureMinSize'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceCaptureMinSize", null);
__decorate([
    ValidateProps('faceMaxSize', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceCaptureMaxSize'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceCaptureMaxSize", null);
__decorate([
    ValidateProps('faceROI', [false, true]),
    NativeMethod('setFaceROIEnable'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIEnable", null);
__decorate([
    ValidateProps('faceROITopOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceROITopOffset'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROITopOffset", null);
__decorate([
    ValidateProps('faceROIRightOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceROIRightOffset'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIRightOffset", null);
__decorate([
    ValidateProps('faceROIBottomOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceROIBottomOffset'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIBottomOffset", null);
__decorate([
    ValidateProps('faceROILeftOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceROILeftOffset'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROILeftOffset", null);
__decorate([
    ValidateProps('faceROIMinSize', RegexPercentage),
    PercentageToNumber,
    NativeMethod('setFaceROIMinSize'),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIMinSize", null);
//# sourceMappingURL=Yoonit.Camera.common.js.map