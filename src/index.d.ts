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

export interface ImageCapturedEventData extends EventData {
    type: string;
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

export interface QRCodeScannedEventData extends EventData {
    content: string;
}

export interface StatusEventData extends EventData {
    status: any;
}

export declare class Camera extends ContentView {
    requestPermission(explanationText?: string): Promise<boolean>;
    hasPermission(): boolean;
    preview(): void;
    stopCapture(): void;
    destroy(): void;
    toggleLens(): void;
    setCameraLens(lens: string): void;
    getLens(): string;
    startCapture(type: string): void;

    setImageCapture(enable: boolean): void;
    setImageCaptureAmount(numberOfImages: number): void;
    setImageCaptureInterval(milliseconds: number): void;
    setImageCaptureWidth(percentage: number): void;
    setImageCaptureHeight(percentage: number): void;
    setImageCaptureColorEncoding(colorEncoding: string): void;

    setFacePaddingPercent(percentage: string): void;
    setFaceCaptureMinSize(percentage: string): void;
    setFaceCaptureMaxSize(percentage: string): void;
    setFaceDetectionBox(enable: boolean): void;

    setFaceROIEnable(enable: boolean): void;
    setFaceROITopOffset(percentage): void;
    setFaceROIRightOffset(percentage): void;
    setFaceROIBottomOffset(percentage): void;
    setFaceROILeftOffset(percentage): void;
    setFaceROIMinSize(percentage: string): void;

    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: imageCaptured, callback: (args: ImageCapturedEventData) => void, thisArg?: any);
    on(event: faceDetected, callback: (args: FaceDetectedEventData) => void, thisArg?: any);
    on(event: endCapture, callback: () => void, thisArg?: any);
    on(event: qrCodeContent, callback: (args: QRCodeScannedEventData) => void, thisArg?: any);
    on(event: status, callback: (args: MessageEventData) => void, thisArg?: any);
    on(event: permissionDenied, callback: () => void, thisArg?: any);
}
