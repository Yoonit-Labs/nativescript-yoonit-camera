import { ContentView, EventData } from 'tns-core-modules/ui/content-view';
import {
  Camera as CameraDefinition,
  MessageEventData,
  ErrorEventData,
  FaceImageCreatedEventData,
  FaceDetectedEventData,
  BarcodeScannedEventData,
} from '.';

export abstract class CameraBase extends ContentView implements CameraDefinition {

  public requestCameraPermissions(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve());
  }
  public hasCameraPermission(): boolean { return false; }
  public startPreview(): void {}
  public startCaptureType(captureType: string): void {}
  public stopCapture(): void {}
  public toggleCameraLens(): void {}
  public getCameraLens(): number { return 0; }
  public setFaceNumberOfImages(faceNumberOfImages: number): void {}
  public setFaceDetectionBox(faceDetectionBox: Boolean): void {}
  public setFaceTimeBetweenImages(faceTimeBetweenImages: number): void {}
  public setFacePaddingPercent(facePaddingPercent: number): void {}
  public setFaceImageSize(faceImageSize: number): void {}
}

export interface CameraBase {
  on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
  on(event: "faceImageCreatedEvent", callback: (args: FaceImageCreatedEventData) => void, thisArg?: any);
  on(event: "faceDetectedEvent", callback: (args: FaceDetectedEventData) => void, thisArg?: any);
  on(event: "endCaptureEvent", callback: () => void, thisArg?: any);
  on(event: "barcodeScannedEvent", callback: (args: BarcodeScannedEventData) => void, thisArg?: any);
  on(event: "messageEvent", callback: (args: MessageEventData) => void, thisArg?: any);
  on(event: "errorEvent", callback: (args: ErrorEventData) => void, thisArg?: any);
  on(event: "permissionDeniedEvent", callback: () => void, thisArg?: any);
}
