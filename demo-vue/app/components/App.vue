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
          @faceDetected="doFaceDetected"
          @faceImage="doImageCreated"
          @frameImage="doImageCreated"
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
        <FlexboxLayout flexDirection="column" justifyContent="flex-end">
          <Image :src="imagePath" width="200" height="200" v-if="faceSaveImages && (captureType === 'face' || captureType === 'frame')" />
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
            <Button
              text="TOGGLE SAVE"
              horizontalAlignment="left"
              @tap="doFaceSaveImages" />
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
            <Button
                :class="captureType === 'frame' ? 'selected' : ''"
                text="FRAME"
                horizontalAlignment="left"
                @tap="doStartCapture('frame')" />
          </StackLayout>
          <FlexboxLayout>
            <Label
              v-if="captureType === 'face' || captureType === 'frame'"
              text="Quantidade de captura de imagens: "
            />
            <Label
              v-if="captureType === 'face' || captureType === 'frame'"
              :text="imageCreated"
            />
          </FlexboxLayout>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
  const application = require("tns-core-modules/application");

  export default {
    data: () => ({
      imagePath: null,
      imageCreated: "",
      showFaceDetectionBox: true,
      faceSaveImages: false,
      captureType: "NONE",
      cameraLens: "BACK CAM",
      qrCodeContent: ""
    }),

    methods: {
      async onLoaded(args) {

        console.log('[YooCamera] Getting Camera view')
        this.$yoo.camera.registerElement(this.$refs.yooCamera)

        console.log('[YooCamera] Getting permission')
        if (await this.$yoo.camera.requestPermission()) {
          console.log('[YooCamera] Permission granted, start preview')
          this.$yoo.camera.stopCapture()
          console.log('[YooCamera] stopCapture')
          this.$yoo.camera.preview()

          // Workaround to start capture face on Android. Android need some time to start preview.
          setTimeout(() => {
            this.doStartCapture('face')
            console.log('[YooCamera] startCapture')
          }, 500)
        }
      },

      doFaceDetected({ x, y, width, height }) {
        console.log('[YooCamera] doFaceDetected', `{x: ${x}, y: ${y}, width: ${width}, height: ${height}}`)
        if (!x || !y || !width || !height) {
          this.imagePath = null
        }
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
          console.log('[YooCamera] doImageCreated', `[${count}] ${path}`)
          this.imageCreated = `${count}`
        } else {
          console.log('[YooCamera] doImageCreated', `[${count}] of [${total}] - ${path}`)
          this.imageCreated = `${count} de ${total}`
        }

        this.imagePath = source
      },

      doEndCapture() {
        console.log('[YooCamera] doEndCapture')
      },

      doQRCodeContent({ content }) {
        console.log('[YooCamera] doQRCodeContent', content)

        this.qrCodeContent = content
      },

      doStatus({ status }) {
        console.log('[YooCamera] doStatus', status)
      },

      doToggleLens() {
        this.cameraLens = this.cameraLens === 'FRONT CAM' ?
          'BACK CAM' :
          'FRONT CAM'

        const currentCameraLens = this.$yoo.camera.getLens()

        console.log('[YooCamera] doToggleLens', currentCameraLens)

        this.$yoo.camera.toggleLens()
      },

      doStartCapture(captureType) {
        console.log('[YooCamera] doStartCapture', captureType)

        this.captureType = captureType
        this.$yoo.camera.startCapture(captureType)
      },

      doFaceDetectionBox() {
        this.showFaceDetectionBox = !this.showFaceDetectionBox

        console.log('[YooCamera] doFaceDetectionBox')

        this.$yoo.camera.setFaceDetectionBox(this.showFaceDetectionBox)
      },

      doFaceSaveImages() {
        this.faceSaveImages = !this.faceSaveImages

        console.log('[YooCamera] doFaceSaveImages')

        this.$yoo.camera.setFaceSaveImages(this.faceSaveImages)
      },

      doPermissionDenied() {
        console.log('[YooCamera] doPermissionDenied')
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
