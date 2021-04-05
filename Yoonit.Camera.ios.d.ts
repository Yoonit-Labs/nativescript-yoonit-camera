import { CameraBase } from './Yoonit.Camera.common';
export declare class YoonitCamera extends CameraBase {
    nativeView: CameraView;
    private permission;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
    requestPermission(explanation?: string): Promise<boolean>;
    hasPermission(): boolean;
    setFaceContours(enable: boolean): void;
    setFaceContoursColor(color: any): void;
}
