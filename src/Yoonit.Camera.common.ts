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

    public set initialLens(value: string) { this.setLens(value); }
    public set captureType(value: string) { this.startCapture(value); }
    public set numberOfImages(value: number) { this.setNumberOfImages(value); }
    public set timeBetweenImages(value: number) { this.setTimeBetweenImages(value); }
    public set outputImageWidth(value: number) { this.setOutputImageWidth(value); }
    public set outputImageHeight(value: number) { this.setOutputImageHeight(value); }
    public set faceMinSize(value: string) { this.setFaceCaptureMinSize(value); }
    public set faceMaxSize(value: string) { this.setFaceCaptureMaxSize(value); }
    public set faceDetectionBox(value: boolean) { this.setFaceDetectionBox(value); }
    public set saveImageCaptured(value: boolean) { this.setSaveImageCaptured(value); }
    public set faceROI(value: boolean) { this.setFaceROIEnable(value); }
    public set faceROITopOffset(value: string) { this.setFaceROITopOffset(value); }
    public set faceROIRightOffset(value: string) { this.setFaceROIRightOffset(value); }
    public set faceROIBottomOffset(value: string) { this.setFaceROIBottomOffset(value); }
    public set faceROILeftOffset(value: string) { this.setFaceROILeftOffset(value); }
    public set faceROIMinSize(value: string) { this.setFaceROIMinSize(value); }

    public requestPermission(explanationText?: string): Promise<boolean> {
        return new Promise((resolve, reject) => resolve());
    }
    public hasPermission(): boolean { return false; }

    @ValidateProps('lens', ['front', 'back'])
    public setLens(@Required lens: string): void {
        this.getLens() !== lens && this.toggleLens();
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

    public getLens(): string {
        return this.nativeView.getCameraLens() === 0 ? 'front' : 'back';
    }

    @ValidateProps('captureType', ['face', 'qrcode', 'frame', 'none'])
    public startCapture(@Required type: string): void {
        this.nativeView.startCaptureType(type);
    }

    @ValidateProps('numberOfImages', RegexNumber)
    public setNumberOfImages(@Required numberOfImages: number): void {
        this.nativeView.setNumberOfImages(numberOfImages);
    }

    @ValidateProps('timeBetweenImages', RegexNumber)
    public setTimeBetweenImages(@Required milliseconds: number): void {
        this.nativeView.setTimeBetweenImages(milliseconds);
    }

    @ValidateProps('outputImageWidth', RegexPX)
    @NumberToPixel
    public setOutputImageWidth(@Required width): void {
        this.nativeView.setOutputImageWidth(width);
    }

    @ValidateProps('outputImageHeight', RegexPX)
    @NumberToPixel
    public setOutputImageHeight(@Required height): void {
        this.nativeView.setOutputImageHeight(height);
    }

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

    @ValidateProps('saveImageCaptured', [false, true])
    public setSaveImageCaptured(@Required enable: boolean): void {
        this.nativeView.setSaveImageCaptured(enable);
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
