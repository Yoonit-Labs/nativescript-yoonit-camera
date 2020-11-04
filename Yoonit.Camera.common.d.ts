import { ContentView, EventData } from '@nativescript/core';
import { Camera as CameraDefinition, StatusEventData, FaceImageCreatedEventData, FaceDetectedEventData, BarcodeScannedEventData, FrameImageCreatedEventData } from '.';
export declare abstract class CameraBase extends ContentView implements CameraDefinition {
    preview(): void;
    stopCapture(): void;
    toggleLens(): void;
    getLens(): number;
    startCapture(captureType: string): void;
    setFaceNumberOfImages(faceNumberOfImages: number): void;
    setFaceDetectionBox(faceDetectionBox: Boolean): void;
    setFaceTimeBetweenImages(faceTimeBetweenImages: number): void;
    setFacePaddingPercent(facePaddingPercent: number): void;
    setFaceImageSize(width: number, height: number): void;
    requestPermission(explanationText?: string): Promise<boolean>;
    hasPermission(): boolean;
}
export interface CameraBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any): any;
    on(event: "faceImage", callback: (args: FaceImageCreatedEventData) => void, thisArg?: any): any;
    on(event: "frameImage", callback: (args: FrameImageCreatedEventData) => void, thisArg?: any): any;
    on(event: "faceDetected", callback: (args: FaceDetectedEventData) => void, thisArg?: any): any;
    on(event: "endCapture", callback: () => void, thisArg?: any): any;
    on(event: "qrCodeContent", callback: (args: BarcodeScannedEventData) => void, thisArg?: any): any;
    on(event: "status", callback: (args: StatusEventData) => void, thisArg?: any): any;
    on(event: "permissionDenied", callback: () => void, thisArg?: any): any;
}
