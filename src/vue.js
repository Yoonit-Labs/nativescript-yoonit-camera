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
          Vue.prototype.$yoo.camera.destroy instanceof Function) {
        Vue.prototype.$yoo.camera.destroy()
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
        destroy,
        toggleLens,
        setCameraLens,
        getLens,
        startCapture,
        setImageCapture,
        setImageCaptureAmount,
        setImageCaptureInterval,
        setImageCaptureWidth,
        setImageCaptureHeight,
        setImageCaptureColorEncoding,
        setDetectionBox,
        setDetectionBoxColor,
        setDetectionMinSize,
        setDetectionMaxSize,
        setDetectionTopSize,
        setDetectionRightSize,
        setDetectionBottomSize,
        setDetectionLeftSize,
        setROI,
        setROITopOffset,
        setROIRightOffset,
        setROIBottomOffset,
        setROILeftOffset,
        setROIAreaOffset,
        setROIAreaOffsetColor,
        setFaceContours,
        setFaceContoursColor,
        setComputerVision,
        setComputerVisionLoadModels,
        computerVisionClearModels,
        setTorch,
      } = element.nativeView

      Vue.prototype.$yoo.camera = {
        ...Vue.prototype.$yoo.camera,
        nativeView,
        requestPermission,
        hasPermission,
        preview,
        stopCapture,
        destroy,
        toggleLens,
        setCameraLens,
        getLens,
        startCapture,
        setImageCapture,
        setImageCaptureAmount,
        setImageCaptureInterval,
        setImageCaptureWidth,
        setImageCaptureHeight,
        setImageCaptureColorEncoding,
        setDetectionBox,
        setDetectionBoxColor,
        setDetectionMinSize,
        setDetectionMaxSize,
        setDetectionTopSize,
        setDetectionRightSize,
        setDetectionBottomSize,
        setDetectionLeftSize,
        setROI,
        setROITopOffset,
        setROIRightOffset,
        setROIBottomOffset,
        setROILeftOffset,
        setROIAreaOffset,
        setROIAreaOffsetColor,
        setFaceContours,
        setFaceContoursColor,
        setComputerVision,
        setComputerVisionLoadModels,
        computerVisionClearModels,
        setTorch,
      }

      return Vue.prototype.$yoo.camera
    }

    return destroy()
  }
}
