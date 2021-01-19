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
    EventData,
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
    RegexNumber,
    RegexPX,
    PercentageToNumber,
    RegexPercentage,
    NumberToPixel,
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

    // METHODS ===================================================================
    // ===========================================================================

    public requestPermission(explanationText?: string): Promise<boolean> {
        return new Promise((resolve, reject) => resolve());
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

    public toggleLens(): void {
        this.nativeView.toggleCameraLens();
    }

    @ValidateProps('lens', ['front', 'back'])
    public setCameraLens(@Required lens: string): void {
        this.nativeView.setCameraLens(lens);
    }

    public getLens(): string {
        return this.nativeView.getCameraLens();
    }

    public startCapture(type: string): void {
        this.startCaptureType(type);
    }

    @ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none'])
    public startCaptureType(@Required type: string): void {
        this.nativeView.startCaptureType(type);
    }

    @ValidateProps('imageCaptureAmount', RegexNumber)
    public setImageCaptureAmount(@Required amount: number): void {
        this.nativeView.setNumberOfImages(amount);
    }

    @ValidateProps('imageCaptureInterval', RegexNumber)
    public setImageCaptureInterval(@Required interval: number): void {
        this.nativeView.setTimeBetweenImages(interval);
    }

    @ValidateProps('imageCaptureWidth', RegexPX)
    @NumberToPixel
    public setImageCaptureWidth(@Required width): void {
        this.nativeView.setOutputImageWidth(width);
    }

    @ValidateProps('imageCaptureHeight', RegexPX)
    @NumberToPixel
    public setImageCaptureHeight(@Required height): void {
        this.nativeView.setOutputImageHeight(height);
    }

    @ValidateProps('imageCapture', [false, true])
    public setImageCapture(@Required enable: boolean): void {
        this.nativeView.setSaveImageCaptured(enable);
    }

    public setImageCaptureColorEncoding(colorEncoding: string): void {}

    @ValidateProps('faceDetectionBox', [false, true])
    public setFaceDetectionBox(@Required enable: boolean): void {
        this.nativeView.setFaceDetectionBox(enable);
    }

    @PercentageToNumber
    public setFacePaddingPercent(@Required percentage): void {
        this.nativeView.setFacePaddingPercent(percentage);
    }

    @ValidateProps('faceMinSize', RegexPercentage)
    @PercentageToNumber
    public setFaceCaptureMinSize(@Required percentage): void {
        this.nativeView.setFaceCaptureMinSize(percentage);
    }

    @ValidateProps('faceMaxSize', RegexPercentage)
    @PercentageToNumber
    public setFaceCaptureMaxSize(@Required percentage): void {
        this.nativeView.setFaceCaptureMaxSize(percentage);
    }

    @ValidateProps('faceROI', [false, true])
    public setFaceROIEnable(@Required enable: boolean): void {
        this.nativeView.setFaceROIEnable(enable);
    }

    @ValidateProps('faceROITopOffset', RegexPercentage)
    @PercentageToNumber
    public setFaceROITopOffset(@Required percentage): void {
        this.nativeView.setFaceROITopOffset(percentage);
    }

    @ValidateProps('faceROIRightOffset', RegexPercentage)
    @PercentageToNumber
    public setFaceROIRightOffset(@Required percentage): void {
        this.nativeView.setFaceROIRightOffset(percentage);
    }

    @ValidateProps('faceROIBottomOffset', RegexPercentage)
    @PercentageToNumber
    public setFaceROIBottomOffset(@Required percentage): void {
        this.nativeView.setFaceROIBottomOffset(percentage);
    }

    @ValidateProps('faceROILeftOffset', RegexPercentage)
    @PercentageToNumber
    public setFaceROILeftOffset(@Required percentage): void {
        this.nativeView.setFaceROILeftOffset(percentage);
    }

    @ValidateProps('faceROIMinSize', RegexPercentage)
    @PercentageToNumber
    public setFaceROIMinSize(@Required percentage): void {
        this.nativeView.setFaceROIMinSize(percentage);
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
