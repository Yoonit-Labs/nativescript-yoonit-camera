// +-+-+-+-+-+-+
// |y|o|o|n|i|t|
// +-+-+-+-+-+-+
//
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// | Yoonit Camera Plugin for NativeScript applications              |
// | Luigui Delyer, Haroldo Teruya, Victor Goulart                   |
// | Gabriel Rizzo & Márcio Bruffato @ Cyberlabs AI 2020-2021        |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

import {
    ContentView,
    EventData
} from '@nativescript/core';
import {
    Camera as CameraDefinition,
    StatusEventData,
    ImageCapturedEventData,
    FaceDetectedEventData,
    QRCodeScannedEventData,
} from '.';
import Validator from "./helpers/Validator";

const {
    ValidateProps,
    Required,
    NativeMethod,
    NativeAttribute,
    RegexNumber,
    RegexPX,
    PercentageToNumber,
    RegexPercentage,
    NumberToPixel,
    ParseToNsColor,
    RegexColor
} = Validator;

export abstract class CameraBase extends ContentView implements CameraDefinition {

    // PROPERTIES ================================================================
    // ===========================================================================

    public set lens(value: string) {
        this.setCameraLens(value);
    }

    public set captureType(value: string) {
        this.startCapture(value);
    }

    public set imageCapture(value: boolean) {
        this.setImageCapture(value);
    }

    public set imageCaptureAmount(value: number) {
        this.setImageCaptureAmount(value);
    }

    public set imageCaptureInterval(value: number) {
        this.setImageCaptureInterval(value);
    }

    public set imageCaptureWidth(value: number) {
        this.setImageCaptureWidth(value);
    }

    public set imageCaptureHeight(value: number) {
        this.setImageCaptureHeight(value);
    }

    public set colorEncoding(value: string) {
        this.setImageCaptureColorEncoding(value);
    }

    public set detectionBox(value: boolean) {
        this.setDetectionBox(value);
    }

    public set detectionBoxColor(value: string) {
        this.setDetectionBoxColor(value);
    }

    public set detectionMinSize(value: string) {
        this.setDetectionMinSize(value);
    }

    public set detectionMaxSize(value: string) {
        this.setDetectionMaxSize(value);
    }

    public set detectionTopSize(value: number) {
        this.setDetectionTopSize(value);
    }

    public set detectionRightSize(value: number) {
        this.setDetectionRightSize(value);
    }

    public set detectionBottomSize(value: number) {
        this.setDetectionBottomSize(value);
    }

    public set detectionLeftSize(value: number) {
        this.setDetectionLeftSize(value);
    }

    public set roi(value: boolean) {
        this.setROI(value);
    }

    public set roiTopOffset(value: string) {
        this.setROITopOffset(value);
    }

    public set roiRightOffset(value: string) {
        this.setROIRightOffset(value);
    }

    public set roiBottomOffset(value: string) {
        this.setROIBottomOffset(value);
    }

    public set roiLeftOffset(value: string) {
        this.setROILeftOffset(value);
    }

    public set roiAreaOffsetColor(value: string) {
        this.setROIAreaOffsetColor(value);
    }

    public set roiAreaOffset(value: boolean) {
        this.setROIAreaOffset(value);
    }

    public set faceContours(value: boolean) {
        this.setFaceContours(value);
    }

    public set faceContoursColor(value: string) {
        this.setFaceContoursColor(value);
    }

    public set computerVision(value: boolean) {
        this.setComputerVision(value);
    }

    public set torch(value: boolean) {
        this.setTorch(value);
    }

    // METHODS ===================================================================
    // ===========================================================================

    public requestPermission(explanationText?: string): Promise<boolean> {
        return new Promise((resolve, reject) => resolve(true));
    }

    public hasPermission(): boolean {
        return false;
    }

    public preview(): void {
        this.nativeView.startPreview();
    }

    public stopCapture(): void {
        this.nativeView.stopCapture();
    }

    public destroy(): void {
        this.nativeView.destroy();
    }

    public toggleLens(): void {
        this.nativeView.toggleCameraLens();
    }

    @ValidateProps('lens', ['front', 'back'])
    @NativeMethod({ name: 'setCameraLens', length: 1 })
    public setCameraLens(@Required lens: string): void {
        this.nativeView.setCameraLens(lens);
    }

    public getLens(): string {
        return this.nativeView.getCameraLens();
    }

    @ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none'])
    @NativeMethod({ name: 'startCaptureType', length: 1 })
    public startCapture(@Required type: string): void {
        this.nativeView.startCaptureType(type);
    }

    @ValidateProps('imageCaptureAmount', RegexNumber)
    @NativeMethod({ name: 'setNumberOfImages', length: 1 })
    public setImageCaptureAmount(@Required amount: number): void {
        this.nativeView.setNumberOfImages(amount);
    }

    @ValidateProps('imageCaptureInterval', RegexNumber)
    @NativeMethod({ name: 'setTimeBetweenImages', length: 1 })
    public setImageCaptureInterval(@Required interval: number): void {
        this.nativeView.setTimeBetweenImages(interval);
    }

    @ValidateProps('imageCaptureWidth', RegexPX)
    @NumberToPixel
    @NativeMethod({ name: 'setOutputImageWidth', length: 1 })
    public setImageCaptureWidth(@Required width): void {
        this.nativeView.setOutputImageWidth(width);
    }

    @ValidateProps('imageCaptureHeight', RegexPX)
    @NumberToPixel
    @NativeMethod({ name: 'setOutputImageHeight', length: 1 })
    public setImageCaptureHeight(@Required height): void {
        this.nativeView.setOutputImageHeight(height);
    }

    @ValidateProps('imageCapture', [false, true])
    @NativeMethod({ name: 'setSaveImageCaptured', length: 1 })
    public setImageCapture(@Required enable: boolean): void {
        this.nativeView.setSaveImageCaptured(enable);
    }

    public setImageCaptureColorEncoding(colorEncoding: string): void {}

    @ValidateProps('detectionBox', [false, true])
    @NativeMethod({ name: 'setDetectionBox', length: 1 })
    public setDetectionBox(@Required enable: boolean): void {
        this.nativeView.setDetectionBox(enable);
    }

    @ValidateProps('detectionBoxColor', RegexColor)
    @ParseToNsColor
    @NativeMethod({ name: 'setDetectionBoxColor', length: 4 })
    public setDetectionBoxColor(@Required color) {
        this.nativeView.setDetectionBoxColor(...color);
    }

    @ValidateProps('detectionMinSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setDetectionMinSize', length: 1 })
    public setDetectionMinSize(@Required percentage): void {
        this.nativeView.setDetectionMinSize(percentage);
    }

    @ValidateProps('detectionMaxSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setDetectionMaxSize', length: 1 })
    public setDetectionMaxSize(@Required percentage): void {
        this.nativeView.setDetectionMaxSize(percentage);
    }

    @ValidateProps('detectionTopSize', RegexPercentage)
    @PercentageToNumber
    @NativeAttribute('detectionTopSize')
    public setDetectionTopSize(@Required percentage): void {
        this.nativeView.detectionTopSize = percentage;
    }

    @ValidateProps('detectionRightSize', RegexPercentage)
    @PercentageToNumber
    @NativeAttribute('detectionRightSize')
    public setDetectionRightSize(@Required percentage): void {
        this.nativeView.detectionRightSize = percentage;
    }

    @ValidateProps('detectionBottomSize', RegexPercentage)
    @PercentageToNumber
    @NativeAttribute('detectionBottomSize')
    public setDetectionBottomSize(@Required percentage): void {
        this.nativeView.detectionBottomSize = percentage;
    }

    @ValidateProps('detectionLeftSize', RegexPercentage)
    @PercentageToNumber
    @NativeAttribute('detectionLeftSize')
    public setDetectionLeftSize(@Required percentage): void {
        this.nativeView.detectionLeftSize = percentage;
    }

    @ValidateProps('roi', [false, true])
    @NativeMethod({ name: 'setROI', length: 1 })
    public setROI(@Required enable: boolean): void {
        this.nativeView.setROI(enable);
    }

    @ValidateProps('roiTopOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setROITopOffset', length: 1 })
    public setROITopOffset(@Required percentage): void {
        this.nativeView.setROITopOffset(percentage);
    }

    @ValidateProps('roiRightOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setROIRightOffset', length: 1 })
    public setROIRightOffset(@Required percentage): void {
        this.nativeView.setROIRightOffset(percentage);
    }

    @ValidateProps('roiBottomOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setROIBottomOffset', length: 1 })
    public setROIBottomOffset(@Required percentage): void {
        this.nativeView.setROIBottomOffset(percentage);
    }

    @ValidateProps('roiLeftOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setROILeftOffset', length: 1 })
    public setROILeftOffset(@Required percentage): void {
        this.nativeView.setROILeftOffset(percentage);
    }

    @ValidateProps('roiAreaOffset', [false, true])
    @NativeMethod({ name: 'setROIAreaOffset', length: 1 })
    public setROIAreaOffset(@Required enable: boolean) {
        this.nativeView.setROIAreaOffset(enable);
    }

    @ValidateProps('roiAreaOffsetColor', RegexColor)
    @ParseToNsColor
    @NativeMethod({ name: 'setROIAreaOffsetColor', length: 4 })
    public setROIAreaOffsetColor(@Required color) {
        this.nativeView.setROIAreaOffsetColor(...color);
    }

    public setFaceContours(enable: boolean) {}

    public setFaceContoursColor(color: string) {}

    public setComputerVision(enable: boolean) {}

    public setComputerVisionLoadModels(modelPaths: Array<String>): void {}

    public computerVisionClearModels(): void {}

    @ValidateProps('torch', [false, true])
    @NativeMethod({ name: 'setTorch', length: 1 })
    public setTorch(@Required enable: boolean) {
        this.nativeView.setTorch(enable);
    }
}

export interface CameraBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: "imageCaptured", callback: (args: ImageCapturedEventData) => void, thisArg?: any);
    on(event: "faceDetected", callback: (args: FaceDetectedEventData) => void, thisArg?: any);
    on(event: "endCapture", callback: () => void, thisArg?: any);
    on(event: "qrCodeContent", callback: (args: QRCodeScannedEventData) => void, thisArg?: any);
    on(event: "status", callback: (args: StatusEventData) => void, thisArg?: any);
    on(event: "permissionDenied", callback: () => void, thisArg?: any);
}
