<template>
  <Page @loaded="onLoaded">
    <ActionBar title="Yoonit Camera"/>
    <GridLayout
      height="100%"
      width="100%"
    >
      <GridLayout
        height="100%"
        width="100%"
      >
        <YoonitCamera
          ref="yooCamera"
          :torch="enableTorch"
          :lens="cameraLens"
          :captureType="captureType"
          :computerVision="true"
          :detectionBox="enableDetectionBox"
          :detectionBoxColor="enableDetectionBoxColor ? '#FF0000' : '#FFFFFF'"
          :faceContours="enableFaceContours"
          :faceContoursColor="enableFaceContoursColor ? '#FF0000' : '#FFFFFF'"
          :detectionMinSize="enableDetectionMinSize ? '70%' : '0%'"
          :detectionMaxSize="enableDetectionMaxsize ? '80%' : '100%'"
          :roi="enableROI"
          :roiAreaOffset="true"
          :roiAreaOffsetColor="enableROIAreaOffsetColor ? '#FF0000' : '#FFFFFF'"
          :roiTopOffset="'10%'"
          :roiRightOffset="'10%'"
          :roiBottomOffset="'10%'"
          :roiLeftOffset="'10%'"
          :imageCapture="enableImageCapture"
          :imageCaptureAmount="0"
          :imageCaptureInterval="300"
          @faceDetected="doFaceDetected"
          @imageCaptured="doImageCaptured"
          @endCapture="doEndCapture"
          @qrCodeContent="doQRCodeContent"
          @status="doStatus"
          @permissionDenied="doPermissionDenied"
        />
      </GridLayout>
      <GridLayout
          height="100%"
          width="100%"
      >
        <FlexboxLayout
            flexDirection="column"
            justifyContent="flex-end"
        >
          <Image
              :src="imagePath"
              width="200"
              height="200"
              v-if="enableImageCapture && (captureType === 'face' || captureType === 'frame')"
          />
          <TextField
              class="message"
              :text="qrCodeContent"
              v-if="captureType === 'qrcode'"
          />
        </FlexboxLayout>
      </GridLayout>
      <GridLayout
        height="100%"
        width="100%"
      >
        <StackLayout>
          <FlexboxLayout flexDirection="row" backgroundColor="#26262675">
            <StackLayout orientation="horizontal">
              <Button
                :class="panel === 'configurations' ? 'selected' : ''"
                text="Configurações"
                horizontalAlignment="left"
                @tap='panel = "configurations"'
              />
              <Button
                :class="panel === 'analysis' ? 'selected' : ''"
                text="Análise da Face"
                horizontalAlignment="left"
                @tap="panel = 'analysis'"
              />
              <Button
                :class="panel === 'hide' ? 'selected' : ''"
                text="X"
                horizontalAlignment="left"
                @tap="panel = 'hide'"
              />
            </StackLayout>
          </FlexboxLayout>
          <StackLayout v-show="panel === 'configurations'" backgroundColor="#33333375">
            <FlexboxLayout flexDirection="row">
              <StackLayout width="50%" paddingLeft="-10">
                <YooSwitch
                  label="Camera"
                  initialChecked="true"
                  @tap="toggleCamera"
                />
                <YooSwitch
                  label="Capturar Imagem"
                  initialChecked="true"
                  @tap="enableImageCapture = !enableImageCapture"
                />
                <YooSwitch
                  label="Caixa de Detecção"
                  initialChecked="true"
                  @tap="enableDetectionBox = !enableDetectionBox"
                />
                <YooSwitch
                  label="Contorno da Face"
                  @tap="enableFaceContours = !enableFaceContours"
                />
                <YooSwitch
                  label="ROI"
                  @tap="enableROI = !enableROI"
                />
                <YooSwitch
                  label="Tam Mín 70%"
                  @tap="enableDetectionMinSize = !enableDetectionMinSize"
                />
              </StackLayout>
              <StackLayout width="50%" paddingLeft="-10">
                <YooSwitch
                  label="Lanterna"
                  @tap="enableTorch = !enableTorch"
                />
                <YooSwitch
                  label="Lente Frontal"
                  initialChecked="true"
                  @tap="cameraLens = cameraLens === 'back' ? 'front' : 'back'"
                />
                <YooSwitch
                  label="Cor da Caixa"
                  @tap="enableDetectionBoxColor = !enableDetectionBoxColor"
                />
                <YooSwitch
                  label="Cor do Contorno"
                  @tap="enableFaceContoursColor = !enableFaceContoursColor"
                />
                <YooSwitch
                  label="Cor do ROI"
                  @tap="enableROIAreaOffsetColor = !enableROIAreaOffsetColor"
                />
                <YooSwitch
                  label="Tam Max 70%"
                  @tap="enableDetectionMaxsize = !enableDetectionMaxsize"
                />
              </StackLayout>
            </FlexboxLayout>
            <Label text="Tipos de Captura:" marginLeft="10"/>
            <StackLayout orientation="horizontal">
              <Button
                :class="captureType === 'none' ? 'selected' : ''"
                text="NONE"
                horizontalAlignment="left"
                @tap='captureType = "none"'
              />
              <Button
                :class="captureType === 'face' ? 'selected' : ''"
                text="FACE"
                horizontalAlignment="left"
                @tap="captureType = 'face'"
              />
              <Button
                :class="captureType === 'qrcode' ? 'selected' : ''"
                text="QRCODE"
                horizontalAlignment="left"
                @tap="captureType = 'qrcode'"
              />
              <Button
                :class="captureType === 'frame' ? 'selected' : ''"
                text="FRAME"
                horizontalAlignment="left"
                @tap="captureType = 'frame'"
              />
            </StackLayout>
            <FlexboxLayout>
              <Label
                marginLeft="10"
                v-if="captureType === 'face' || captureType === 'frame'"
                text="Quantidade de captura de imagens: "
              />
              <Label
                v-if="captureType === 'face' || captureType === 'frame'"
                :text="imageInformationCaptured"
              />
            </FlexboxLayout>
          </StackLayout>
          <YooFaceAnalysis
            :show="panel === 'analysis'"
            :faceLeftEyeOpenProbability=faceLeftEyeOpenProbability
            :faceRightEyeOpenProbability=faceRightEyeOpenProbability
            :faceSmilingProbability=faceSmilingProbability
            :faceHeadEulerAngleX=faceHeadEulerAngleX
            :faceHeadEulerAngleY=faceHeadEulerAngleY
            :faceHeadEulerAngleZ=faceHeadEulerAngleZ
            :imagePath=imagePath
            :imageDarkness="imageDarkness"
            :imageLightness="imageLightness"
            :imageSharpness="imageSharpness"
            :computerVisionMaskInference=computerVisionMaskInference
          />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import {
  knownFolders,
  path,
  isAndroid,
} from '@nativescript/core'
import YooSwitch from '~/components/YooSwitch';
import YooFaceAnalysis from '~/components/YooFaceAnalysis';

export default {
  components: { YooFaceAnalysis, YooSwitch },
  data: () => ({
    panel: 'analysis',
    cameraLens: 'front',
    captureType: 'face',
    enableCamera: true,
    enableTorch: false,
    enableImageCapture: true,
    enableDetectionBox: true,
    enableDetectionBoxColor: false,
    enableFaceContours: false,
    enableFaceContoursColor: false,
    enableDetectionMinSize: false,
    enableDetectionMaxsize: false,
    enableROI: false,
    enableROIAreaOffsetColor: false,
    imagePath: null,
    imageInformationCaptured: '',
    imageDarkness: null,
    imageLightness: null,
    imageSharpness: null,
    qrCodeContent: '',
    computerVisionMaskInference: null,
    faceLeftEyeOpenProbability: '',
    faceRightEyeOpenProbability: '',
    faceSmilingProbability: '',
    faceHeadEulerAngleX: '',
    faceHeadEulerAngleY: '',
    faceHeadEulerAngleZ: '',
  }),

  methods: {
    async onLoaded() {
      console.log('[YooCamera] Getting Camera view')

      this.$yoo.camera.registerElement(this.$refs.yooCamera)
      await this.doPreview()
      this.doLoadComputerVisionModels()
    },
    async doPreview() {
      console.log('[YooCamera] Getting permission')

      if (await this.$yoo.camera.requestPermission()) {
        console.log('[YooCamera] Permission granted, start preview')
        this.$yoo.camera.preview()
      }
    },
    doLoadComputerVisionModels() {
      const currentApp = knownFolders.currentApp()
      const modelPath = path.join(currentApp.path, 'models', 'mask_custom_model.pt')
      this.$yoo.camera.setComputerVisionLoadModels([modelPath])
    },
    async toggleCamera() {
      this.enableCamera = !this.enableCamera;
      this.enableCamera ? await this.doPreview() : this.$yoo.camera.destroy();
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
      this.faceLeftEyeOpenProbability = parseFloat(leftEyeOpenProbability).toFixed(4);
      this.faceRightEyeOpenProbability = parseFloat(rightEyeOpenProbability).toFixed(4);
      this.faceSmilingProbability = parseFloat(smilingProbability).toFixed(4);
      this.faceHeadEulerAngleX = parseFloat(headEulerAngleX).toFixed(4);
      this.faceHeadEulerAngleY = parseFloat(headEulerAngleY).toFixed(4);
      this.faceHeadEulerAngleZ = parseFloat(headEulerAngleZ).toFixed(4);

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
      inferences,
      darkness,
      lightness,
      sharpness
    }) {
      if (total === 0) {
        console.log('[YooCamera] doImageCaptured', `${type}: [${count}] ${path}`)
        this.imageInformationCaptured = `${count}`
      } else {
        console.log('[YooCamera] doImageCaptured', `${type}: [${count}] of [${total}] - ${path}`)
        this.imageInformationCaptured = `${count} de ${total}`
      }

      this.imageDarkness = parseFloat(darkness).toFixed(4)
      this.imageLightness = parseFloat(lightness).toFixed(4)
      this.imageSharpness = parseFloat(sharpness).toFixed(4)
      this.imagePath = source

      this.doVerifyMaskUsage(inferences)
    },
    doEndCapture() {
      console.log('[YooCamera] doEndCapture');
    },
    doQRCodeContent({ content }) {
      console.log('[YooCamera] doQRCodeContent', content);
      this.qrCodeContent = content;
    },
    doStatus({ status }) {
      console.log('[YooCamera] doStatus', status);
    },
    doPermissionDenied() {
      console.log('[YooCamera] doPermissionDenied');
    },
    doVerifyMaskUsage(inferences) {
      if (isAndroid) {
        const MODEL_NAME = 'mask_custom_model.pt'

        if (!inferences[0] || !inferences[0][MODEL_NAME]) {
          return
        }

        this.computerVisionMaskInference = parseFloat(inferences[0][MODEL_NAME]).toFixed(4);
      } else {
        this.computerVisionMaskInference = null;
      }
    }
  }
}
</script>

<style scoped>
ActionBar {
  background-color: #000000;
  color: #ffffff;
}
Label {
  font-size: 14;
  color: #ffffff;
}
Button {
  padding: 8 12;
  color: #333333;
  background-color: lightgray;
  border-radius: 8;
  margin: 8 0 8 12;
}
.selected {
  color: white;
  background-color: #9b9b9b;
}
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
