import { ContentView, } from '@nativescript/core';
import Validator from "./helpers/Validator";
const { ValidateProps, Required, RegexNumber, RegexPX, PercentageToNumber, RegexPercentage, NumberToPixel, } = Validator;
export class CameraBase extends ContentView {
    set initialLens(value) { this.setLens(value); }
    set captureType(value) { this.startCapture(value); }
    set numberOfImages(value) { this.setNumberOfImages(value); }
    set timeBetweenImages(value) { this.setTimeBetweenImages(value); }
    set outputImageWidth(value) { this.setOutputImageWidth(value); }
    set outputImageHeight(value) { this.setOutputImageHeight(value); }
    set faceMinSize(value) { this.setFaceCaptureMinSize(value); }
    set faceMaxSize(value) { this.setFaceCaptureMaxSize(value); }
    set faceDetectionBox(value) { this.setFaceDetectionBox(value); }
    set saveImageCaptured(value) { this.setSaveImageCaptured(value); }
    set faceROI(value) { this.setFaceROIEnable(value); }
    set faceROITopOffset(value) { this.setFaceROITopOffset(value); }
    set faceROIRightOffset(value) { this.setFaceROIRightOffset(value); }
    set faceROIBottomOffset(value) { this.setFaceROIBottomOffset(value); }
    set faceROILeftOffset(value) { this.setFaceROILeftOffset(value); }
    set faceROIMinSize(value) { this.setFaceROIMinSize(value); }
    requestPermission(explanationText) {
        return new Promise((resolve, reject) => resolve());
    }
    hasPermission() { return false; }
    setLens(lens) {
        this.getLens() !== lens && this.toggleLens();
    }
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
        return this.nativeView.getCameraLens() === 0 ? 'front' : 'back';
    }
    startCapture(type) {
        this.nativeView.startCaptureType(type);
    }
    setNumberOfImages(numberOfImages) {
        this.nativeView.setNumberOfImages(numberOfImages);
    }
    setTimeBetweenImages(milliseconds) {
        this.nativeView.setTimeBetweenImages(milliseconds);
    }
    setOutputImageWidth(width) {
        this.nativeView.setOutputImageWidth(width);
    }
    setOutputImageHeight(height) {
        this.nativeView.setOutputImageHeight(height);
    }
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
    setSaveImageCaptured(enable) {
        this.nativeView.setSaveImageCaptured(enable);
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
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setLens", null);
__decorate([
    ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none']),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "startCapture", null);
__decorate([
    ValidateProps('numberOfImages', RegexNumber),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setNumberOfImages", null);
__decorate([
    ValidateProps('timeBetweenImages', RegexNumber),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setTimeBetweenImages", null);
__decorate([
    ValidateProps('outputImageWidth', RegexPX),
    NumberToPixel,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setOutputImageWidth", null);
__decorate([
    ValidateProps('outputImageHeight', RegexPX),
    NumberToPixel,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setOutputImageHeight", null);
__decorate([
    ValidateProps('faceDetectionBox', [false, true]),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceDetectionBox", null);
__decorate([
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFacePaddingPercent", null);
__decorate([
    ValidateProps('faceMinSize', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceCaptureMinSize", null);
__decorate([
    ValidateProps('faceMaxSize', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceCaptureMaxSize", null);
__decorate([
    ValidateProps('saveImageCaptured', [false, true]),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setSaveImageCaptured", null);
__decorate([
    ValidateProps('faceROI', [false, true]),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIEnable", null);
__decorate([
    ValidateProps('faceROITopOffset', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROITopOffset", null);
__decorate([
    ValidateProps('faceROIRightOffset', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIRightOffset", null);
__decorate([
    ValidateProps('faceROIBottomOffset', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIBottomOffset", null);
__decorate([
    ValidateProps('faceROILeftOffset', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROILeftOffset", null);
__decorate([
    ValidateProps('faceROIMinSize', RegexPercentage),
    PercentageToNumber,
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFaceROIMinSize", null);
//# sourceMappingURL=Yoonit.Camera.common.js.map