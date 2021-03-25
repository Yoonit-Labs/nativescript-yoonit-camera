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
          :flash="enableFlash"
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
                  text="FaceAnalysis"
                  horizontalAlignment="left"
                  @tap="panel = 'analysis'"
              />
            </StackLayout>
          </FlexboxLayout>
          <StackLayout v-show="panel === 'configurations'" backgroundColor="#33333375">
            <FlexboxLayout flexDirection="row">
              <StackLayout width="50%" paddingLeft="-10">
                <YooSwitch
                  label="Capturar Imagem"
                  @tap="enableImageCapture = !enableImageCapture"
                />
                <YooSwitch
                  label="Contorno da Face"
                  @tap="enableFaceContours = !enableFaceContours"
                />
                <YooSwitch
                  label="Face Min 70%"
                  @tap="enableDetactionMinSize = !enableDetactionMinSize"
                />
                <YooSwitch
                  label="Face ROI"
                  @tap="enableROI = !enableROI"
                />
                <YooSwitch
                  label="Lens Front"
                  initialChecked=true
                  @tap="cameraLens = cameraLens === 'back' ? 'front' : 'back'"
                />
              </StackLayout>
              <StackLayout width="50%" paddingLeft="-10">
                <YooSwitch
                  label="Caixa de Detecção"
                  initialChecked=true
                  @tap="enableDetectionBox = !enableDetectionBox"
                />
                <YooSwitch
                  label="Cor do Contorno"
                  @tap="enableFaceContoursColor = !enableFaceContoursColor"
                />
                <YooSwitch
                  label="Cor da Caixa"
                  @tap="enableDetectionBoxColor = !enableDetectionBoxColor"
                />
                <YooSwitch
                  label="Face Max 70%"
                  @tap="enableDetectionMaxsize = !enableDetectionMaxsize"
                />
                <YooSwitch
                  label="Camera"
                  initialChecked=true
                  @tap="toggleCamera"
                />
              </StackLayout>
            </FlexboxLayout>
            <Label text="Tipos de Captura:" marginLeft="10" />
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
            <Label
              marginLeft="10"
              v-show="imagePath"
              :class="isWearingMask ? 'positive-model-result' : 'negative-model-result'"
              :text="isWearingMask ? 'Wearing Mask' : 'Not Wearing Mask'"
            />
          </StackLayout>
          <YooFaceAnalysis
            :show="panel === 'analysis'"
            :faceLeftEyeOpenProbability=faceLeftEyeOpenProbability
            :faceRightEyeOpenProbability=faceRightEyeOpenProbability
            :faceSmilingProbability=faceSmilingProbability
            :faceHeadEulerAngleX=faceHeadEulerAngleX
            :faceHeadEulerAngleY=faceHeadEulerAngleY
            :faceHeadEulerAngleZ=faceHeadEulerAngleZ
          />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
  import {
    knownFolders,
    path
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
      enableImageCapture: false,
      enableDetectionBox: true,
      enableDetectionBoxColor: false,
      enableFaceContours: false,
      enableFaceContoursColor: false,
      enableDetectionMinSize: false,
      enableDetectionMaxsize: false,
      enableROI: false,
      imagePath: null,
      imageInformationCaptured: "",
      qrCodeContent: "",
      isWearingMask: false,
      faceLeftEyeOpenProbability: "",
      faceRightEyeOpenProbability: "",
      faceSmilingProbability: "",
      faceHeadEulerAngleX: "",
      faceHeadEulerAngleY: "",
      faceHeadEulerAngleZ: "",
      enableFlash: false,
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
        inferences
      }) {
        if (total === 0) {
          console.log('[YooCamera] doImageCaptured', `${type}: [${count}] ${path}`)
          this.imageInformationCaptured = `${count}`
        } else {
          console.log('[YooCamera] doImageCaptured', `${type}: [${count}] of [${total}] - ${path}`)
          this.imageInformationCaptured = `${count} de ${total}`
        }
        this.doVerifyMaskUsage(inferences)
        this.imagePath = source
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
        console.log('[YooCamera] Mask Pytorch', inferences)

        const THRESHOLD = 0.8
        const MODEL_NAME = 'mask_custom_model.pt'

        if (!inferences[0] || !inferences[0][MODEL_NAME]) {
          return
        }

        this.isWearingMask = inferences[0][MODEL_NAME] <= THRESHOLD;
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
  .positive-model-result {
    color: green;
    font-size: 14;
  }
  .negative-model-result {
    color: red;
    font-size: 14;
  }
</style>
