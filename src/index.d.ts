import { ContentView, EventData } from 'tns-core-modules/ui/content-view';

export interface FaceImageCreatedEventData extends EventData {
    count: number;
    total: number;
    imagePath: string;
}

export interface FaceDetectedEventData extends EventData {
    faceDetected: boolean;
}

export interface BarcodeScannedEventData extends EventData {
    content: string;
}

export interface ErrorEventData extends EventData {
    error: string;
}

export interface MessageEventData extends EventData {
    message: string;
}

export declare class Camera extends ContentView {

    requestCameraPermissions(explanationText?: string): Promise<boolean>;
    hasCameraPermission(): boolean;
    startPreview(): void;
    startCaptureType(captureType: string): void;
    stopCapture(): void;
    toggleCameraLens(): void;
    getCameraLens(): number;
    setFaceNumberOfImages(faceNumberOfImages: number): void;
    setFaceDetectionBox(faceDetectionBox: boolean): void;
    setFaceTimeBetweenImages(faceTimeBetweenImages: number): void;
    setFacePaddingPercent(facePaddingPercent: number): void;
    setFaceImageSize(faceImageSize: number): void;

    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: faceImageCreatedEvent, callback: (args: FaceImageCreated) => void, thisArg?: any);
    on(event: faceDetectedEvent, callback: (args: FaceDetectedEventData) => void, thisArg?: any);
    on(event: endCaptureEvent, callback: () => void, thisArg?: any);
    on(event: barcodeScannedEvent, callback: (args: BarCodeScannedEventData) => void, thisArg?: any);
    on(event: messageEvent, callback: (args: MessageEventData) => void, thisArg?: any);
    on(event: errorEvent, callback: (args: ErrorEventData) => void, thisArg?: any);
    on(event: permissionDeniedEvent, callback: () => void, thisArg?: any);
}
