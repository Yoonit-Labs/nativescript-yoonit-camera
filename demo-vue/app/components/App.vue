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
          @faceDetected="doFaceDetected"
          @faceImage="doFaceImage"
          @endCapture="doEndCapture"
          @qrCodeContent="doQRCodeContent"
          @status="doStatus"
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
              @tap="doToggleLens" />
            <Button
              text="TOGGLE BOX"
              horizontalAlignment="left"
              @tap="doFaceDetectionBox" />
          </StackLayout>
          <Label text="Tipos de Captura:" />
          <StackLayout orientation="horizontal">
            <Button
              :class="captureType === 'none' ? 'selected' : ''"
              text="NONE"
              horizontalAlignment="left"
              @tap='doStartCapture("none")' />
            <Button
              :class="captureType === 'face' ? 'selected' : ''"
              text="FACE"
              horizontalAlignment="left"
              @tap="doStartCapture('face')" />
            <Button
              :class="captureType === 'barcode' ? 'selected' : ''"
              text="QRCODE"
              horizontalAlignment="left"
              @tap="doStartCapture('barcode')" />
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
        this.$yoo = {
          camera: null
        }

        this.$yoo.camera = args.object.getViewById('yooCamera')

        const permissionGranted = await this.$yoo.camera.requestPermission()

        if (permissionGranted) {
          this.$yoo.camera.preview()
        }
      },

      doFaceDetected({ faceDetected }) {
        if (!faceDetected) {
          this.faceImagePath = null;
        }
      },

      doFaceImage({
        count,
        total,
        image: {
          path,
          source
        }
      }) {
        if (total !== 0) {
          console.log(`doFaceImage: [${count}] of [${total}] - ${path}`)
        } else {
          console.log(`doFaceImage: [${count}] ${path}`)
        }

        this.faceImagePath = source
      },

      doEndCapture() {
        console.log(`doEndCapture`)
      },

      doQRCodeContent({ content }) {
        console.log(`doQRCodeContent: ${content}`)

        this.qrCodeContent = content
      },

      doStatus({ status }) {
        console.log(`Status: ${JSON.parse(status)}`)
      },

      doToggleLens() {
        this.cameraLens = this.cameraLens === 'front cam' ?
          'back cam' :
          'front cam'

        const currentCameraLens = this.$yoo.camera.getLens()

        console.log(`doToggleLens: ${currentCameraLens} change to ${this.cameraLens}`)

        this.$yoo.camera.toggleLens()
      },

      doStartCapture(captureType) {
        this.captureType = captureType
        this.$yoo.camera.startCapture(captureType)
      },

      doFaceDetectionBox() {
        this.showFaceDetectionBox = !this.showFaceDetectionBox
        console.log(`doFaceDetectionBox: ${this.showFaceDetectionBox}`)
        this.$yoo.camera.setFaceDetectionBox(this.showFaceDetectionBox)
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
