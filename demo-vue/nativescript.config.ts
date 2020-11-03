import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'ai.cyberlabs.yoonit.camera.demo',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
