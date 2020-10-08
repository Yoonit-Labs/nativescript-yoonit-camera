// +-+-+-+-+-+-+
// |y|o|o|n|i|t|
// +-+-+-+-+-+-+
//
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// | Yoonit Camera Plugin for NativeScript applications              |
// | Luigui Delyer, Haroldo Teruya,                                  |
// | Victor Goulart & Márcio Bruffato @ Cyberlabs AI 2020            |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

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

  public requestPermission(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve());
  }
  public hasPermission(): boolean { return false; }
  public preview(): void {}
  public startCapture(captureType: string): void {}
  public stopCapture(): void {}
  public toggleLens(): void {}
  public getLens(): number { return 0; }
  public setFaceNumberOfImages(faceNumberOfImages: number): void {}
  public setFaceDetectionBox(faceDetectionBox: Boolean): void {}
  public setFaceTimeBetweenImages(faceTimeBetweenImages: number): void {}
  public setFacePaddingPercent(facePaddingPercent: number): void {}
  public setFaceImageSize(faceImageSize: number): void {}
}

export interface CameraBase {
  on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
  on(event: "faceImage", callback: (args: FaceImageCreatedEventData) => void, thisArg?: any);
  on(event: "faceDetected", callback: (args: FaceDetectedEventData) => void, thisArg?: any);
  on(event: "endCapture", callback: () => void, thisArg?: any);
  on(event: "barcodeScanned", callback: (args: BarcodeScannedEventData) => void, thisArg?: any);
  on(event: "status", callback: (args: MessageEventData) => void, thisArg?: any);
  on(event: "error", callback: (args: ErrorEventData) => void, thisArg?: any);
  on(event: "permissionDenied", callback: () => void, thisArg?: any);
}
