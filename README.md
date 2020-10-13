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
      id="yooCamera"
      @faceDetected="handleFaceDetected"
      @faceImage="handleFaceImage"
      @endCapture="handleEndCapture"
      @barcodeScanned="handleBarcodeScanned"
      @status="handleStatus"
    />
  </Page>
</template>
```

Get the reference like this:

```javascript
this.$yoo = args.object.getViewById('yooCamera');

```

### Camera Preview

Can request camera permission and start camera preview like this:

```javascript
const permissionGranted = await this.$yoo.requestCameraPermissions();
if (permissionGranted) {
  this.$yoo.preview();
}
```

### Start capturing face images

With camera preview, we can start capture detected face and generate images:

```javascript
this.$yoo.startCapture("face")
```

Add event `@faceImage` (see [**Events**](#events)) to get the result:

```javascript
handleFaceImage({ count, total, imagePath }) {
  // count: current face image index created
  // total: total face images to create
  // imagePath: face image path
}
```

### Start scanning QR Codes

With camera preview, we can start scanning QR codes:

```javascript
this.$yoo.startCapture("barcode")
```

Add event `@barcodeScanned` (see [**Events**](#events)) to get the result:

```javascript
barcodeScanned({ content }) {
  // content of the qr code read
}
```

## API

## Methods
  
| Function | Parameters | Valid values | Return Type | Description |
|-|-|-|-|-|  
| **`hasCameraPermission`** | - | - | boolean | Return if application has camera permission.
| **`preview`** | - | - | void | Start camera preview if has permission.
| **`startCapture`** | `captureType: string` | <ul><li>`"none"`: nothing to do;</li><li>`"face"`: face image capture;</li><li>`"barcode"`: read barcode;</li></ul> | void | Set capture type none, face or barcode.
| **`stopCapture`** | - | - | void | Stop any type of capture.
| **`toggleLens`** | - | - | void | Set camera lens facing front or back.
| **`getLens`** | - | - | number | Return `number` that represents lens face state: 0 for front 1 for back camera.  
| **`setFaceNumberOfImages`** | `faceNumberOfImages: number` | Any positive `number` value | void | Default value is 0. For value 0 is saved infinity images. When saved images reached the "face number os images", the `onEndCapture` is triggered.
| **`setFaceDetectionBox`** |`faceDetectionBox: boolean` | `true` or `false` | void | Set to show face detection box when face detected.   
| **`setFaceTimeBetweenImages`** | `faceTimeBetweenImages: number` | Any positive `number` that represent time in milli seconds. | void | Set saving face images time interval in milli seconds.  
| **`setFacePaddingPercent`** | `facePaddingPercent: number` | Any positive `number` value. | void | Set face image and bounding box padding in percent.  
| **`setFaceImageSize`** | `faceImageSize: number` | Any positive `number` value. | void | Set face image size to be saved.    
  
<br/>  
  
## Events

| Event | Parameters | Description |
|-|-|-|
| faceImage | `{ count: number, total: number, imagePath: string }` | Must have started capture type of face (see `startCapture`). Emitted when the face image file is created: <ul><li>count: current index</li><li>total: total to create</li><li>imagePath: the face image path</li><ul>
| faceDetected | `{ faceDetected: boolean }` | Emitted `true` while the camera detects a face. Emitted `false` once when a face is no more detected    
| endCapture | - | Emitted when the number of face image files created is equal of the number of images set (see the method `setFaceNumberOfImages`).   
| barcodeScanned | `{ content: string }` | Must have started capture type of barcode (see `startCapture`). Emitted when the camera scan a QR Code.   
| status |`{ status: { type: "message" or "error", status: string } }` | Emitted a message of the type "message" or "error". Used more often for debug purpose.
| permissionDeniedEvent | - | Emitted when try to `preview` but there is not camera permission.
