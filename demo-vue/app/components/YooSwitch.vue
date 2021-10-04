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
/**
 * ██╗   ██╗ ██████╗  ██████╗ ███╗   ██╗██╗████████╗
 * ╚██╗ ██╔╝██╔═══██╗██╔═══██╗████╗  ██║██║╚══██╔══╝
 *  ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║   ██║
 *   ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║
 *    ██║   ╚██████╔╝╚██████╔╝██║ ╚████║██║   ██║
 *    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝
 *
 * https://yoonit.dev - about@yoonit.dev
 *
 * NativeScript Yoonit Camera
 * The most advanced and modern Camera module for Android with a lot of awesome features
 *
 * Luigui Delyer, Haroldo Teruya, Victor Goulart, Gabriel Rizzo & Márcio Bruffato @ 2020-2021
 */
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
