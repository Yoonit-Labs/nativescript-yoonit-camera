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
    MessageEventData,
    ErrorEventData,
    FaceImageCreatedEventData,
    FaceDetectedEventData,
    BarcodeScannedEventData
} from '.'
import { CameraBase } from './Yoonit.Camera.common'
import { EventData } from 'tns-core-modules/ui/content-view'
import * as camera from 'nativescript-camera'
import { ImageSource } from 'tns-core-modules/image-source'
import { knownFolders, path } from 'tns-core-modules/file-system'

export class YoonitCamera extends CameraBase {

    permission: boolean = false;

    nativeView: CameraView;

    private cameraEventListenerDelegate: CameraEventListenerDelegateImpl;

    /**
     * Creates new native button.
     */
    public createNativeView(): Object {
        // Create new instance
        this.nativeView = CameraView.new();

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

        this.cameraEventListenerDelegate = CameraEventListenerDelegateImpl.initWithOwner(new WeakRef(this));
        this.nativeView.cameraEventListener = this.cameraEventListenerDelegate;
    }

    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView(): void {
        this.nativeView.cameraEventListener = null;
        this.cameraEventListenerDelegate = null;

        // Remove reference from native listener to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    public preview(): void {
        this.nativeView.startPreview();
    }

    public startCapture(captureType: string) {
        this.nativeView.startCaptureTypeWithCaptureType(captureType);
    }

    public stopCapture(): void {
        this.nativeView.stopCapture();
    }

    public toggleLens() {
        this.nativeView.toggleCameraLens();
    }

    public getLens(): number {
        return this.nativeView.getCameraLens();
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

    public setFaceImageSize(faceImageSize: number) {
        this.nativeView.setFaceImageSizeWithFaceImageSize(faceImageSize);
    }

    public requestPermission(explanation: string = ''): Promise<boolean> {
        return new Promise((resolve, reject) => camera
            .requestCameraPermissions()
            .then(() => {
              this.permission = true

              return resolve(true)
            })
            .catch(err => {
              this.permission = false

              return reject(false)
            })
        );
    }

    public hasPermission(): boolean {
        return this.permission;
    }

}

@ObjCClass(CameraEventListenerDelegate)
class CameraEventListenerDelegateImpl extends NSObject implements CameraEventListenerDelegate {

    public static initWithOwner(owner: WeakRef<YoonitCamera>): CameraEventListenerDelegateImpl {
        const delegate = CameraEventListenerDelegateImpl.new() as CameraEventListenerDelegateImpl;
        delegate.owner = owner;
        return delegate;
    }

    private owner: WeakRef<YoonitCamera>;

    public onFaceImageCreatedWithCountTotalImagePath(count: number, total: number, imagePath: string): void {
        const owner = this.owner.get();
        let imageName: any = imagePath.split('/')

        imageName = imageName[imageName.length - 1]

        const finalPath: string  = path.join(knownFolders.documents().path, imageName)

        const imageSource: ImageSource = ImageSource.fromFileSync(finalPath)

        if (owner) {
            owner.notify({
                eventName: 'faceImage',
                object: owner,
                count,
                total,
                image: {
                  path: finalPath,
                  source: imageSource
                }
            } as FaceImageCreatedEventData);
        }
    }

    public onFaceDetectedWithFaceDetected(faceDetected: boolean): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                faceDetected
            } as FaceDetectedEventData);
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
            } as ErrorEventData);
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
            } as MessageEventData);
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
                eventName: 'barcodeScanned',
                object: owner,
                content
            } as BarcodeScannedEventData);
        }
    }
}
