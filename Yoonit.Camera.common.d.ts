import { ContentView, EventData } from '@nativescript/core';
import { Camera as CameraDefinition, StatusEventData, ImageCapturedEventData, FaceDetectedEventData, QRCodeScannedEventData } from '.';
export declare abstract class CameraBase extends ContentView implements CameraDefinition {
    set lens(value: string);
    set captureType(value: string);
    set imageCapture(value: boolean);
    set imageCaptureAmount(value: number);
    set imageCaptureInterval(value: number);
    set imageCaptureWidth(value: number);
    set imageCaptureHeight(value: number);
    set colorEncoding(value: string);
    set detectionBox(value: boolean);
    set detectionBoxColor(value: string);
    set detectionMinSize(value: string);
    set detectionMaxSize(value: string);
    set detectionTopSize(value: number);
    set detectionRightSize(value: number);
    set detectionBottomSize(value: number);
    set detectionLeftSize(value: number);
    set roi(value: boolean);
    set roiTopOffset(value: string);
    set roiRightOffset(value: string);
    set roiBottomOffset(value: string);
    set roiLeftOffset(value: string);
    set roiAreaOffsetColor(value: string);
    set roiAreaOffset(value: boolean);
    set faceContours(value: boolean);
    set faceContoursColor(value: string);
    set computerVision(value: boolean);
    set torch(value: boolean);
    requestPermission(explanationText?: string): Promise<boolean>;
    hasPermission(): boolean;
    preview(): void;
    stopCapture(): void;
    destroy(): void;
    toggleLens(): void;
    setCameraLens(lens: string): void;
    getLens(): string;
    startCapture(type: string): void;
    setImageCaptureAmount(amount: number): void;
    setImageCaptureInterval(interval: number): void;
    setImageCaptureWidth(width: any): void;
    setImageCaptureHeight(height: any): void;
    setImageCapture(enable: boolean): void;
    setImageCaptureColorEncoding(colorEncoding: string): void;
    setDetectionBox(enable: boolean): void;
    setDetectionBoxColor(color: any): void;
    setDetectionMinSize(percentage: any): void;
    setDetectionMaxSize(percentage: any): void;
    setDetectionTopSize(percentage: any): void;
    setDetectionRightSize(percentage: any): void;
    setDetectionBottomSize(percentage: any): void;
    setDetectionLeftSize(percentage: any): void;
    setROI(enable: boolean): void;
    setROITopOffset(percentage: any): void;
    setROIRightOffset(percentage: any): void;
    setROIBottomOffset(percentage: any): void;
    setROILeftOffset(percentage: any): void;
    setROIAreaOffset(enable: boolean): void;
    setROIAreaOffsetColor(color: any): void;
    setFaceContours(enable: boolean): void;
    setFaceContoursColor(color: string): void;
    setComputerVision(enable: boolean): void;
    setComputerVisionLoadModels(modelPaths: Array<String>): void;
    computerVisionClearModels(): void;
    setTorch(enable: boolean): void;
}
export interface CameraBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any): any;
    on(event: "imageCaptured", callback: (args: ImageCapturedEventData) => void, thisArg?: any): any;
    on(event: "faceDetected", callback: (args: FaceDetectedEventData) => void, thisArg?: any): any;
    on(event: "endCapture", callback: () => void, thisArg?: any): any;
    on(event: "qrCodeContent", callback: (args: QRCodeScannedEventData) => void, thisArg?: any): any;
    on(event: "status", callback: (args: StatusEventData) => void, thisArg?: any): any;
    on(event: "permissionDenied", callback: () => void, thisArg?: any): any;
}
