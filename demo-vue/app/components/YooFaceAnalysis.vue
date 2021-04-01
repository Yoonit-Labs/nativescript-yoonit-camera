<template>
  <StackLayout
    v-show="show"
    backgroundColor="#33333375"
    paddingLeft="10"
    paddingRight="10"
    paddingBottom="10"
  >
    <FlexboxLayout flexDirection="row" justifyContent="space-between">
      <Label :text="'Olho Esquerdo: ' + getEyeOpen(faceLeftEyeOpenProbability)" />
      <Label :text="'raw: ' + (isNaN(faceLeftEyeOpenProbability) ? '-' : faceLeftEyeOpenProbability)" />
    </FlexboxLayout>
    <FlexboxLayout flexDirection="row" justifyContent="space-between">
      <Label :text="'Olho Direito: ' + getEyeOpen(faceRightEyeOpenProbability)" />
      <Label :text="'raw: ' + (isNaN(faceRightEyeOpenProbability) ? '-' : faceRightEyeOpenProbability)" />
    </FlexboxLayout>
    <FlexboxLayout flexDirection="row" justifyContent="space-between">
      <Label :text="'Sorrindo: ' + getSmile(faceSmilingProbability)" />
      <Label :text="'raw: ' + (isNaN(faceSmilingProbability) ? '-' : faceSmilingProbability)" />
    </FlexboxLayout>
    <FlexboxLayout flexDirection="row" justifyContent="space-between">
      <Label :text="'Vertical: ' + getMovementVertical(faceHeadEulerAngleX)" />
      <Label :text="'raw: ' + (isNaN(faceHeadEulerAngleX) ? '-' : faceHeadEulerAngleX)" />
    </FlexboxLayout>
    <FlexboxLayout flexDirection="row" justifyContent="space-between">
      <Label :text="'Horizontal: ' + getMovementHorizontal(faceHeadEulerAngleY)" />
      <Label :text="'raw: ' + (isNaN(faceHeadEulerAngleY) ? '-' : faceHeadEulerAngleY)" />
    </FlexboxLayout>
    <FlexboxLayout flexDirection="row" justifyContent="space-between">
      <Label :text="'Tilt: ' + getMovementTilt(faceHeadEulerAngleZ)" />
      <Label :text="'raw: ' + (isNaN(faceHeadEulerAngleZ) ? '-' : faceHeadEulerAngleZ)" />
    </FlexboxLayout>
    <Label
      v-show="imagePath && !!isWearingMask"
      :class="isWearingMask ? 'positive-model-result' : 'negative-model-result'"
      :text="isWearingMask ? 'Usando Máscara' : 'Não possui Máscara'"
    />
  </StackLayout>
</template>

<script>
export default {
  name: 'YooFaceAnalysis',
  props: {
    show: {
      default: true,
    },
    faceLeftEyeOpenProbability: {
      default: "-"
    },
    faceRightEyeOpenProbability: {
      default: "-"
    },
    faceSmilingProbability: {
      default: "-"
    },
    faceHeadEulerAngleX: {
      default: "-"
    },
    faceHeadEulerAngleY: {
      default: "-"
    },
    faceHeadEulerAngleZ: {
      default: "-"
    },
    imagePath: {
      default: "-"
    },
    isWearingMask: {
      default: false
    }
  },
  methods: {
    getEyeOpen(probability) {
      if (isNaN(probability)) {
        return '-'
      }
      return probability > 0.8 ? 'Aberto' : 'Fechado'
    },
    getSmile(probability) {
      if (isNaN(probability)) {
        return '-'
      }
      return probability > 0.8 ? 'Sim' : 'Não'
    },
    getMovementVertical(angle) {
      if (angle < -36) {
        return 'Super Down';
      } else if (-36 < angle && angle < -12) {
        return 'Down';
      } else if (-12 < angle && angle < 12) {
        return 'Frontal';
      } else if (12 < angle && angle < 36) {
        return 'Up';
      } else if (36 < angle) {
        return 'Super Up';
      }
      return '-';
    },
    getMovementHorizontal(angle) {
      if (angle < -36) {
        return 'Super Left';
      } else if (-36 < angle && angle < -12) {
        return 'Left';
      } else if (-12 < angle && angle < 12) {
        return 'Frontal';
      } else if (12 < angle && angle < 36) {
        return 'Right';
      } else if (36 < angle) {
        return 'Super Right';
      }
      return '-';
    },
    getMovementTilt(angle) {
      if (angle < -36) {
        return 'Super Right';
      } else if (-36 < angle && angle < -12) {
        return 'Right';
      } else if (-12 < angle && angle < 12) {
        return 'Frontal';
      } else if (12 < angle && angle < 36) {
        return 'Left';
      } else if (36 < angle) {
        return 'Super Left';
      }
      return '-';
    },
  }
}
</script>

<style scoped>
  Label {
    font-size: 18;
    margin-top: 10;
    color: #ffffff;
  }
  .positive-model-result {
    color: green;
  }
  .negative-model-result {
    color: red;
  }
</style>
