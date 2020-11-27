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

export interface FaceImageCreatedEventData extends EventData {
    count: number;
    total: number;
    image: any;
}

export interface FrameImageCreatedEventData extends EventData {
    count: number;
    total: number;
    image: any;
}

export interface FaceDetectedEventData extends EventData {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface BarcodeScannedEventData extends EventData {
    content: string;
}

export interface StatusEventData extends EventData {
    status: any;
}

export declare class Camera extends ContentView {
    requestPermission(explanationText?: string): Promise<boolean>;
    hasPermission(): boolean;
    preview(): void;
    startCapture(captureType: string): void;
    stopCapture(): void;
    setLens(lens: number): void;
    toggleLens(): void;
    getLens(): number;
    setFaceNumberOfImages(faceNumberOfImages: number): void;
    setFaceDetectionBox(faceDetectionBox: boolean): void;
    setFaceSaveImages(faceSaveImages: Boolean): void;
    setFaceTimeBetweenImages(faceTimeBetweenImages: number): void;
    setFacePaddingPercent(facePaddingPercent: number): void;
    setFaceImageSize(width: number, height: number): void;
    setFaceCaptureMinSize(faceCaptureMinSize: number): void;
    setFaceCaptureMaxSize(faceCaptureMaxSize: number): void;
    setFrameNumberOfImages(frameNumberOfImages: number): void;
    setFrameTimeBetweenImages(frameTimeBetweenImages: number): void;
    setFaceROIEnable(faceROIEnable: boolean): void;
    setFaceROIOffset(
        topOffset: number,
        rightOffset: number,
        bottomOffset: number,
        leftOffset: number
    ): void;
    setFaceROIMinSize(minimumSize: boolean): void;

    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: faceImage, callback: (args: FaceImageCreatedEventData) => void, thisArg?: any);
    on(event: frameImage, callback: (args: FrameImageCreatedEventData) => void, thisArg?: any);
    on(event: faceDetected, callback: (args: FaceDetectedEventData) => void, thisArg?: any);
    on(event: endCapture, callback: () => void, thisArg?: any);
    on(event: qrCodeContent, callback: (args: BarCodeScannedEventData) => void, thisArg?: any);
    on(event: status, callback: (args: MessageEventData) => void, thisArg?: any);
    on(event: permissionDenied, callback: () => void, thisArg?: any);
}
