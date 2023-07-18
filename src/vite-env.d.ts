/// <reference types="vite/client" />
/// <reference types="petite-vue/dist/types" />

// wtf pvue couldn't import types
declare module "petite-vue" {
  import { createApp, reactive } from 'petite-vue'
  export {
    createApp,
    reactive
  }
}

declare namespace PetiteVue {
  export * from 'petite-vue'
}