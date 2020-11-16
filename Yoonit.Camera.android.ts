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
  StatusEventData,
  FaceImageCreatedEventData,
  FaceDetectedEventData,
  BarcodeScannedEventData,
  FrameImageCreatedEventData
} from '.';
import { CameraBase } from './Yoonit.Camera.common';
import * as permissions from 'nativescript-permissions';
import {
  EventData,
  ImageSource,
  File
} from '@nativescript/core';

const CAMERA = () => (android as any).Manifest.permission.CAMERA;

export class YoonitCamera extends CameraBase {

    nativeView: ai.cyberlabs.yoonit.camera.CameraView;

    public createNativeView(): Object {
        this.nativeView = new ai.cyberlabs.yoonit.camera.CameraView(this._context);
        this.nativeView.setCameraEventListener(CameraEventListener.initWithOwner(new WeakRef(this)));

        return this.nativeView;
    }

    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView(): void {
        // Attach the owner to nativeView.
        // When nativeView is tapped we get the owning JS object through this field.
        (<any>this.nativeView).owner = this;
        super.initNativeView();
    }

    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView(): void {
        this.nativeView.stopCapture();

        // Remove reference from native view to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    public startCapture(captureType: string): void {
        this.nativeView.startCaptureType(captureType);
    }

    public setFaceNumberOfImages(faceNumberOfImages: number): void {
        this.nativeView.setFaceNumberOfImages(faceNumberOfImages);
    }

    public setFaceDetectionBox(faceDetectionBox: boolean): void {
        this.nativeView.setFaceDetectionBox(faceDetectionBox);
    }

    public setFaceTimeBetweenImages(faceTimeBetweenImages: number): void {
        this.nativeView.setFaceTimeBetweenImages(faceTimeBetweenImages);
    }

    public setFacePaddingPercent(facePaddingPercent: number): void {
        this.nativeView.setFacePaddingPercent(facePaddingPercent);
    }

    public setFaceImageSize(width: number, height: number): void {
        this.nativeView.setFaceImageSize(width, height);
    }

    public setFaceCaptureMinSize(faceCaptureMinSize: number): void {
        this.nativeView.setFaceCaptureMinSize(faceCaptureMinSize);
    }

    public setFaceCaptureMaxSize(faceCaptureMaxSize: number): void {
        this.nativeView.setFaceCaptureMaxSize(faceCaptureMaxSize);
    }

    public setFrameNumberOfImages(frameNumberOfImages: number): void {
        this.nativeView.setFrameNumberOfImages(frameNumberOfImages);
    }

    public setFrameTimeBetweenImages(frameTimeBetweenImages: number): void {
        this.nativeView.setFrameTimeBetweenImages(frameTimeBetweenImages);
    }

    public requestPermission(explanation: string = ''): Promise<boolean> {
        return new Promise((resolve, reject) => permissions
            .requestPermission(CAMERA(), explanation)
            .then(() => resolve(true))
            .catch(err => reject(false))
        );
    }

    public hasPermission(): boolean {
        return permissions.hasPermission(CAMERA());
    }
}

// Interfaces decorator with implemented interfaces on this class
@Interfaces([ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener])
@NativeClass()
class CameraEventListener extends java.lang.Object implements ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener {

    constructor(private owner: WeakRef<YoonitCamera>) {
        super();

        // Required by Android runtime when native class is extended through TypeScript.
        return global.__native(this);
    }

    public static initWithOwner(owner: WeakRef<YoonitCamera>): CameraEventListener {
        return new CameraEventListener(owner);
    }

    private imageProcessing(imagePath: string): object {
      const source: ImageSource = ImageSource.fromFileSync(imagePath);
      const imageFile = File.fromPath(imagePath);
      const binary = imageFile.readSync();

      return {
        path: imagePath,
        source,
        binary
      }
    }

    public onFaceImageCreated(count: number, total: number, imagePath: string): void {
        const owner = this.owner.get();
        const image = this.imageProcessing(imagePath);

        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count,
                total,
                image
            } as FaceImageCreatedEventData);
        }
    }

    public onFrameImageCreated(count: number, total: number, imagePath: string): void {
        const owner = this.owner.get();
        const image = this.imageProcessing(imagePath);

        if (owner) {
            owner.notify({
                eventName: 'frameImage',
                object: owner,
                count,
                total,
                image
            } as FrameImageCreatedEventData);
        }
    }

    public onFaceDetected(x: number, y: number, width: number, height: number): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x,
                y,
                width,
                height
            } as FaceDetectedEventData);
        }
    }

    public onFaceUndetected(): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x: null,
                y: null,
                width: null,
                height: null
            } as EventData);
        }
    }

    public onEndCapture(): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'endCapture',
                object: owner,
            } as EventData);
        }
    }

    public onBarcodeScanned(content: string): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content
            } as BarcodeScannedEventData);
        }
    }

    public onError(error: string): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'status',
                object: owner,
                status: {
                  type: 'error',
                  status: error
                }
            } as StatusEventData);
        }
    }

    public onMessage(message: string): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'status',
                object: owner,
                status: {
                  type: 'message',
                  status: message
                }
            } as StatusEventData);
        }
    }

    public onPermissionDenied(): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'permissionDenied',
                object: owner,
            } as EventData);
        }
    }
}
