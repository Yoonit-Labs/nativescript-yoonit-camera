import { ContentView } from '@nativescript/core';
import Validator from "./helpers/Validator";
const { ValidateProps, Required, NativeMethod, RegexNumber, RegexPX, PercentageToNumber, RegexPercentage, NumberToPixel, ParseToNsColor, RegexColor } = Validator;
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
    set detectionBox(value) {
        this.setDetectionBox(value);
    }
    set detectionBoxColor(value) {
        this.setDetectionBoxColor(value);
    }
    set detectionMinSize(value) {
        this.setDetectionMinSize(value);
    }
    set detectionMaxSize(value) {
        this.setDetectionMaxSize(value);
    }
    set roi(value) {
        this.setROI(value);
    }
    set roiTopOffset(value) {
        this.setROITopOffset(value);
    }
    set roiRightOffset(value) {
        this.setROIRightOffset(value);
    }
    set roiBottomOffset(value) {
        this.setROIBottomOffset(value);
    }
    set roiLeftOffset(value) {
        this.setROILeftOffset(value);
    }
    set roiAreaOffsetColor(value) {
        this.setROIAreaOffsetColor(value);
    }
    set roiAreaOffset(value) {
        this.setROIAreaOffset(value);
    }
    set faceContours(value) {
        this.setFaceContours(value);
    }
    set faceContoursColor(value) {
        this.setFaceContoursColor(value);
    }
    set computerVision(value) {
        this.setComputerVision(value);
    }
    set torch(value) {
        this.setTorch(value);
    }
    requestPermission(explanationText) {
        return new Promise((resolve, reject) => resolve(true));
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
    setFacePaddingPercent(percentage) {
        this.nativeView.setFacePaddingPercent(percentage);
    }
    setDetectionBox(enable) {
        this.nativeView.setDetectionBox(enable);
    }
    setDetectionBoxColor(color) {
        this.nativeView.setDetectionBoxColor(...color);
    }
    setDetectionMinSize(percentage) {
        this.nativeView.setDetectionMinSize(percentage);
    }
    setDetectionMaxSize(percentage) {
        this.nativeView.setDetectionMaxSize(percentage);
    }
    setROI(enable) {
        this.nativeView.setROI(enable);
    }
    setROITopOffset(percentage) {
        this.nativeView.setROITopOffset(percentage);
    }
    setROIRightOffset(percentage) {
        this.nativeView.setROIRightOffset(percentage);
    }
    setROIBottomOffset(percentage) {
        this.nativeView.setROIBottomOffset(percentage);
    }
    setROILeftOffset(percentage) {
        this.nativeView.setROILeftOffset(percentage);
    }
    setROIAreaOffset(enable) {
        this.nativeView.setROIAreaOffset(enable);
    }
    setROIAreaOffsetColor(color) {
        this.nativeView.setROIAreaOffsetColor(...color);
    }
    setFaceContours(enable) { }
    setFaceContoursColor(color) { }
    setComputerVision(enable) { }
    setComputerVisionLoadModels(modelPaths) { }
    computerVisionClearModels() { }
    setTorch(enable) {
        this.nativeView.setTorch(enable);
    }
}
__decorate([
    ValidateProps('lens', ['front', 'back']),
    NativeMethod({ name: 'setCameraLens', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setCameraLens", null);
__decorate([
    ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none']),
    NativeMethod({ name: 'startCaptureType', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "startCapture", null);
__decorate([
    ValidateProps('imageCaptureAmount', RegexNumber),
    NativeMethod({ name: 'setNumberOfImages', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureAmount", null);
__decorate([
    ValidateProps('imageCaptureInterval', RegexNumber),
    NativeMethod({ name: 'setTimeBetweenImages', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureInterval", null);
__decorate([
    ValidateProps('imageCaptureWidth', RegexPX),
    NumberToPixel,
    NativeMethod({ name: 'setOutputImageWidth', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureWidth", null);
__decorate([
    ValidateProps('imageCaptureHeight', RegexPX),
    NumberToPixel,
    NativeMethod({ name: 'setOutputImageHeight', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCaptureHeight", null);
__decorate([
    ValidateProps('imageCapture', [false, true]),
    NativeMethod({ name: 'setSaveImageCaptured', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setImageCapture", null);
__decorate([
    PercentageToNumber,
    NativeMethod({ name: 'setFacePaddingPercent', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setFacePaddingPercent", null);
__decorate([
    ValidateProps('detectionBox', [false, true]),
    NativeMethod({ name: 'setDetectionBox', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setDetectionBox", null);
__decorate([
    ValidateProps('detectionBoxColor', RegexColor),
    ParseToNsColor,
    NativeMethod({ name: 'setDetectionBoxColor', length: 4 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setDetectionBoxColor", null);
__decorate([
    ValidateProps('detectionMinSize', RegexPercentage),
    PercentageToNumber,
    NativeMethod({ name: 'setDetectionMinSize', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setDetectionMinSize", null);
__decorate([
    ValidateProps('detectionMaxSize', RegexPercentage),
    PercentageToNumber,
    NativeMethod({ name: 'setDetectionMaxSize', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setDetectionMaxSize", null);
__decorate([
    ValidateProps('roi', [false, true]),
    NativeMethod({ name: 'setROI', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROI", null);
__decorate([
    ValidateProps('roiTopOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod({ name: 'setROITopOffset', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROITopOffset", null);
__decorate([
    ValidateProps('roiRightOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod({ name: 'setROIRightOffset', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROIRightOffset", null);
__decorate([
    ValidateProps('roiBottomOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod({ name: 'setROIBottomOffset', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROIBottomOffset", null);
__decorate([
    ValidateProps('roiLeftOffset', RegexPercentage),
    PercentageToNumber,
    NativeMethod({ name: 'setROILeftOffset', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROILeftOffset", null);
__decorate([
    ValidateProps('roiAreaOffset', [false, true]),
    NativeMethod({ name: 'setROIAreaOffset', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROIAreaOffset", null);
__decorate([
    ValidateProps('roiAreaOffsetColor', RegexColor),
    ParseToNsColor,
    NativeMethod({ name: 'setROIAreaOffsetColor', length: 4 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setROIAreaOffsetColor", null);
__decorate([
    ValidateProps('torch', [false, true]),
    NativeMethod({ name: 'setTorch', length: 1 }),
    __param(0, Required),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], CameraBase.prototype, "setTorch", null);
//# sourceMappingURL=Yoonit.Camera.common.js.map