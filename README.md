# nativescript-yoonit-camera

Add your plugin badges here. See [nativescript-urlhandler](https://github.com/hypery2k/nativescript-urlhandler) for example.

Then describe what's the purpose of your plugin. 

In case you develop UI plugin, this is where you can add some screenshots.

## (Optional) Prerequisites / Requirements

Describe the prerequisites that the user need to have installed before using your plugin. See [nativescript-firebase plugin](https://github.com/eddyverbruggen/nativescript-plugin-firebase) for example.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```javascript
tns plugin add nativescript-yoonit-camera
```

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.
	
	```javascript
    Usage code snippets here
    ```)

## API

Describe your plugin methods and properties here. See [nativescript-feedback](https://github.com/EddyVerbruggen/nativescript-feedback) for example.

## Methods   
  
| Function | Parameters | Return Type | Valid values | Description |
|-|-|-|-|-|  
| **`hasCameraPermission`** | - | boolean | - | Return if application has camera permission.
| **`startPreview`** | - | void | - | Start camera preview if has permission.
| **`startCaptureType`** | `captureType : String` | void | `none` default capture type. `face` for face recognition. `barcode` to read barcode content. | Set capture type none, face or barcode.
| **`stopCapture`** | - | void | - | Stop any type of capture.
| **`toggleCameraLens`** | - | void | - | Set camera lens facing front or back.
| **`getCameraLens`** | - | number | - | Return `number` that represents lens face state: 0 for front 1 for back camera.  
| **`setFaceNumberOfImages`** | `faceNumberOfImages: number` | void | Any positive `number` value | Default value is 0. For value 0 is saved infinity images. When saved images reached the "face number os images", the `onEndCapture` is triggered.
| **`setFaceDetectionBox`** |`faceDetectionBox: Boolean` | void | `True` or `False` | Set to show face detection box when face detected.   
| **`setFaceTimeBetweenImages`** | `faceTimeBetweenImages: number` | void | Any positive `number` that represent time in milli seconds | Set saving face images time interval in milli seconds.  
| **`setFacePaddingPercent`** | `facePaddingPercent: number` | void | Any positive `number` value | Set face image and bounding box padding in percent.  
| **`setFaceImageSize`** | `faceImageSize: number` | void | Any positive `number` value | Set face image size to be saved.    
  
<br/>  
  
## Events

| Event | Parameters | Description |
|-|-|-|
| **`faceImageCreatedEvent`** | `count: number, total: number, imagePath: String` | Emit when the camera save an image face.  
| **`faceDetectedEvent`** | `faceDetected: Boolean` | Emit when a face is detected or hided.  
| **`endCaptureEvent`** | - | Emit when the number of images saved is equal of the number of images set.   
| **`barcodeScannedEvent`** | `content: String` | Emit content when detect a barcode.   
| **`errorEvent`** |`error: String` | Emit message error.  
| **`messageEvent`** | `message: String` | Emit message.   
| **`permissionDeniedEvent`** | - | Emit when try to `startPreview` but there is not camera permission.
    
## License

Apache License Version 2.0, January 2004
