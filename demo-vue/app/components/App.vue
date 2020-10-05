<template>
  <Page @loaded="onLoaded">
    <ActionBar title="Welcome to NativeScript-Vue!"/>
    <GridLayout
      height="100%"
      width="100%"
    >
      <GridLayout
        height="100%"
        width="100%"
      >
        <YoonitCamera
          id="yoonitCameraView"
          @faceDetectedEvent="handleFaceDetected"
          @faceImageCreatedEvent="handleFaceImageCreated"
          @endCaptureEvent="handleEndCapture"
          @barcodeScannedEvent="handleBarcodeScanned"
          @messageEvent="handleMessage"
          @errorEvent="handleError"
        />
      </GridLayout>
      <GridLayout
        height="100%"
        width="100%"
      >
        <FlexboxLayout flexDirection="column" justifyContent="flex-end">
          <Image :src="faceImagePath" width="200" height="200" v-if="captureType === 'face'" />
          <TextField className="message" :text="qrCodeContent" v-if="captureType === 'barcode'" />
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
  import { isIOS } from 'tns-core-modules/platform';

  import * as fileSystemModule from 'tns-core-modules/file-system';
  import * as imageSourceModule from 'tns-core-modules/image-source';

  export default {
    data: () => ({
      yoonitCameraView: null,
      faceImagePath: null,
      captureType: "none",
      cameraLens: "back cam",
      qrCodeContent: "",
    }),

    methods: {
      async onLoaded(args) {
        this.showFaceDetectionBox = true;

        this.yoonitCameraView = args.object.getViewById('yoonitCameraView');

        const permissionGranted = await this.yoonitCameraView.requestCameraPermissions();
        if (permissionGranted) {
          this.yoonitCameraView.startPreview();
        }
      },

      handleFaceDetected({ faceDetected }) {
        // console.log(`handleFaceDetected: ${faceDetected}`);

        if (!faceDetected) {
          this.faceImagePath = null;
        }
      },

      handleFaceImageCreated({ count, total, imagePath }) {
        if (total === 0) {
          console.log(`handleFaceImageCreated: ${count} of ${total} - ${imagePath}`);
        } else {
          console.log(`handleFaceImageCreated: [${count}] ${imagePath}`);
        }

        if (isIOS) {
          // For ios...
          let imageName = imagePath.split('/');
          imageName = imageName[imageName.length - 1];

          let path = fileSystemModule.path.join(fileSystemModule.knownFolders.documents().path,
            imageName);
          this.faceImagePath = imageSourceModule.ImageSource.fromFileSync(path);
        } else {
          // For android...
          this.faceImagePath = imageSourceModule.ImageSource.fromFileSync(imagePath);
        }
      },

      handleEndCapture() {
        console.log(`handleEndCapture`);
      },

      handleBarcodeScanned({ content }) {
        console.log(`handleBarcodeScanned: ${content}`);
        this.qrCodeContent = content;
      },

      handleMessage({ message }) {
        console.log(`Message: ${message}`);
      },

      handleError({ error }) {
        console.log(`handleError: ${error}`);
      },

      handleToggleCameraLens() {
        this.cameraLens = this.cameraLens === "front cam" ? "back cam" : "front cam";
        const currentCameraLens = this.yoonitCameraView.getCameraLens();
        console.log(`handleToggleCameraLens: ${currentCameraLens} change to ${this.cameraLens}`);
        this.yoonitCameraView.toggleCameraLens();
      },

      handleStartCaptureType(captureType) {
        this.captureType = captureType;
        this.yoonitCameraView.startCaptureType(captureType);
      },

      handleToggleFaceDetectionBox() {
        this.showFaceDetectionBox = !this.showFaceDetectionBox;
        console.log(`handleToggleFaceDetectionBox: ${this.showFaceDetectionBox}`);
        this.yoonitCameraView.setFaceDetectionBox(this.showFaceDetectionBox);
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
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
    background-color: #84baa6;
  }

  .message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
  }
</style>
