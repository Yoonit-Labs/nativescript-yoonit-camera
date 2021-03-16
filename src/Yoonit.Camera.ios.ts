// +-+-+-+-+-+-+
// |y|o|o|n|i|t|
// +-+-+-+-+-+-+
//
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// | Yoonit Camera Plugin for NativeScript applications              |
// | Luigui Delyer, Haroldo Teruya, Victor Goulart                   |
// | Gabriel Rizzo & Márcio Bruffato @ Cyberlabs AI 2020             |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

import {
    StatusEventData,
    ImageCapturedEventData,
    FaceDetectedEventData,
    QRCodeScannedEventData,
} from '.';
import { CameraBase } from './Yoonit.Camera.common';
import {
    EventData,
    ImageSource,
    knownFolders,
    path,
    File
} from '@nativescript/core';
import Validator from "./helpers/Validator";

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

        Validator.PropMap.forEach((prop) => {
            if (this.nativeView[prop.name]) {
                if (prop.length > 1) {
                    return this.nativeView[prop.name](...prop.value);
                }
                this.nativeView[prop.name](prop.value);
            }
        });
        Validator.PropMap = [];
    }

    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView(): void {
        this.nativeView.destroy();
        this.nativeView.cameraEventListener = null;

        // Remove reference from native listener to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    public requestPermission(explanation: string = ''): Promise<boolean> {
        return new Promise((resolve, reject) => {
            enum PermissionStatus {
                NO_EXPLICIT_PERMISSION = 0,
                NOT_ALLOWED = 1,
                EXPLICIT_DENIED = 2,
                EXPLICIT_ALLOWED = 3
            }

            const cameraStatus: number = AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);
            switch (cameraStatus) {

                // Not determined: Explicit user permission is required for media capture,
                // but the user has not yet granted or denied such permission..
                case PermissionStatus.NO_EXPLICIT_PERMISSION: {
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
                case PermissionStatus.NOT_ALLOWED:

                // Denied: The user has explicitly denied permission for media capture.
                case PermissionStatus.EXPLICIT_DENIED: {
                    this.permission = false;
                    reject(false);
                    break;
                }

                // Authorized: The user has explicitly granted permission for media capture,
                // or explicit user permission is not necessary for the media type in question.
                case PermissionStatus.EXPLICIT_ALLOWED: {
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

    private imageProcessing(imagePath: string): { path: string, source: any, binary: any } {
        let imageName: any = imagePath.split('/');
        imageName = imageName[imageName.length - 1];

        const finalPath: string  = path
            .join(knownFolders.documents().path, imageName)
            .replace('file://', '');

        const source: ImageSource = ImageSource.fromFileSync(finalPath);
        const imageFile = File.fromPath(finalPath);
        const binary = imageFile.readSync();

        return {
            path: finalPath,
            source,
            binary
        };
    }

    public onImageCaptured(
        type: string,
        count: number,
        total: number,
        imagePath: string
    ): void {
        const owner = this.owner.get();

        if (owner && !!imagePath) {
            const image = this.imageProcessing(imagePath);

            owner.notify({
                eventName: 'imageCaptured',
                object: owner,
                type,
                count,
                total,
                image,
                inferences: []
            } as ImageCapturedEventData);
        }
    }

    public onFaceDetected(
        x: number,
        y: number,
        width: number,
        height: number,
        leftEyeOpenProbability: number,
        hasLeftEyeOpenProbability: boolean,
        rightEyeOpenProbability: number,
        hasRightEyeOpenProbability: boolean,
        smilingProbability: number,
        hasSmilingProbability: boolean,
        headEulerAngleX: number,
        hasHeadEulerAngleX: boolean,
        headEulerAngleY: number,
        hasHeadEulerAngleY: boolean,
        headEulerAngleZ: number,
        hasHeadEulerAngleZ: boolean
    ): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'faceDetected',
                object: owner,
                x,
                y,
                width,
                height,
                leftEyeOpenProbability,
                rightEyeOpenProbability,
                smilingProbability,
                headEulerAngleX,
                headEulerAngleY,
                headEulerAngleZ
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
                height: null,
                leftEyeOpenProbability: null,
                rightEyeOpenProbability: null,
                smilingProbability: null,
                headEulerAngleX: null,
                headEulerAngleY: null,
                headEulerAngleZ: null
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

    public onQRCodeScanned(content: string): void {
        const owner = this.owner.get();

        if (owner) {
            owner.notify({
                eventName: 'qrCodeContent',
                object: owner,
                content
            } as QRCodeScannedEventData);
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
