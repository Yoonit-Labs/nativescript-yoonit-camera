<img src="https://raw.githubusercontent.com/Yoonit-Labs/nativescript-yoonit-camera/development/logo_cyberlabs.png" width="300">

# NativeScript Yoonit Camera

![Generic badge](https://img.shields.io/badge/version-v1.2.0-<COLOR>.svg) ![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)

A NativeScript plugin to provide:
- Modern Android Camera API (Camera X)
- MLKit integration
- Camera preview (Front & Back)
- Face detection (With Min & Max size (Soon))
- Landmark detection (Soon)
- Face crop
- Face capture
- Frame capture
- Face ROI (Soon)
- QR Code scanning
- Better props to setup the initialization your component

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
      @faceDetected="doFaceDetected"
      @faceImage="doImageCreated"
      @frameImage="doImageCreated"
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
      async onLoaded(args) {
        console.log('[YooCamera] Getting Camera view')
        this.$yoo.camera.registerElement(this.$refs.yooCamera)

        console.log('[YooCamera] Getting permission')
        if (await this.$yoo.camera.requestPermission()) {
          console.log('[YooCamera] Permission granted, start preview')

          this.$yoo.camera.preview()
        }
      },

      doFaceDetected({ faceDetected }) {
        console.log('[YooCamera] faceDetected', faceDetected)
      },

      doImageCreated({
        count,
        total,
        image: {
          path,
          source
        }
      }) {
        if (total === 0) {
          console.log('[YooCamera] doFaceImage', `[${count}] ${path}`)
        } else {
          console.log('[YooCamera] doFaceImage', `[${count}] of [${total}] - ${path}`)
        }

        console.log('[YooCamera] doFaceImage', path, source)
      },

      doEndCapture() {
        console.log('[YooCamera] doEndCapture')
      },

      doQRCodeContent({ content }) {
        console.log('[YooCamera] doQRCodeContent', content)
      },

      doStatus({ status }) {
        console.log('[YooCamera] doStatus', JSON.parse(status))
      },

      doToggleLens() {
        const currentCameraLens = this.$yoo.camera.getLens()

        console.log('[YooCamera] doToggleLens', currentCameraLens)

        this.$yoo.camera.toggleLens()
      },

      doStartCapture(captureType) {
        console.log('[YooCamera] doStartCapture', captureType)

        this.$yoo.camera.startCapture(captureType)
      },

      doFaceDetectionBox(status) {
        console.log('[YooCamera] doFaceDetectionBox', status)

        this.$yoo.camera.setFaceDetectionBox(status)
      },

      doPermissionDenied() {
        console.log('[YooCamera] doPermissionDenied')
      }
    }
  }
</script>
```

## API

#### Methods

| Function                        | Parameters                       | Valid values                                                                      | Return Type | Description
| -                               | -                                | -                                                                                 | -           | -
| **`requestPermission`**         | -                                | -                                                                                 | promise     | Ask to user to give the permission to access camera.
| **`hasPermission`**             | -                                | -                                                                                 | boolean     | Return if application has camera permission.
| **`preview`**                   | -                                | -                                                                                 | void        | Start camera preview if has permission.
| **`startCapture`**              | `captureType: string`            | <ul><li>`"none"`</li><li>`"face"`</li><li>`"barcode"`</li><li>`"frame"`</li></ul> | void        | Set capture type none, face, barcode or frame.
| **`stopCapture`**               | -                                | -                                                                                 | void        | Stop any type of capture.
| **`toggleLens`**                | -                                | -                                                                                 | void        | Set camera lens facing front or back.
| **`getLens`**                   | -                                | -                                                                                 | number      | Return `number` that represents lens face state: 0 for front 1 for back camera.  
| **`setFaceNumberOfImages`**     | `faceNumberOfImages: number`     | Any positive `number` value                                                       | void        | Default value is 0. For value 0 is saved infinity images. When saved images reached the "face number os images", the `onEndCapture` is triggered.
| **`setFaceDetectionBox`**       | `faceDetectionBox: boolean`      | `true` or `false`                                                                 | void        | Set to show face detection box when face detected.   
| **`setFaceTimeBetweenImages`**  | `faceTimeBetweenImages: number`  | Any positive `number` that represent time in milli seconds                        | void        | Set saving face images time interval in milli seconds.  
| **`setFacePaddingPercent`**     | `facePaddingPercent: number`     | Any positive `number` value                                                       | void        | Set face image and bounding box padding in percent.  
| **`setFaceImageSize`**          | `faceImageSize: number`          | Any positive `number` value                                                       | void        | Set face image size to be saved.
| **`setFrameNumberOfImages`**    | `frameNumberOfImages: number`    | Any positive `number` value                                                       | void        | Default value is 0. For value 0 is saved infinity images. When saved images reached the "frame number os images", the `onEndCapture` is triggered.
| **`setFrameTimeBetweenImages`** | `frameTimeBetweenImages: number` | Any positive `number` that represent time in milli seconds                        | void        | Set saving frame images time interval in milli seconds.    


#### Events  

| Event            | Parameters                                                                         | Description 
| -                | -                                                                                  | -
| faceImage        | `{ count: number, total: number, image: object = { path: string, source: blob } }` | Must have started capture type of face. Emitted when the face image file is created: <ul><li>count: current index</li><li>total: total to create</li><li>image.path: the face image path</li><li>image.source: the blob file</li><ul>
| frameImage       | `{ count: number, total: number, image: object = { path: string, source: blob } }` | Must have started capture type of frame. Emitted when the frame image file is created: <ul><li>count: current index</li><li>total: total to create</li><li>image.path: the frame image path</li><li>image.source: the blob file</li><ul>
| faceDetected     | `{ x: number, y: number, width: number, height: number }`                          | Must have started capture type of face. Emit the detected face bounding box. Emit all parameters null if no more face detecting.    
| endCapture       | -                                                                                  | Must have started capture type of face or frame. Emitted when the number of face or frame image files created is equal of the number of images set (see the method `setFaceNumberOfImages` for face and `setFrameNumberOfImages`for frame).   
| qrCodeContent    | `{ content: string }`                                                              | Must have started capture type of barcode (see `startCapture`). Emitted when the camera scan a QR Code.   
| status           | `{ type: 'error'/'message', status: string }`                                      | Emit message error from native. Used more often for debug purpose.   
| permissionDenied | -                                                                                  | Emit when try to `preview` but there is not camera permission.


## To contribute and make it better

Clone the repo, change what you want and send PR.

Contributions are always welcome!

---

Code with ❤ by the [**Cyberlabs AI**](https://cyberlabs.ai/) Front-End Team
