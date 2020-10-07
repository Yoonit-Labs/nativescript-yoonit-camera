# nativescript-yoonit-camera

![Generic badge](https://img.shields.io/badge/version-v1.0.0-<COLOR>.svg) ![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)

A NativeScript plugin to provide:
- Camera preview
- Face detection
- QR Code scanning

## Installation

```javascript
tns plugin add nativescript-yoonit-camera
```

## Usage 
	
All the functionalities that the `nativescript-yoonit-camera` provides is accessed through the `YoonitCamera` component, that includes the camera preview. Below we have the basic usage code, for more details, your can see the [**Methods**](#methods), [**Events**](#events) or the [**Demo Vue**](https://github.com/Yoonit-Labs/nativescript-yoonit-camera/tree/development/demo-vue).
		
```javascript
<template>
  <Page @loaded="onLoaded">
    <YoonitCamera
      id="yoonitCameraView"
      @faceDetectedEvent="handleFaceDetected"
      @faceImageCreatedEvent="handleFaceImageCreated"
      @endCaptureEvent="handleEndCapture"
      @barcodeScannedEvent="handleBarcodeScanned"
      @messageEvent="handleMessage"
      @errorEvent="handleError"
    />
  </Page>
</template>
```

Get the reference like this:

```javascript
this.yoonitCameraView = args.object.getViewById('yoonitCameraView');

```

### Camera Preview

Can request camera permission and start camera preview like this:

```javascript
const permissionGranted = await this.yoonitCameraView.requestCameraPermissions();
if (permissionGranted) {
  this.yoonitCameraView.startPreview();
}
```

### Start capturing face images

With camera preview, we can start capture detected face and generate images:

```javascript
this.cameraView.startCaptureType("face")
```

Add event `@faceImageCreatedEvent` (see [**Events**](#events)) to get the result:

```javascript
handleFaceImageCreated({ count, total, imagePath }) {
  // count: current face image index created
  // total: total face images to create
  // imagePath: face image path
}
```

### Start scanning QR Codes

With camera preview, we can start scanning QR codes:

```javascript
this.cameraView.startCaptureType("qrcode")
```

Add event `@barcodeScannedEvent` (see [**Events**](#events)) to get the result:

```javascript
barcodeScannedEvent({ content }) {
  // content of the qr code read
}
```

## API

## Methods   
  
| Function | Parameters | Return Type | Valid values | Description |
|-|-|-|-|-|  
| **`hasCameraPermission`** | - | boolean | - | Return if application has camera permission.
| **`startPreview`** | - | void | - | Start camera preview if has permission.
| **`startCaptureType`** | `captureType: string` | void | `none` default capture type. `face` for face recognition. `barcode` to read barcode content. | Set capture type none, face or barcode.
| **`stopCapture`** | - | void | - | Stop any type of capture.
| **`toggleCameraLens`** | - | void | - | Set camera lens facing front or back.
| **`getCameraLens`** | - | number | - | Return `number` that represents lens face state: 0 for front 1 for back camera.  
| **`setFaceNumberOfImages`** | `faceNumberOfImages: number` | void | Any positive `number` value | Default value is 0. For value 0 is saved infinity images. When saved images reached the "face number os images", the `onEndCapture` is triggered.
| **`setFaceDetectionBox`** |`faceDetectionBox: boolean` | void | `true` or `false` | Set to show face detection box when face detected.   
| **`setFaceTimeBetweenImages`** | `faceTimeBetweenImages: number` | void | Any positive `number` that represent time in milli seconds | Set saving face images time interval in milli seconds.  
| **`setFacePaddingPercent`** | `facePaddingPercent: number` | void | Any positive `number` value | Set face image and bounding box padding in percent.  
| **`setFaceImageSize`** | `faceImageSize: number` | void | Any positive `number` value | Set face image size to be saved.    
  
<br/>  
  
## Events

| Event | Parameters | Description |
|-|-|-|
| faceImageCreatedEvent | `{ count: number, total: number, imagePath: string }` | Must have started capture type of face (see `startCaptureType`). Emitted when the face image file is created: <ul><li>count: current index</li><li>total: total to create</li><li>imagePath: the face image path</li><ul>
| faceDetectedEvent | `{ faceDetected: boolean }` | Emitted `true` while the camera detects a face. Emitted `false` once when a face is no more detected    
| endCaptureEvent | - | Emitted when the number of face image files created is equal of the number of images set (see the method `setFaceNumberOfImages`).   
| barcodeScannedEvent | `{ content: string }` | Must have started capture type of barcode (see `startCaptureType`). Emitted when the camera scan a QR Code.   
| errorEvent |`{ error: string }` | Emitted message error from native. Used more often for debug purpose.
| messageEvent | `{ message: string }` | Emitted message from native. Used more often for debug purpose.   
| permissionDeniedEvent | - | Emitted when try to `startPreview` but there is not camera permission.
