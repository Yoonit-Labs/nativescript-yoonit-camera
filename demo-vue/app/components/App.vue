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
          id="yooCamera"
          @faceDetected="handleFaceDetected"
          @faceImage="handleFaceImageCreated"
          @endCapture="handleEndCapture"
          @barcodeScanned="handleBarcodeScanned"
          @status="handleStatus"
        />
      </GridLayout>
      <GridLayout
        height="100%"
        width="100%"
      >
        <FlexboxLayout flexDirection="column" justifyContent="flex-end">
          <Image :src="faceImagePath" width="200" height="200" v-if="captureType === 'face'" />
          <TextField class="message" :text="qrCodeContent" v-if="captureType === 'barcode'" />
        </FlexboxLayout>
      </GridLayout>
      <GridLayout
        height="100%"
        width="100%"
      >
        <StackLayout>
          <StackLayout orientation="horizontal">
            <Button
              :text="cameraLens"
              horizontalAlignment="left"
              @tap="handleToggleCameraLens" />
            <Button
              text="TOGGLE BOX"
              horizontalAlignment="left"
              @tap="handleToggleFaceDetectionBox" />
          </StackLayout>
          <Label text="Tipos de Captura:" />
          <StackLayout orientation="horizontal">
            <Button
              :class="captureType === 'none' ? 'selected' : ''"
              text="NONE"
              horizontalAlignment="left"
              @tap='handleStartCaptureType("none")' />
            <Button
              :class="captureType === 'face' ? 'selected' : ''"
              text="FACE"
              horizontalAlignment="left"
              @tap="handleStartCaptureType('face')" />
            <Button
              :class="captureType === 'barcode' ? 'selected' : ''"
              text="QRCODE"
              horizontalAlignment="left"
              @tap="handleStartCaptureType('barcode')" />
          </StackLayout>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
  export default {
    data: () => ({
      $yoo: null,
      faceImagePath: null,
      captureType: "none",
      cameraLens: "back cam",
      showFaceDetectionBox: true,
      qrCodeContent: "",
    }),

    methods: {
      async onLoaded(args) {
        this.$yoo = args.object.getViewById('yooCamera')

        const permissionGranted = await this.$yoo.requestPermission()

        if (permissionGranted) {
          this.$yoo.preview()
        }
      },

      handleFaceDetected({ faceDetected }) {
        if (!faceDetected) {
          this.faceImagePath = null;
        }
      },

      handleFaceImageCreated({
        count,
        total,
        image: {
          path,
          source
        }
      }) {
        if (total !== 0) {
          console.log(`handleFaceImageCreated: [${count}] of [${total}] - ${path}`)
        } else {
          console.log(`handleFaceImageCreated: [${count}] ${path}`)
        }

        this.faceImagePath = source
      },

      handleEndCapture() {
        console.log(`handleEndCapture`)
      },

      handleBarcodeScanned({ content }) {
        console.log(`handleBarcodeScanned: ${content}`)

        this.qrCodeContent = content
      },

      handleStatus({ status }) {
        console.log(`Status: ${JSON.parse(status)}`)
      },

      handleToggleCameraLens() {
        this.cameraLens = this.cameraLens === 'front cam' ?
          'back cam' :
          'front cam'

        const currentCameraLens = this.$yoo.getLens()

        console.log(`handleToggleCameraLens: ${currentCameraLens} change to ${this.cameraLens}`)

        this.$yoo.toggleLens()
      },

      handleStartCaptureType(captureType) {
        this.captureType = captureType
        this.$yoo.startCapture(captureType)
      },

      handleToggleFaceDetectionBox() {
        this.showFaceDetectionBox = !this.showFaceDetectionBox
        console.log(`handleToggleFaceDetectionBox: ${this.showFaceDetectionBox}`)
        this.$yoo.setFaceDetectionBox(this.showFaceDetectionBox)
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #000000;
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
    background-color: #CCCCCC;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
