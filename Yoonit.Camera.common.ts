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
import {
  Camera as CameraDefinition,
  StatusEventData,
  FaceImageCreatedEventData,
  FaceDetectedEventData,
  BarcodeScannedEventData,
  FrameImageCreatedEventData,
} from '.';

export abstract class CameraBase extends ContentView implements CameraDefinition {

  public preview(): void {
    this.nativeView.startPreview();
  }

  public stopCapture(): void {
    this.nativeView.stopCapture();
  }

  public toggleLens(): void {
    this.nativeView.toggleCameraLens();
  }

  public getLens(): number {
    return this.nativeView.getCameraLens();
  }

  public startCapture(captureType: string): void {}

  public setFaceNumberOfImages(faceNumberOfImages: number): void {}

  public setFaceDetectionBox(faceDetectionBox: Boolean): void {}

  public setFaceTimeBetweenImages(faceTimeBetweenImages: number): void {}

  public setFacePaddingPercent(facePaddingPercent: number): void {}

  public setFaceImageSize(width: number, height: number): void {}

  public requestPermission(explanationText?: string): Promise<boolean> {
    return new Promise((resolve, reject) => resolve());
  }

  public hasPermission(): boolean { return false; }
}

export interface CameraBase {
  on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
  on(event: "faceImage", callback: (args: FaceImageCreatedEventData) => void, thisArg?: any);
  on(event: "frameImage", callback: (args: FrameImageCreatedEventData) => void, thisArg?: any);
  on(event: "faceDetected", callback: (args: FaceDetectedEventData) => void, thisArg?: any);
  on(event: "endCapture", callback: () => void, thisArg?: any);
  on(event: "qrCodeContent", callback: (args: BarcodeScannedEventData) => void, thisArg?: any);
  on(event: "status", callback: (args: StatusEventData) => void, thisArg?: any);
  on(event: "permissionDenied", callback: () => void, thisArg?: any);
}
