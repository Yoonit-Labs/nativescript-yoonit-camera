[<img src="https://raw.githubusercontent.com/Yoonit-Labs/nativescript-yoonit-camera/development/logo_cyberlabs.png" width="300">](https://cyberlabs.ai/)

# NativeScript Yoonit Camera

![NativeScript](https://img.shields.io/badge/NativeScript-7-lightgrey.svg?style=for-the-badge&logo=nativescript) ![Version](https://img.shields.io/npm/v/@yoonit/nativescript-camera?color=lightgrey&style=for-the-badge&logo=npm) ![Downloads](https://img.shields.io/npm/dm/@yoonit/nativescript-camera?color=lightgrey&logo=npm&style=for-the-badge)

![Android](https://img.shields.io/badge/Android-YES-lightgrey.svg?style=for-the-badge&logo=android) ![iOS](https://img.shields.io/badge/iOS-YES-lightgrey.svg?style=for-the-badge&logo=apple) ![MIT license](https://img.shields.io/npm/l/@yoonit/nativescript-camera?color=lightgrey&style=for-the-badge)

A NativeScript plugin to provide:
- Modern Android Camera API (Camera X)
- MLKit integration
- Camera preview (Front & Back)
- Face detection (With Min & Max size)
- Landmark detection (Soon)
- Face crop
- Face capture
- Frame capture
- Face ROI
- QR Code scanning

## Installation

```javascript
npm i -s @yoonit/nativescript-camera
```

## Usage

All the functionalities that the `@yoonit/nativescript-camera` provides is accessed through the `YoonitCamera` component, that includes the camera preview. Below we have the basic usage code, for more details, your can see the [**Methods**](#methods), [**Events**](#events) or the [**Demo Vue**](https://github.com/Yoonit-Labs/nativescript-yoonit-camera/tree/development/demo-vue).

#### VueJS Plugin
`main.js`
```javascript
import Vue from 'nativescript-vue'
import YoonitCamera from '@yoonit/nativescript-camera/vue'

Vue.use(YoonitCamera)
```

After that, you can access the camera object in your entire project using `this.$yoo.camera`

#### Vue Component
`App.vue`
```vue
<template>
  <Page @loaded="onLoaded">
    <YoonitCamera
      ref="yooCamera"
      initialLens="front"
      captureType="face"
      numberOfImages=10
      timeBetweenImages=500
      saveImageCaptured=true
      faceDetectionBox=true
      @faceDetected="doFaceDetected"
      @imageCaptured="doImageCaptured"
      @endCapture="doEndCapture"
      @qrCodeContent="doQRCodeContent"
      @status="doStatus"
      @permissionDenied="doPermissionDenied"
    />
  </Page>
</template>

<script>
  export default {
    data: () => ({}),

    methods: {
      async onLoaded() {

        console.log('[YooCamera] Getting Camera view')
        this.$yoo.camera.registerElement(this.$refs.yooCamera)

        console.log('[YooCamera] Getting permission')
        if (await this.$yoo.camera.requestPermission()) {
          
          console.log('[YooCamera] Permission granted, start preview')
          this.$yoo.camera.preview()
        }
      },

      doFaceDetected({ x, y, width, height }) {
        console.log('[YooCamera] doFaceDetected', `{x: ${x}, y: ${y}, width: ${width}, height: ${height}}`)
        if (!x || !y || !width || !height) {
          this.imagePath = null
        }
      },

      doImageCaptured({
        type,
        count,
        total,
        image: {
          path,
          source
        }
      }) {
        if (total === 0) {
          console.log('[YooCamera] doImageCreated', `${type}: [${count}] ${path}`)
          this.imageCreated = `${count}`
        } else {
          console.log('[YooCamera] doImageCreated', `${type}: [${count}] of [${total}] - ${path}`)
          this.imageCreated = `${count} de ${total}`
        }

        this.imagePath = source
      },

      doEndCapture() {
        console.log('[YooCamera] doEndCapture')
      },

      doQRCodeContent({ content }) {
        console.log('[YooCamera] doQRCodeContent', content)
      },

      doStatus({ status }) {
        console.log('[YooCamera] doStatus', status)
      },

      doPermissionDenied() {
        console.log('[YooCamera] doPermissionDenied')
      }
    }
  }
</script>
```

## API

### Props

| Props                 | Input/Format                            | Default value | Description |
| -                     | -                                       | -             | - |                                 
| `initialLens`         | `"front" | "back"`                      | `"front"`     | The camera lens when component initiated. |
| `captureType`         | `"none" | "front" | "frame" | "qrcode"` | `"none"`      | The capture type of the camera. |
| `numberOfImages`      | number                                  | `0`           | The number of images to be captured. |
| `timeBetweenImages`   | number                                  | `1000`        | The time interval in milliseconds to capture between images. |
| `outputImageWidth`    | `NNpx`                                  | `"200px"`     | The output image width in pixels to be captured. |
| `outputImageHeight`   | `NNpx`                                  | `"200px"`     | The output image height in pixels to be captured. |
| `faceMinSize`         | `NN%`                                   | `"0%"`        | The face minimum size percentage to be captured. |
| `faceMaxSize`         | `NN%`                                   | `"100%"`      | The face maximum size percentage to be captured. |
| `faceDetectionBox`    | boolean                                 | `false`       | The indicator to show/hide the face detection box. |
| `saveImageCaptured`   | boolean                                 | `false`       | The indicator to enable/disabled when an image captured. |
| `faceROI`             | boolean                                 | `false`       | The indicator to enable.disable the region of interest. |
| `faceROITopOffset`    | `NN%`                                   | `"0%"`        | The "top" offset percentage region of interest. |
| `faceROIRightOffset`  | `NN%`                                   | `"0%"`        | The "right" offset percentage region of interest. |
| `faceROIBottomOffset` | `NN%`                                   | `"0%"`        | The "bottom" offset percentage region of interest. |
| `faceROILeftOffset`   | `NN%`                                   | `"0%"`        | The "left" offset percentage region of interest. |
| `faceROIMinSize`      | `NN%`                                   | `"0%"`        | The minimum face related with the ROI. |

#### Methods

| Function                   | Parameters             | Valid values                                                                      | Return Type | Description
| -                          | -                      | -                                                                                 | -           | -
| **requestPermission**      | -                      | -                                                                                 | promise     | Ask the user to give the permission to access camera.
| **hasPermission**          | -                      | -                                                                                 | boolean     | Return if application has camera permission.
| **preview**                | -                      | -                                                                                 | void        | Start camera preview if has permission.
| **startCapture**           | `type: string`         | <ul><li>`"none"`</li><li>`"face"`</li><li>`"qrcode"`</li><li>`"frame"`</li></ul>  | void        | Set capture type none, face, qrcode or frame.
| **stopCapture**            | -                      | -                                                                                 | void        | Stop any type of capture.
| **setLens**                | `lens: string`         | `"front" | "back"`                                                                | void        | Set the camera lens facing: front or back.
| **toggleLens**             | -                      | -                                                                                 | void        | Toggle camera lens facing front or back.
| **getLens**                | -                      | -                                                                                 | number      | Return `number` that represents lens face state: 0 for front 1 for back camera.  
| **setNumberOfImages**      | `numberOfImages: Int`  | Any positive `Int` value                                                          | void        | Default value is 0. For value 0 is saved infinity images. When saved images reached the "number os images", the `onEndCapture` is triggered.
| **setTimeBetweenImages**   | `milliseconds: number` | Any positive number that represent time in milli seconds                          | void        | Set saving face/frame images time interval in milli seconds.
| **setOutputImageWidth**    | `width: string`        | Value format must be in `NNpx`                                                    | void        | Set face image width to be created in pixels.
| **setOutputImageHeight**   | `height: string`       | Value format must be in `NNpx`                                                    | void        | Set face image height to be created in pixels.
| **setSaveImageCaptured**   | `enable: boolean`      | `true` or `false`                                                                 | void        | Set to enable/disable save image when capturing face and frame.
| **setFaceDetectionBox**    | `enable: boolean`      | `true` or `false`                                                                 | void        | Set to show a detection box when face detected.   
| **setFacePaddingPercent**  | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Set face image and bounding box padding in percent.  
| **setFaceCaptureMinSize**  | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Set the minimum face capture based on the screen.
| **setFaceCaptureMaxSize**  | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Set the maximum face capture based on the screen.
| **setFaceROIEnable**       | `enable: boolean`      | `true` or `false`                                                                 | void        | Enable/disable face region of interest capture.
| **setFaceROITopOffset**    | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Distance in percentage of the top face bounding box with the top of the camera preview. 
| **setFaceROIRightOffset**  | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Distance in percentage of the right face bounding box with the right of the camera preview.
| **setFaceROIBottomOffset** | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Distance in percentage of the bottom face bounding box with the bottom of the camera preview.
| **setFaceROILeftOffset**   | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Distance in percentage of the left face bounding box with the left of the camera preview.
| **setFaceROIMinSize**      | `percentage: string`   | Value format must be in `NN%`                                                     | void        | Set the minimum face size related with the region of interest.

#### Events  

| Event            | Parameters                                                                                       | Description
| -                | -                                                                                                | -
| imageCaptured    | `{ type: string, count: number, total: number, image: object = { path: string, source: blob } }` | Must have started capture type of face/frame. Emitted when the face image file saved: <ul><li>type: "face" | "frame"</li>li>count: current index</li><li>total: total to create</li><li>image.path: the face/frame image path</li><li>image.source: the blob file</li><ul>
| faceDetected     | `{ x: number, y: number, width: number, height: number }`                                        | Must have started capture type of face. Emit the detected face bounding box. Emit all parameters null if no more face detecting.    
| endCapture       | -                                                                                                | Must have started capture type of face/frame. Emitted when the number of image files created is equal of the number of images set (see the method `setNumberOfImages`).   
| qrCodeContent    | `{ content: string }`                                                                            | Must have started capture type of qrcode (see `startCapture`). Emitted when the camera read a QR Code.   
| status           | `{ type: 'error'/'message', status: string }`                                                    | Emit message error from native. Used more often for debug purpose.   
| permissionDenied | -                                                                                                | Emit when try to `preview` but there is not camera permission.

### Message

Pre-define message constants used by the `status` event.

| Message                           | Description
| -                                 | -
| INVALID_CAPTURE_FACE_MIN_SIZE     | Face width percentage in relation of the screen width is less than the set (`setFaceCaptureMinSize`).
| INVALID_CAPTURE_FACE_MAX_SIZE     | Face width percentage in relation of the screen width is more than the set (`setFaceCaptureMaxSize`).
| INVALID_CAPTURE_FACE_OUT_OF_ROI   | Face bounding box is out of the set region of interest (`setFaceROIOffset`).
| INVALID_CAPTURE_FACE_ROI_MIN_SIZE | Face width percentage in relation of the screen width is less than the set (`setFaceROIMinSize`).

## To contribute and make it better

Clone the repo, change what you want and send PR.

Contributions are always welcome!

---

Code with ❤ by the [**Cyberlabs AI**](https://cyberlabs.ai/) Front-End Team
