import {
    MessageEventData,
    ErrorEventData,
    FaceImageCreatedEventData,
    FaceDetectedEventData,
    BarcodeScannedEventData
} from '.';
import { CameraBase } from './Yoonit.Camera.common';
import { EventData } from "tns-core-modules/ui/content-view";
import * as camera from "nativescript-camera";

export class YoonitCamera extends CameraBase {

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

    public startPreview(): void {
        this.nativeView.startPreview();
    }

    public startCaptureType(captureType: string) {
        this.nativeView.startCaptureTypeWithCaptureType(captureType);
    }

    public stopCapture(): void {
        this.nativeView.stopCapture();
    }

    public toggleCameraLens() {
        this.nativeView.toggleCameraLens();
    }

    public getCameraLens(): number {
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

    public requestCameraPermissions(explanation: string = ''): Promise<boolean> {
        return new Promise((resolve, reject) => camera
            .requestCameraPermissions()
            .then(() => resolve(true))
            .catch(err => reject(false))
        );
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
        if (owner) {
            owner.notify({
                eventName: "faceImageCreatedEvent",
                object: owner,
                count,
                total,
                imagePath
            } as FaceImageCreatedEventData);
        }
    }

    public onFaceDetectedWithFaceDetected(faceDetected: boolean): void {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: "faceDetectedEvent",
                object: owner,
                faceDetected
            } as FaceDetectedEventData);
        }
    }

    public onEndCapture(): void {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: "endCaptureEvent",
                object: owner,
            } as EventData);
        }
    }

    public onErrorWithError(error: string): void {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: "errorEvent",
                object: owner,
                error
            } as ErrorEventData);
        }
    }

    public onMessageWithMessage(message: string): void {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: "messageEvent",
                object: owner,
                message
            } as MessageEventData);
        }
    }

    public onPermissionDenied(): void {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: "permissionDeniedEvent",
                object: owner,
            } as EventData);
        }
    }

    public onBarcodeScannedWithContent(content: string): void {
        const owner = this.owner.get();
        if (owner) {
            owner.notify({
                eventName: "barcodeScannedEvent",
                object: owner,
                content
            } as BarcodeScannedEventData);
        }
    }
}
