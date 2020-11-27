// +-+-+-+-+-+-+
// |y|o|o|n|i|t|
// +-+-+-+-+-+-+
//
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// | Yoonit Camera Plugin for NativeScript applications              |
// | Luigui Delyer, Haroldo Teruya,                                  |
// | Victor Goulart & Márcio Bruffato @ Cyberlabs AI 2020            |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

import { YoonitCamera } from './Yoonit.Camera'

export default {
  install (Vue) {
    Vue.registerElement(
      'YoonitCamera',
      () => require('./Yoonit.Camera')
        .YoonitCamera
    )

    Vue.prototype.$yoo = {
      ...Vue.prototype.$yoo,
      camera: undefined
    }

    const destroy = () => {
      if (Vue.prototype.$yoo.camera &&
          Vue.prototype.$yoo.camera.stopCapture instanceof Function) {
        Vue.prototype.$yoo.camera.stopCapture()
      }

      Vue.prototype.$yoo = {
        ...Vue.prototype.$yoo,
        camera: {
          registerElement
        }
      }

      return Vue.prototype.$yoo.camera
    }

    const registerElement = element => {
      if (!element.nativeView) {
        return
      }

      const {
        nativeView,
        requestPermission,
        hasPermission,
        preview,
        stopCapture,
        setLens,
        toggleLens,
        getLens,
        startCapture,
        setFaceNumberOfImages,
        setFaceDetectionBox,
        setFaceSaveImages,
        setFaceTimeBetweenImages,
        setFacePaddingPercent,
        setFaceImageSize,
        setFaceCaptureMinSize,
        setFaceCaptureMaxSize,
        setFrameNumberOfImages,
        setFrameTimeBetweenImages,
        setFaceROIEnable,
        setFaceROIOffset,
        setFaceROIMinSize,
      } = element.nativeView

      Vue.prototype.$yoo.camera = {
        ...Vue.prototype.$yoo.camera,
        destroy,
        nativeView,
        requestPermission,
        hasPermission,
        preview,
        startCapture,
        stopCapture,
        setLens,
        toggleLens,
        getLens,
        setFaceNumberOfImages,
        setFaceDetectionBox,
        setFaceSaveImages,
        setFaceTimeBetweenImages,
        setFacePaddingPercent,
        setFaceImageSize,
        setFaceCaptureMinSize,
        setFaceCaptureMaxSize,
        setFrameNumberOfImages,
        setFrameTimeBetweenImages,
        setFaceROIEnable,
        setFaceROIOffset,
        setFaceROIMinSize,
      }

      return Vue.prototype.$yoo.camera
    }

    return destroy()
  }
}
