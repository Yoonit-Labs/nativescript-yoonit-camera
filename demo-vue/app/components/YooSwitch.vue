<template>
  <FlexboxLayout
    @loaded="doLoad"
    flexDirection="row"
    alignItems="center"
  >
    <Switch
      :checked=checked
      @tap="tap"
      backgroundColor="#333333"
      offBackgroundColor="#333333"
    />
    <Label
      :text="label"
    />
  </FlexboxLayout>
</template>

<script>
  export default {
    name: 'YooSwitch',
    data: () => ({
      checked: false,
    }),
    props: {
      initialChecked: {
        default: false,
      },
      label: {
        default: "",
      }
    },
    methods: {
      doLoad() {
        this.checked = this.initialChecked;
      },
      tap() {
        this.$emit('tap')
      },
    }
  }
</script>

<style scoped>
  Label {
    font-size: 14;
    color: #ffffff;
  }
</style>
