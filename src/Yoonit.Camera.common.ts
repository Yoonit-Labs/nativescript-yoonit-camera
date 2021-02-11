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
    Color
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

    public destroy(): void {
        this.nativeView.destroy();
    }

    public toggleLens(): void {
        this.nativeView.toggleCameraLens();
    }

    @ValidateProps('lens', ['front', 'back'])
    @NativeMethod('setCameraLens')
    public setCameraLens(@Required lens: string): void {
        this.nativeView.setCameraLens(lens);
    }

    public getLens(): string {
        return this.nativeView.getCameraLens();
    }

    @ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none'])
    @NativeMethod('startCaptureType')
    public startCapture(@Required type: string): void {
        this.nativeView.startCaptureType(type);
    }

    @ValidateProps('imageCaptureAmount', RegexNumber)
    @NativeMethod('setNumberOfImages')
    public setImageCaptureAmount(@Required amount: number): void {
        this.nativeView.setNumberOfImages(amount);
    }

    @ValidateProps('imageCaptureInterval', RegexNumber)
    @NativeMethod('setTimeBetweenImages')
    public setImageCaptureInterval(@Required interval: number): void {
        this.nativeView.setTimeBetweenImages(interval);
    }

    @ValidateProps('imageCaptureWidth', RegexPX)
    @NumberToPixel
    @NativeMethod('setOutputImageWidth')
    public setImageCaptureWidth(@Required width): void {
        this.nativeView.setOutputImageWidth(width);
    }

    @ValidateProps('imageCaptureHeight', RegexPX)
    @NumberToPixel
    @NativeMethod('setOutputImageHeight')
    public setImageCaptureHeight(@Required height): void {
        this.nativeView.setOutputImageHeight(height);
    }

    @ValidateProps('imageCapture', [false, true])
    @NativeMethod('setSaveImageCaptured')
    public setImageCapture(@Required enable: boolean): void {
        this.nativeView.setSaveImageCaptured(enable);
    }

    public setImageCaptureColorEncoding(colorEncoding: string): void {}

    @ValidateProps('faceDetectionBox', [false, true])
    @NativeMethod('setFaceDetectionBox')
    public setFaceDetectionBox(@Required enable: boolean): void {
        this.nativeView.setFaceDetectionBox(enable);
    }

    @PercentageToNumber
    @NativeMethod('setFacePaddingPercent')
    public setFacePaddingPercent(@Required percentage): void {
        this.nativeView.setFacePaddingPercent(percentage);
    }

    @ValidateProps('faceMinSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceCaptureMinSize')
    public setFaceCaptureMinSize(@Required percentage): void {
        this.nativeView.setFaceCaptureMinSize(percentage);
    }

    @ValidateProps('faceMaxSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceCaptureMaxSize')
    public setFaceCaptureMaxSize(@Required percentage): void {
        this.nativeView.setFaceCaptureMaxSize(percentage);
    }

    @ValidateProps('faceROI', [false, true])
    @NativeMethod('setFaceROIEnable')
    public setFaceROIEnable(@Required enable: boolean): void {
        this.nativeView.setFaceROIEnable(enable);
    }

    @ValidateProps('faceROITopOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceROITopOffset')
    public setFaceROITopOffset(@Required percentage): void {
        this.nativeView.setFaceROITopOffset(percentage);
    }

    @ValidateProps('faceROIRightOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceROIRightOffset')
    public setFaceROIRightOffset(@Required percentage): void {
        this.nativeView.setFaceROIRightOffset(percentage);
    }

    @ValidateProps('faceROIBottomOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceROIBottomOffset')
    public setFaceROIBottomOffset(@Required percentage): void {
        this.nativeView.setFaceROIBottomOffset(percentage);
    }

    @ValidateProps('faceROILeftOffset', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceROILeftOffset')
    public setFaceROILeftOffset(@Required percentage): void {
        this.nativeView.setFaceROILeftOffset(percentage);
    }

    @ValidateProps('faceROIMinSize', RegexPercentage)
    @PercentageToNumber
    @NativeMethod('setFaceROIMinSize')
    public setFaceROIMinSize(@Required percentage): void {
        this.nativeView.setFaceROIMinSize(percentage);
    }

    @ValidateProps('color', Validator.RegexColor)
    public setFaceROIAreaOffsetColor(@Required color: string) {
        if (!Color.isValid(color)) {
            throw new Error("[Yoonit-Camera] Invalid Color HEX");
        }

        const colorNsInstance = new Color(color)

        this.nativeView.setFaceROIAreaOffsetColor(
            colorNsInstance.a,
            colorNsInstance.r,
            colorNsInstance.g,
            colorNsInstance.b
        );
    }

    @ValidateProps('faceROIAreaOffset', [false, true])
    @NativeMethod('setFaceROIAreaOffset')
    public setFaceROIAreaOffset(@Required enable: boolean) {
        this.nativeView.setFaceROIAreaOffset(enable);
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
