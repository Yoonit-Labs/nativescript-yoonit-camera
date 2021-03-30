
[<img src="https://raw.githubusercontent.com/Yoonit-Labs/nativescript-yoonit-camera/development/logo_cyberlabs.png" width="300">](https://cyberlabs.ai/)

# NativeScript Yoonit Camera

![NativeScript](https://img.shields.io/badge/NativeScript-7-lightgrey.svg?style=for-the-badge&logo=nativescript) ![Version](https://img.shields.io/npm/v/@yoonit/nativescript-camera?color=lightgrey&style=for-the-badge&logo=npm) ![Downloads](https://img.shields.io/npm/dm/@yoonit/nativescript-camera?color=lightgrey&logo=npm&style=for-the-badge)

![Android](https://img.shields.io/badge/Android-YES-lightgrey.svg?style=for-the-badge&logo=android) ![iOS](https://img.shields.io/badge/iOS-YES-lightgrey.svg?style=for-the-badge&logo=apple) ![MIT license](https://img.shields.io/npm/l/@yoonit/nativescript-camera?color=lightgrey&style=for-the-badge)

A NativeScript plugin to provide:
- Modern Android Camera API [Camera X](https://developer.android.com/training/camerax)
- Camera preview (Front & Back)
* Yoonit Facefy integration:
  * Android: [android-yoonit-facefy](https://github.com/Yoonit-Labs/android-yoonit-facefy)
  * iOS: [ios-yoonit-facefy](https://github.com/Yoonit-Labs/ios-yoonit-facefy)
- [PyTorch](https://pytorch.org/mobile/home/) integration (Android)
- Computer vision pipeline
- Face detection, capture and image crop
- Understanding of the human face
- Frame capture
- Capture timed images
- QR Code scanning

## Table Of Contents

* [Installation](#installation)
* [Usage](#usage)
    * [VueJS Plugin](#vuejs-plugin)
    * [Vue Component](#vue-component)
* [API](#api)
    * [Props](#props)
    * [Methods](#methods)
    * [Events](#events)
    * [Messages](#messages)
* [Contribute](#contribute-and-make-it-better)

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

      doFaceDetected({ 
        x, 
        y, 
        width, 
        height,
        leftEyeOpenProbability,
        rightEyeOpenProbability,
        smilingProbability,
        headEulerAngleX,
        headEulerAngleY,
        headEulerAngleZ
      }) {
        console.log(
          '[YooCamera] doFaceDetected',
          `
          x: ${x}
          y: ${y}
          width: ${width}
          height: ${height}
          leftEyeOpenProbability: ${leftEyeOpenProbability}
          rightEyeOpenProbability: ${rightEyeOpenProbability}
          smilingProbability: ${smilingProbability}
          headEulerAngleX: ${headEulerAngleX}
          headEulerAngleY: ${headEulerAngleY}
          headEulerAngleZ: ${headEulerAngleZ}
          `
        )
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
        },
        inferences
      }) {
        if (total === 0) {
          console.log('[YooCamera] doImageCreated', `${type}: [${count}] ${path}`)
          this.imageCreated = `${count}`
        } else {
          console.log('[YooCamera] doImageCreated', `${type}: [${count}] of [${total}] - ${path}`)
          this.imageCreated = `${count} de ${total}`
        }
        console.log('[YooCamera] Mask Pytorch', inferences)
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

#### Props

| Props                           | Input/Format                                 | Default value | Description |  
| -                               | -                                            | -             | - |                                   
| lens                            | `"front"` or `"back"`                        | `"front"`     | The camera lens to use "front" or "back". |  
| captureType                     | `"none"`, `"front"`, `"frame"` or `"qrcode"` | `"none"`      | The capture type of the camera. |  
| imageCapture                    | `boolean`                                    | `false`       | Enable/disabled save image capture. |  
| imageCaptureAmount              | `number`                                     | `0`           | The image capture amount goal. |  
| imageCaptureInterval            | `number`                                     | `1000`        | The image capture time interval in milliseconds. |  
| imageCaptureWidth               | `"NNpx"`                                     | `"200px"`     | The image capture width in pixels. |  
| imageCaptureHeight              | `"NNpx"`                                     | `"200px"`     | The image capture height in pixels. |  
| colorEncoding                   | `"RGB"` or `"YUV"`                           | `"RGB"`       | Only for android. The image capture color encoding type: `"RGB"` or `"YUV"`. |  
| detectionBox                    | `boolean`                                    | `false`       | Show/hide the face detection box.
| detectionBoxColor               | `string`                                     | `#ffffff`     | Set detection box color |  
| detectionMinSize                | `"NN%"`                                      | `"0%"`        | The face minimum size percentage to capture. |  
| detectionMaxSize                | `"NN%"`                                      | `"100%"`      | The face maximum size percentage to capture. |  
| roi                             | `boolean`                                    | `false`       | Enable/disable the region of interest capture. |  
| roiTopOffset                    | `"NN%"`                                      | `"0%"`        | Distance in percentage of the top face bounding box with the top of the camera preview. |  
| roiRightOffset                  | `"NN%"`                                      | `"0%"`        | Distance in percentage of the right face bounding box with the right of the camera preview. |
| roiBottomOffset                 | `"NN%"`                                      | `"0%"`        | Distance in percentage of the bottom face bounding box with the bottom of the camera preview. |  
| roiLeftOffset                   | `"NN%"`                                      | `"0%"`        | Distance in percentage of the left face bounding box with the left of the camera preview. |    
| roiAreaOffset                   | `boolean`                                    | `false`       | Enable/disable display of the region of interest area offset. |  
| roiAreaOffsetColor              | `string`                                     | `'#ffffff73'` | Set display of the region of interest area offset color. |  
| faceContours                    | `boolean`                                    | `false`       | Enable/disable display list of points on a detected face. |  
| faceContoursColor               | `string`                                     | `'#FFFFFF'`   | Set face contours color. |  
| computerVision - `Android Only` | `boolean`                                    | `false`       | Enable/disable computer vision model. |
| torch                           | `boolean`                                    | `false`       | Enable/disable device torch. Available only to camera lens `"back"`. |

#### Methods

| Function                                     | Parameters                  | Valid values                                                                      | Return Type | Description |  
| -                                            | -                           | -                                                                                 | -           | - |  
| requestPermission                            | -                           | -                                                                                 | promise     | Ask the user to give the permission to access camera. |
| hasPermission                                | -                           | -                                                                                 | boolean     | Return if application has camera permission. |  
| preview                                      | -                           | -                                                                                 | void        | Start camera preview if has permission. |  
| startCapture                                 | `type: string`              | <ul><li>`"none"`</li><li>`"face"`</li><li>`"qrcode"`</li><li>`"frame"`</li></ul>  | void        | Set capture type "none", "face", "qrcode" or "frame". Default value is `"none"`. |  
| stopCapture                                  | -                           | -                                                                                 | void        | Stop any type of capture. |  
| destroy                                      | -                           | -                                                                                 | void        | Destroy preview. |  
| toggleLens                                   | -                           | -                                                                                 | void        | Toggle camera lens facing "front"/"back". |  
| setCameraLens                                | `lens: string`              | `"front"` or `"back"`                                                             | void        | Set camera to use "front" or "back" lens. Default value is `"front"`. |  
| getLens                                      | -                           | -                                                                                 | string      | Return "front" or "back". |  
| setImageCapture                              | `enable: boolean`           | `true` or `false`                                                                 | void        | Enable/disabled save image capture. Default value is `false`. |  
| setImageCaptureAmount                        | `amount: Int`               | Any positive `Int` value                                                          | void        | For value `0`, save infinity images. When the capture image amount is reached, the event `onEndCapture` is triggered. Default value is `0`. |  
| setImageCaptureInterval                      | `interval: number`          | Any positive number that represent time in milliseconds                           | void        | Set the image capture time interval in milliseconds. |  
| setImageCaptureWidth                         | `width: string`             | Value format must be in `NNpx`                                                    | void        | Set the image capture width in pixels. |  
| setImageCaptureHeight                        | `height: string`            | Value format must be in `NNpx`                                                    | void        | Set the image capture height in pixels. |  
| setImageCaptureColorEncoding                 | `colorEncoding: string`     | `"YUV"` or `"RGB"`                                                                | void        | Only for android. Set the image capture color encoding type: `"RGB"` or `"YUV"`. |  
| setDetectionBox                              | `enable: boolean`           | `true` or `false`                                                                 | void        | Set to show/hide the face detection box. |
| setDetectionBoxColor                         | `color: string`             | hexadecimal                                                                       | void        | Set detection box color. | 
| setFacePaddingPercent                        | `percentage: string`        |  Value format must be in `NN%`                                                    | void        | Set face image capture and detection box padding in percentage. |    
| setDetectionCaptureMinSize                   | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Set the face minimum size percentage to capture. |  
| setDetectionCaptureMaxSize                   | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Set the face maximum size percentage to capture. |  
| setROI                                       | `enable: boolean`           | `true` or `false`                                                                 | void        | Enable/disable face region of interest capture. |  
| setROITopOffset                              | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Distance in percentage of the top face bounding box with the top of the camera preview. |  
| setROIRightOffset                            | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Distance in percentage of the right face bounding box with the right of the camera preview. |  
| setROIBottomOffset                           | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Distance in percentage of the bottom face bounding box with the bottom of the camera preview. |  
| setROILeftOffset                             | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Distance in percentage of the left face bounding box with the left of the camera preview. |  
| setROIMinSize                                | `percentage: string`        | Value format must be in `NN%`                                                     | void        | Set the minimum face size related within the ROI. |  
| setROIAreaOffset                             | `enable: boolean`           | `true` or `false`                                                                 | void        | Enable/disable display of the region of interest area offset. |  
| setROIAreaOffsetColor                        | `color: string`             | Hexadecimal color                                                                 | void        | Set display of the region of interest area offset color. |  
| setFaceContours                              | `enable: boolean`           | `true` or `false`                                                                 | void        | Enable/disable display list of points on a detected face. |  
| setFaceContoursColor                         | `color: string`             | Hexadecimal color                                                                 | void        | Set face contours color. |  
| setComputerVision (`Android Only`)           | `enable: boolean`           | `true` or `false`                                                                 | void        | Enable/disable computer vision model. |  
| setComputerVisionLoadModels (`Android Only`) | `modelPaths: Array<string>` | Valid system path file to a PyTorch computer vision model                         | void        | Set model to be used when image is captured. To se more about it, <a href="https://github.com/Yoonit-Labs/nativescript-yoonit-camera/wiki">Click Here</a>. |  
| computerVisionClearModels (`Android Only`)   | -                           |  -                                                                                | void        | Clear models that was previous added using `setComputerVisionLoadModels`. |
| setTorch                                     | `enable: boolean`           | `true` or `false`                                                                 | void        | Enable/disable device torch. Available only to camera lens `"back"`. |

#### Events

| Event            | Parameters                                                                                                                                                   | Description  
| -                | -                                                                                                                                                            | -  
| imageCaptured    | `{ type: string, count: number, total: number, image: object = { path: string, source: any, binary: any }, inferences: [{ ['model name']: model output }] }` | Must have started capture type of face/frame. Emitted when the face image file saved: <ul><li>type: "face" or "frame"</li>count: current index</li><li>total: total to create</li><li>image.path: the face/frame image path</li><li>image.source: the blob file</li><li>image.binary: the blob file</li><li>inferences: An Array with models output</li><ul>  
| faceDetected     | `{ x: number, y: number, width: number, height: number, leftEyeOpenProbability: number, rightEyeOpenProbability: number, smilingProbability: number, headEulerAngleX: number, headEulerAngleY: number, headEulerAngleZ: number }` | Must have started capture type of face. Emit the [face analysis](#face-analysis), all parameters null if no more face detecting.      
| endCapture       | -                                                                                                                                                            | Must have started capture type of face/frame. Emitted when the number of image files created is equal of the number of images set (see the method `setImageCaptureAmount`).     
| qrCodeContent    | `{ content: string }` | Must have started capture type of qrcode (see `startCapture`). Emitted when the camera read a QR Code.     
| status           | `{ type: 'error'/'message', status: string }` | Emit message error from native. Used more often for debug purpose.     
| permissionDenied | -                                                                                                                                                            | Emit when try to `preview` but there is not camera permission.

#### Face Analysis

The face analysis is the response send by the `onFaceDetected`. Here we specify all the parameters.

| Attribute               | Type      | Description |
| -                       | -         | -           |
| x                       | `number`  | The `x` position of the face in the screen. |
| y                       | `number`  | The `y` position of the face in the screen. |
| width                   | `number`  | The `width` position of the face in the screen. |
| height                  | `number`  | The `height` position of the face in the screen. |
| leftEyeOpenProbability  | `number?` | The left eye open probability. |
| rightEyeOpenProbability | `number?` | The right eye open probability. |
| smilingProbability      | `number?` | The smiling probability. |
| headEulerAngleX         | `number`  | The angle in degrees that indicate the vertical head direction. See [Head Movements](#headmovements) |
| headEulerAngleY         | `number`  | The angle in degrees that indicate the horizontal head direction. See [Head Movements](#headmovements) |
| headEulerAngleZ         | `number`  | The angle in degrees that indicate the tilt head direction. See [Head Movements](#headmovements) |

#### Head Movements

Here we're explaining the above gif and how reached the "results". Each "movement" (vertical, horizontal and tilt) is a state, based in the angle in degrees that indicate head direction;

| Head Direction | Attribute         |  _v_ < -36° | -36° < _v_ < -12° | -12° < _v_ < 12° | 12° < _v_ < 36° |  36° < _v_  | 
| -              | -                 | -           | -                 | -                | -               | -           |
| Vertical       | `headEulerAngleX` | Super Down  | Down              | Frontal          | Up              | Super Up    |
| Horizontal     | `headEulerAngleY` | Super Right | Right             | Frontal          | Left            | Super Left  |
| Tilt           | `headEulerAngleZ` | Super Left  | Left              | Frontal          | Right           | Super Right |

#### Messages

Pre-define message constants used by the `status` event.

| Message              | Description
| -                    | -
| INVALID_MINIMUM_SIZE | Face/QRCode width percentage in relation of the screen width is less than the set.
| INVALID_MAXIMUM_SIZE | Face/QRCode width percentage in relation of the screen width is more than the set.
| INVALID_OUT_OF_ROI   | Face bounding box is out of the set region of interest.

## Contribute and make it better

Clone the repo, change what you want and send PR.

For commit messages we use <a href="https://www.conventionalcommits.org/">Conventional Commits</a>.

Contributions are always welcome, some people that already contributed!

[<img src="https://contrib.rocks/image?repo=Yoonit-Labs/nativescript-yoonit-camera" />](https://github.com/Yoonit-Labs/nativescript-yoonit-camera/graphs/contributors)
  
---  

Code with ❤ by the [**Cyberlabs AI**](https://cyberlabs.ai/) Front-End Team
