import {
    MessageEventData,
    ErrorEventData,
    FaceImageCreatedEventData,
    FaceDetectedEventData,
    BarcodeScannedEventData
} from '.';
import { CameraBase } from './yoonit-camera.common';
import * as permissions from 'nativescript-permissions';
import { EventData } from "tns-core-modules/ui/content-view";

const CAMERA = () => (android as any).Manifest.permission.CAMERA;

export class YoonitCamera extends CameraBase {

    nativeView: ai.cyberlabs.yoonit.camera.CameraView;

    private captureListener: CaptureListener;

    /**
     * Creates new native button.
     */
    public createNativeView(): Object {
        this.nativeView = new ai.cyberlabs.yoonit.camera.CameraView(this._context);

        initializeCaptureListener();
        const captureListener = new CaptureListener(new WeakRef(this));
        this.nativeView.setCameraEventListener(captureListener);
        this.captureListener = captureListener;

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
        (<any>this.captureListener).owner = null;
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    public startPreview(): void {
        this.nativeView.startPreview();
    }

    public startCaptureType(captureType: string): void {
        this.nativeView.startCaptureType(captureType);
    }

    public stopCapture(): void {
        this.nativeView.stopCapture();
    }

    public toggleCameraLens(): void {
        this.nativeView.toggleCameraLens();
    }

    public getCameraLens(): number {
        return this.nativeView.getCameraLens();
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

    public setFaceImageSize(faceImageSize: number): void {
        this.nativeView.setFaceImageSize(faceImageSize);
    }

    public requestCameraPermissions(explanation: string = ''): Promise<boolean> {
        return new Promise((resolve, reject) => permissions
            .requestPermission(CAMERA(), explanation)
            .then(() => resolve(true))
            .catch(err => reject(false))
        );
    }

    public hasCameraPermission(): boolean {
        return permissions.hasPermission(CAMERA());
    }
}

// NOTE: CaptureListener is inside a function instead of directly in the module because we
// want this file to be compatible with V8 snapshot. When V8 snapshot is created
// JS is loaded into memory, compiled & saved as binary file which is later loaded by
// Android runtime. Thus when snapshot is created we don't have Android runtime and
// we don't have access to native types.
interface CaptureListener extends java.lang.Object, ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener {
    /*tslint:disable-next-line no-misused-new*/
    new(owner: WeakRef<YoonitCamera>): CaptureListener;
}

let CaptureListener: CaptureListener;

function initializeCaptureListener(): void {
    if (CaptureListener) {
        return;
    }

    // Interfaces decorator with implemented interfaces on this class
    @Interfaces([ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener])
    class CaptureListenerImpl extends java.lang.Object implements ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener {

        constructor(private owner: WeakRef<YoonitCamera>) {
            super();
            // Required by Android runtime when native class is extended through TypeScript.
            return global.__native(this);
        }

        public onFaceImageCreated(count: number, total: number, imagePath: string): void {
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

        public onFaceDetected(faceDetected: boolean): void {
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

        public onBarcodeScanned(content: string): void {
            const owner = this.owner.get();
            if (owner) {
                owner.notify({
                    eventName: "barcodeScannedEvent",
                    object: owner,
                    content
                } as BarcodeScannedEventData);
            }
        }

        public onError(error: string): void {
            const owner = this.owner.get();
            if (owner) {
                owner.notify({
                    eventName: "errorEvent",
                    object: owner,
                    error
                } as ErrorEventData);
            }
        }

        public onMessage(message: string): void {
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
    }

    CaptureListener = CaptureListenerImpl as any;
}
