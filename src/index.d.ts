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

export interface ImageCapturedEventData extends EventData {
    type: string;
    count: number;
    total: number;
    image: { path: string, source: any, binary: any };
    inferences: object[];
}

export interface FaceDetectedEventData extends EventData {
    x: number;
    y: number;
    width: number;
    height: number;
    leftEyeOpenProbability: number;
    rightEyeOpenProbability: number;
    smilingProbability: number;
    headEulerAngleX: number;
    headEulerAngleY: number;
    headEulerAngleZ: number;
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

    // Face Capture
    setFacePaddingPercent(percentage: string): void;
    setFaceCaptureMinSize(percentage: string): void;
    setFaceCaptureMaxSize(percentage: string): void;
    setFaceDetectionBox(enable: boolean): void;

    // Image Capture
    setImageCapture(enable: boolean): void;
    setImageCaptureAmount(numberOfImages: number): void;
    setImageCaptureInterval(milliseconds: number): void;
    setImageCaptureWidth(percentage: number): void;
    setImageCaptureHeight(percentage: number): void;
    setImageCaptureColorEncoding(colorEncoding: string): void;

    // Face ROI
    setFaceROIEnable(enable: boolean): void;
    setFaceROITopOffset(percentage: string): void;
    setFaceROIRightOffset(percentage: string): void;
    setFaceROIBottomOffset(percentage: string): void;
    setFaceROILeftOffset(percentage: string): void;
    setFaceROIMinSize(percentage: string): void;
    setFaceROIAreaOffset(enable: boolean): void;
    setFaceROIAreaOffsetColor(color: string): void;

    // Face Contours
    setFaceContours(enable: boolean): void;
    setFaceContoursColor(color: string): void;

    // Computer Vision
    setComputerVision(enable: boolean): void; // Only Android.
    setComputerVisionLoadModels(modelPaths: Array<string>): void; // Only Android.
    computerVisionClearModels(): void; // Only Android.

    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: imageCaptured, callback: (args: ImageCapturedEventData) => void, thisArg?: any);
    on(event: faceDetected, callback: (args: FaceDetectedEventData) => void, thisArg?: any);
    on(event: endCapture, callback: () => void, thisArg?: any);
    on(event: qrCodeContent, callback: (args: QRCodeScannedEventData) => void, thisArg?: any);
    on(event: status, callback: (args: MessageEventData) => void, thisArg?: any);
    on(event: permissionDenied, callback: () => void, thisArg?: any);
}
