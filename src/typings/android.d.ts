/// <reference path="android-declarations.d.ts"/>

/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Camera
 * The most advanced and modern Camera module for Android with a lot of awesome features
 *
 * Luigui Delyer, Haroldo Teruya, Victor Goulart, Gabriel Rizzo & Márcio Bruffato @ 2020-2021
 */

declare namespace ai {
	export namespace cyberlabs {
		export namespace yoonit {
			export namespace camera {
				export class BuildConfig {
					public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.BuildConfig>;
					public static DEBUG: boolean;
					public static LIBRARY_PACKAGE_NAME: string;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
				export class CameraView {
					public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.CameraView>;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public constructor(param0: globalAndroid.content.Context);
					public setCameraEventListener(param0: ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener): void;
					public startPreview(): void;
					public startCaptureType(param0: string): void;
					public stopCapture(): void;
					public destroy(): void;
					public toggleCameraLens(): void;
					public setCameraLens(param0: string): void;
					public getCameraLens(): string;
					public setNumberOfImages(param0: number): void;
					public setTimeBetweenImages(param0: number): void;
					public setOutputImageWidth(param0: number): void;
					public setOutputImageHeight(param0: number): void;
					public setSaveImageCaptured(param0: boolean): void;
					public setColorEncodingCapture(param0: string): void;
					public setFacePaddingPercent(param0: number): void;
					public setDetectionBox(param0: boolean): void;
					public setDetectionBoxColor(
						param0: number,
						param1: number,
						param2: number,
						param3: number
					): void;
					public setDetectionMinSize(param0: number): void;
					public setDetectionMaxSize(param0: number): void;
					public detectionTopSize: number;
					public detectionRightSize: number;
					public detectionBottomSize: number;
					public detectionLeftSize: number;
					public setROI(param0: boolean): void;
					public setROITopOffset(param0: number): void;
					public setROIRightOffset(param0: number): void;
					public setROIBottomOffset(param0: number): void;
					public setROILeftOffset(param0: number): void;
					public setROIAreaOffsetColor(
						param0: number,
						param1: number,
						param2: number,
						param3: number
					): void;
					public setROIAreaOffset(param0: boolean): void;
					public setFaceContours(param0: boolean): void;
					public setFaceContoursColor(...params: number): void;
					public setComputerVision(param0: boolean): void;
					public setComputerVisionLoadModels(param0: any): void;
					public computerVisionClearModels(): void;
					public setTorch(param0: boolean): void;
				}
				export namespace interfaces {
					export class CameraEventListener {
						public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener>;
						public onImageCaptured(
							param0: string,
							param1: number,
							param2: number,
							param3: string,
							param4: java.util.ArrayList<android.util.Pair<string, number[]>>,
							param5: number,
							param6: number,
							param7: number
						): void;
						public onFaceDetected(
							param0: number,
							param1: number,
							param2: number,
							param3: number,
							param4: number,
							param5: number,
							param6: number,
							param7: number,
							param8: number,
							param9: number
						): void;
						public onFaceUndetected(): void;
						public onEndCapture(): void;
						public onError(param0: string): void;
						public onMessage(param0: string): void;
						public onPermissionDenied(): void;
						public onQRCodeScanned(param0: string);
					}
				}
			}
		}
	}
}
