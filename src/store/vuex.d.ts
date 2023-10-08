// vuex.d.ts
import { Store } from 'vuex'
import type { SourceData } from '@/utils/shared-types'

declare module '@vue/runtime-core' {
  // declare your own store states

  interface State extends SourceData {}

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
