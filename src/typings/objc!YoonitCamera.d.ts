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
    setFacePaddingPercent(facePaddingPercent: number): void;
    setDetectionBox(enable: boolean): void;
    setDetectionBoxColor(
        alpha: number,
        red: number,
        green: number,
        blue: number
    ): void;
    setDetectionMinSize(detectionMinSize: number): void;
    setDetectionMaxSize(detectionMaxSize: number): void;
    setROI(enable: boolean): void;
    setROITopOffset(topOffset: number): void;
    setROIRightOffset(rightOffset: number): void;
    setROIBottomOffset(bottomOffset: number): void;
    setROILeftOffset(leftOffset: number): void;
    setROIAreaOffsetColor(
        alpha: number,
        red: number,
        green: number,
        blue: number
    ): void;
    setROIAreaOffset(status: boolean): void;
    setFaceContours(enable: boolean): void;
    setFaceContoursColor(...params: number): void;
    setTorch(enable: boolean): void;
}

interface CameraEventListenerDelegate {
    onImageCaptured(
        type: string,
        count: number,
        total: number,
        imagePath: string,
        darkness: number,
        lightness: number,
        sharpness: number
    ): void;
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
