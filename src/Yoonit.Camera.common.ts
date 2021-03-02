// +-+-+-+-+-+-+
// |y|o|o|n|i|t|
// +-+-+-+-+-+-+
//
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// | Yoonit Camera Plugin for NativeScript applications              |
// | Luigui Delyer, Haroldo Teruya,                                  |
// | Victor Goulart & Márcio Bruffato @ Cyberlabs AI 2020            |
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

    public set faceMinSize(value: string) {
        this.setFaceCaptureMinSize(value);
    }

    public set faceMaxSize(value: string) {
        this.setFaceCaptureMaxSize(value);
    }

    public set faceDetectionBox(value: boolean) {
        this.setFaceDetectionBox(value);
    }

    public set faceROI(value: boolean) {
        this.setFaceROIEnable(value);
    }

    public set faceROITopOffset(value: string) {
        this.setFaceROITopOffset(value);
    }

    public set faceROIRightOffset(value: string) {
        this.setFaceROIRightOffset(value);
    }

    public set faceROIBottomOffset(value: string) {
        this.setFaceROIBottomOffset(value);
    }

    public set faceROILeftOffset(value: string) {
        this.setFaceROILeftOffset(value);
    }

    public set faceROIMinSize(value: string) {
        this.setFaceROIMinSize(value);
    }

    public set faceROIAreaOffsetColor(value: string) {
        this.setFaceROIAreaOffsetColor(value);
    }

    public set faceROIAreaOffset(value: boolean) {
        this.setFaceROIAreaOffset(value);
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

    @ValidateProps('faceDetectionBox', [false, true])
    @NativeMethod({ name: 'setFaceDetectionBox', length: 1 })
    public setFaceDetectionBox(@Required enable: boolean): void {
        this.nativeView.setFaceDetectionBox(enable);
    }

    @PercentageToNumber
    @NativeMethod({ name: 'setFacePaddingPercent', length: 1 })
    public setFacePaddingPercent(@Required percentage): void {
        this.nativeView.setFacePaddingPercent(percentage);
    }

    @ValidateProps('faceMinSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceCaptureMinSize', length: 1 })
    public setFaceCaptureMinSize(@Required percentage): void {
        this.nativeView.setFaceCaptureMinSize(percentage);
    }

    @ValidateProps('faceMaxSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceCaptureMaxSize', length: 1 })
    public setFaceCaptureMaxSize(@Required percentage): void {
        this.nativeView.setFaceCaptureMaxSize(percentage);
    }

    @ValidateProps('faceROI', [false, true])
    @NativeMethod({ name: 'setFaceROIEnable', length: 1 })
    public setFaceROIEnable(@Required enable: boolean): void {
        this.nativeView.setFaceROIEnable(enable);
    }

    @ValidateProps('faceROITopOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceROITopOffset', length: 1 })
    public setFaceROITopOffset(@Required percentage): void {
        this.nativeView.setFaceROITopOffset(percentage);
    }

    @ValidateProps('faceROIRightOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceROIRightOffset', length: 1 })
    public setFaceROIRightOffset(@Required percentage): void {
        this.nativeView.setFaceROIRightOffset(percentage);
    }

    @ValidateProps('faceROIBottomOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceROIBottomOffset', length: 1 })
    public setFaceROIBottomOffset(@Required percentage): void {
        this.nativeView.setFaceROIBottomOffset(percentage);
    }

    @ValidateProps('faceROILeftOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceROILeftOffset', length: 1 })
    public setFaceROILeftOffset(@Required percentage): void {
        this.nativeView.setFaceROILeftOffset(percentage);
    }

    @ValidateProps('faceROIMinSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod({ name: 'setFaceROIMinSize', length: 1 })
    public setFaceROIMinSize(@Required percentage): void {
        this.nativeView.setFaceROIMinSize(percentage);
    }

    @ValidateProps('faceROIAreaOffset', [false, true])
    @NativeMethod({ name: 'setFaceROIAreaOffset', length: 1 })
    public setFaceROIAreaOffset(@Required enable: boolean) {
        this.nativeView.setFaceROIAreaOffset(enable);
    }

    @ValidateProps('faceROIAreaOffsetColor', RegexColor)
    @ParseToNsColor
    @NativeMethod({ name: 'setFaceROIAreaOffsetColor', length: 4 })
    public setFaceROIAreaOffsetColor(@Required color) {
        this.nativeView.setFaceROIAreaOffsetColor(...color);
    }

    public setFaceContours(enable: boolean) {}

    public setFaceContoursColor(color) {}

    public setComputerVision(enable: boolean) {}

    public setComputerVisionLoadModels(modelPaths: Array<String>): void {}

    public computerVisionClearModels():void {}
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
