import { CameraBase } from './Yoonit.Camera.common';
export declare class YoonitCamera extends CameraBase {
    nativeView: ai.cyberlabs.yoonit.camera.CameraView;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
    startCapture(captureType: string): void;
    setFaceNumberOfImages(faceNumberOfImages: number): void;
    setFaceDetectionBox(faceDetectionBox: boolean): void;
    setFaceTimeBetweenImages(faceTimeBetweenImages: number): void;
    setFacePaddingPercent(facePaddingPercent: number): void;
    setFaceImageSize(faceImageSize: number): void;
    requestPermission(explanation?: string): Promise<boolean>;
    hasPermission(): boolean;
}
