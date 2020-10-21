/// <reference path="android-declarations.d.ts"/>

declare module ai {
	export module cyberlabs {
		export module yoonit {
			export module camera {
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
			}
		}
	}
}

declare module ai {
	export module cyberlabs {
		export module yoonit {
			export module camera {
				export class CameraView {
					public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.CameraView>;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public start(param0: ai.cyberlabs.yoonit.camera.CaptureOptions): void;
					public startPreview(): void;
					public startCaptureType(param0: string): void;
					public stopCapture(): void;
					public toggleCameraLens(): void;
					public getCameraLens(): number;
					public setCameraEventListener(param0: ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener): void;
					public setFaceNumberOfImages(param0: number): void;
					public setFaceDetectionBox(param0: Boolean): void;
					public setFaceTimeBetweenImages(param0: number): void;
					public setFacePaddingPercent(param0: number): void;
					public setFaceImageSize(param0: number): void;
					public constructor(param0: globalAndroid.content.Context);
				}
				export module CameraView {
					export class DetectorCallback {
						public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.CameraView.DetectorCallback>;
						public handleMessage(param0: globalAndroid.os.Message): boolean;
					}
				}
			}
		}
	}
}

declare module ai {
	export module cyberlabs {
		export module yoonit {
			export module camera {
				export class CameraGraphicView extends ai.cyberlabs.yoonit.camera.CameraGraphicView {
					public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.CameraGraphicView>;
					public draw(param0: globalAndroid.graphics.Canvas): void;
					public drawBoundingBox(param0: globqalAndroid.graphics.RectF);
					public clear();
				}
			}
		}
	}
}


declare module ai {
	export module cyberlabs {
		export module yoonit {
			export module camera {
				export module interfaces {
					export class CameraEventListener {
						public static class: java.lang.Class<ai.cyberlabs.yoonit.camera.interfaces.CameraEventListener>;
						public onFaceImageCreated(param0: number, param1: number, param2: string): void;
						public onFaceDetected(param0: number, param1: number, param2: number, param3: number): void;
						public onFaceUndetected(): void;
						public onEndCapture(): void;
						public onError(param0: string): void;
						public onMessage(param0: string): void;
						public onPermissionDenied(): void;
						public onBarcodeScanned(param0: string);
					}
				}
			}
		}
	}
}

