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
import {
  EventData,
  ImageSource,
  knownFolders,
  path,
  File
} from '@nativescript/core';

export class YoonitCamera extends CameraBase {

    nativeView: CameraView;

    private permission: boolean = false;

    /**
     * Creates new native button.
     */
    public createNativeView(): Object {
        this.nativeView = CameraView.new();
        this.nativeView.cameraEventListener = CameraEventListener.initWithOwner(new WeakRef(this));

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
        this.nativeView.cameraEventListener = null;

        // Remove reference from native listener to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    public startCapture(captureType: string) {
        this.nativeView.startCaptureTypeWithCaptureType(captureType);
    }

    public setFaceNumberOfImages(faceNumberOfImages: number) {
        this.nativeView.setFaceNumberOfImagesWithFaceNumberOfImages(faceNumberOfImages);
    }

    public setFaceDetectionBox(faceDetectionBox: boolean) {
        this.nativeView.setFaceDetectionBoxWithFaceDetectionBox(faceDetectionBox);
    }

    public setFaceTimeBetweenImages(faceTimeBetweenImages: number) {
        this.nativeView.setFaceTimeBetweenImagesWithFaceTimeBetweenImages(faceTimeBetweenImages);
    }

    public setFacePaddingPercent(facePaddingPercent: number) {
        this.nativeView.setFacePaddingPercentWithFacePaddingPercent(facePaddingPercent);
    }

    public setFaceImageSize(width: number, height: number) {
        this.nativeView.setFaceImageSizeWithWidthHeight(width, height);
    }

    public setFaceCaptureMinSize(faceCaptureMinSize: number): void {
        this.nativeView.setFaceCaptureMinSizeWithFaceCaptureMinSize(faceCaptureMinSize);
    }

    public setFaceCaptureMaxSize(faceCaptureMaxSize: number): void {
        this.nativeView.setFaceCaptureMaxSizeWithFaceCaptureMaxSize(faceCaptureMaxSize);
    }

    public setFrameNumberOfImages(frameNumberOfImages: number) {
        this.nativeView.setFrameNumberOfImagesWithFrameNumberOfImages(frameNumberOfImages);
    }

    public setFrameTimeBetweenImages(frameTimeBetweenImages: number) {
        this.nativeView.setFrameTimeBetweenImagesWithFrameTimeBetweenImages(frameTimeBetweenImages);
    }

    public requestPermission(explanation: string = ''): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const cameraStatus = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);
            switch (cameraStatus) {

                // Not determined: Explicit user permission is required for media capture,
                // but the user has not yet granted or denied such permission..
                case 0: {
                    AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, (granted) => {
                        if (granted) {
                            this.permission = true;
                            resolve(true);
                        } else {
                            this.permission = false;
                            reject(false);
                        }
                    });
                    break;
                }

                // Restricted: the user is not allowed to access media capture devices.
                case 1:

                // Denied: The user has explicitly denied permission for media capture.
                case 2: {
                    this.permission = false;
                    reject(false);
                    break;
                }

                // Authorized: The user has explicitly granted permission for media capture,
                // or explicit user permission is not necessary for the media type in question.
                case 3: {
                    this.permission = true;
                    resolve(true);
                    break;
                }
            }
        });
    }

    public hasPermission(): boolean {
        return this.permission;
    }
}

@ObjCClass(CameraEventListenerDelegate)
@NativeClass()
class CameraEventListener extends NSObject implements CameraEventListenerDelegate {

    private owner: WeakRef<YoonitCamera>;

    public static initWithOwner(owner: WeakRef<YoonitCamera>): CameraEventListener {
        const delegate = CameraEventListener.new() as CameraEventListener;
        delegate.owner = owner;
        return delegate;
    }

    private imageProcessing(imagePath: string): object {
      let imageName: any = imagePath.split('/');

      imageName = imageName[imageName.length - 1];

      const finalPath: string  = path.join(knownFolders.documents().path, imageName);
      const source: ImageSource = ImageSource.fromFileSync(finalPath);
      const imageFile = File.fromPath(imagePath);
      const binary = imageFile.readSync();

      return {
        path: imagePath,
        source,
        binary
      }
    }

    public onFaceImageCreatedWithCountTotalImagePath(count: number, total: number, imagePath: string): void {
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

    public onFrameImageCreatedWithCountTotalImagePath(count: number, total: number, imagePath: string): void {
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

    public onFaceDetectedWithXYWidthHeight(x: number, y: number, width: number, height: number): void {
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

    public onErrorWithError(error: string): void {
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

    public onMessageWithMessage(message: string): void {
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

    public onBarcodeScannedWithContent(content: string): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content
            } as BarcodeScannedEventData);
        }
    }
}
