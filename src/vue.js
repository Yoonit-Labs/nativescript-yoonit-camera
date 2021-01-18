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
      () => YoonitCamera
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
        toggleLens,
        setCameraLens,
        getLens,
        startCapture,
        setImageCaptureAmount,
        setImageCaptureInterval,
        setImageCaptureWidth,
        setImageCaptureHeight,
        setFaceDetectionBox,
        setImageCapture,
        setImageCaptureColorEncoding,
        setFacePaddingPercent,
        setFaceCaptureMinSize,
        setFaceCaptureMaxSize,
        setFaceROIEnable,
        setFaceROIMinSize,
        setFaceROITopOffset,
        setFaceROIRightOffset,
        setFaceROIBottomOffset,
        setFaceROILeftOffset,
      } = element.nativeView

      Vue.prototype.$yoo.camera = {
        ...Vue.prototype.$yoo.camera,
        destroy,
        nativeView,
        requestPermission,
        hasPermission,
        preview,
        stopCapture,
        toggleLens,
        setCameraLens,
        getLens,
        startCapture,
        setImageCaptureAmount,
        setImageCaptureInterval,
        setImageCaptureWidth,
        setImageCaptureHeight,
        setFaceDetectionBox,
        setImageCapture,
        setImageCaptureColorEncoding,
        setFacePaddingPercent,
        setFaceCaptureMinSize,
        setFaceCaptureMaxSize,
        setFaceROIEnable,
        setFaceROIMinSize,
        setFaceROITopOffset,
        setFaceROIRightOffset,
        setFaceROIBottomOffset,
        setFaceROILeftOffset,
      }

      return Vue.prototype.$yoo.camera
    }

    return destroy()
  }
}
