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
          faceROIAreaOffsetColor="#0081A7"
          :lens="cameraLens"
          :captureType="captureType"
          :imageCaptureAmount="imageCaptureAmount"
          :imageCaptureInterval="imageCaptureInterval"
          :imageCapture="imageCapture"
          :faceDetectionBox="faceDetectionBox"
          :faceROI="faceROI"
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
            v-if="imageCapture && (captureType === 'face' || captureType === 'frame')"
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
          <StackLayout orientation="horizontal">
            <Button
              :text="cameraLens === 'back' ? 'BACK CAM' : 'FRONT CAM'"
              horizontalAlignment="left"
              @tap="doToggleCameraLens" />
            <Button
              text="TOGGLE BOX"
              horizontalAlignment="left"
              @tap="faceDetectionBox = !faceDetectionBox" />
            <Button
              text="TOGGLE SAVE"
              horizontalAlignment="left"
              @tap="imageCapture = !imageCapture" />
          </StackLayout>
          <Label text="Tipos de Captura:" />
          <StackLayout orientation="horizontal">
            <Button
              :class="captureType === 'none' ? 'selected' : ''"
              text="NONE"
              horizontalAlignment="left"
              @tap='captureType ="none"' />
            <Button
              :class="captureType === 'face' ? 'selected' : ''"
              text="FACE"
              horizontalAlignment="left"
              @tap="captureType = 'face'" />
            <Button
              :class="captureType === 'qrcode' ? 'selected' : ''"
              text="QRCODE"
              horizontalAlignment="left"
              @tap="captureType = 'qrcode'" />
            <Button
              :class="captureType === 'frame' ? 'selected' : ''"
              text="FRAME"
              horizontalAlignment="left"
              @tap="captureType = 'frame'" />
          </StackLayout>
          <FlexboxLayout>
            <Label
              v-if="captureType === 'face' || captureType === 'frame'"
              text="Quantidade de captura de imagens: "
            />
            <Label
              v-if="captureType === 'face' || captureType === 'frame'"
              :text="imageInformationCaptured"
            />
          </FlexboxLayout>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
  export default {
    data: () => ({
      cameraLens: 'front',
      captureType: 'face',
      imageCaptureAmount: 0,
      imageCaptureInterval: 500,
      imageCapture: true,
      faceDetectionBox: true,
      faceROI: true,
      imagePath: null,
      imageInformationCaptured: "",
      qrCodeContent: ""
    }),

    methods: {
      async onLoaded() {

        console.log('[YooCamera] Getting Camera view')
        this.$yoo.camera.registerElement(this.$refs.yooCamera)

        console.log('[YooCamera] Getting permission')
        if (await this.$yoo.camera.requestPermission()) {

          console.log('[YooCamera] Permission granted, start preview')
          this.$yoo.camera.preview()

        this.$yoo.camera.setFaceROITopOffset('10%')
        this.$yoo.camera.setFaceROIRightOffset('10%')
        this.$yoo.camera.setFaceROILeftOffset('10%')
        this.$yoo.camera.setFaceROIBottomOffset('10%')
        this.$yoo.camera.setFaceROIMinSize('10%')
        this.$yoo.camera.setFaceROIAreaOffset(true)
        }
      },

      doFaceDetected({ x, y, width, height }) {
        console.log(
          '[YooCamera] doFaceDetected',
          `{x: ${x}, y: ${y}, width: ${width}, height: ${height}}`
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
        }
      }) {
        if (total === 0) {
          console.log('[YooCamera] doImageCaptured', `${type}: [${count}] ${path}`)
          this.imageInformationCaptured = `${count}`
        } else {
          console.log('[YooCamera] doImageCaptured', `${type}: [${count}] of [${total}] - ${path}`)
          this.imageInformationCaptured = `${count} de ${total}`
        }

        this.imagePath = source
      },

      doToggleCameraLens() {
        console.log('[YooCamera] doToggleCameraLens');

        this.cameraLens = this.cameraLens === 'back' ? 'front' : 'back';
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
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #000000;
    color: #ffffff;
  }

  Label {
    margin-left: 12;
  }

  Button {
    padding: 8 12;
    color: #333333;
    background-color: lightgray;
    border-radius: 8;
    margin: 8 0 8 12;
  }

  .selected {
    background-color: #CCCCCC;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
