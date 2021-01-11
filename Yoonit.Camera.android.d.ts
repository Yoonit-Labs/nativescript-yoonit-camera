import { CameraBase } from './Yoonit.Camera.common';
export declare class YoonitCamera extends CameraBase {
    nativeView: ai.cyberlabs.yoonit.camera.CameraView;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
    requestPermission(explanation?: string): Promise<boolean>;
    hasPermission(): boolean;
}
