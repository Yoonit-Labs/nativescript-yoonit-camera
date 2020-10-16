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
          @faceImage="doFaceImage"
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
          <FlexboxLayout>
            <Label
              v-if="captureType === 'face'"
              text="Quantidade de captura de faces: "
            />
            <Label
              v-if="captureType === 'face'"
              :text="faceImagesCreated"
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
      faceImagePath: null,
      faceImagesCreated: "",
      showFaceDetectionBox: true,
      captureType: "none",
      cameraLens: "back cam",
      qrCodeContent: "",
    }),

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
        if (!faceDetected) {
          this.faceImagePath = null
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
        if (total === 0) {
          console.log('[YooCamera] doFaceImage', `[${count}] of [${total}] - ${path}`)
          this.faceImagesCreated = `${count}`
        } else {
          console.log('[YooCamera] doFaceImage', `[${count}] ${path}`)
          this.faceImagesCreated = `${count} de ${total}`
        }

        this.faceImagePath = source
      },

      doEndCapture() {
        console.log('[YooCamera] doEndCapture')
      },

      doQRCodeContent({ content }) {
        console.log('[YooCamera] doQRCodeContent', content)

        this.qrCodeContent = content
      },

      doStatus({ status }) {
        console.log('[YooCamera] doStatus', JSON.parse(status))
      },

      doToggleLens() {
        this.cameraLens = this.cameraLens === 'front cam' ?
          'back cam' :
          'front cam'

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

        console.log('[YooCamera] doFaceDetectionBox', status)

        this.$yoo.camera.setFaceDetectionBox(this.showFaceDetectionBox)
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
