/**
 * File generated by this command in the demo-vue project:
 * TNS_TYPESCRIPT_DECLARATIONS_PATH="$(pwd)/typings" tns build ios
 */

declare class CameraView extends UIView {
    static alloc(): CameraView; // inherited from NSObject
    static appearance(): CameraView; // inherited from UIAppearance
    static appearanceForTraitCollection(trait: UITraitCollection): CameraView; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): CameraView; // inherited from UIAppearance
    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): CameraView; // inherited from UIAppearance
    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): CameraView; // inherited from UIAppearance
    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): CameraView; // inherited from UIAppearance
    static new(): CameraView; // inherited from NSObject

    cameraEventListener: CameraEventListenerDelegate;

    startPreview(): void;
    startCaptureType(captureType: string): void;
    stopCapture(): void;
    destroy(): void;
    toggleCameraLens(): void;
    setCameraLens(cameraLens: string): void;
    getCameraLens(): string;
    setNumberOfImages(numberOfImages: number): void;
    setTimeBetweenImages(timeBetweenImages: number): void;
    setOutputImageWidth(width: number): void;
    setOutputImageHeight(height: number): void;
    setSaveImageCaptured(enable: boolean): void;
    setFaceDetectionBox(enable: boolean): void;
    setFacePaddingPercent(facePaddingPercent: number): void;
    setFaceCaptureMinSize(faceCaptureMinSize: number): void;
    setFaceCaptureMaxSize(faceCaptureMaxSize: number): void;
    setFaceROIEnable(enable: boolean): void;
    setFaceROITopOffset(topOffset: number): void;
    setFaceROIRightOffset(rightOffset: number): void;
    setFaceROIBottomOffset(bottomOffset: number): void;
    setFaceROILeftOffset(leftOffset: number): void;
    setFaceROIMinSize(minimumSize: number): void;
    setFaceROIAreaOffsetColor(
        alpha: number,
        red: number,
        green: number,
        blue: number
    ): void;
    setFaceROIAreaOffset(status: boolean): void;
    setFaceROIEnable(status: boolean): void;
}

interface CameraEventListenerDelegate {
    onImageCaptured(type: string, count: number, total: number, imagePath: string): void;
    onFaceDetected(
        x: number,
        y: number,
        width: number,
        height: number,
        leftEyeOpenProbability: number,
        rightEyeOpenProbability: number,
        smilingProbability: number,
        headEulerAngleX: number,
        headEulerAngleY: number,
        headEulerAngleZ: number
    ): void;
    onFaceUndetected(): void;
    onEndCapture(): void;
    onError(error: string): void;
    onMessage(message: string): void;
    onPermissionDenied(): void;
    onQRCodeScanned(content: string): void;
}

declare var CameraEventListenerDelegate: {
    prototype: CameraEventListenerDelegate;
};
