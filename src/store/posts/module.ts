import type { StoreOptions } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  state: {
    items: []
  },
  mutations,
  actions,
  getters
} as StoreOptions<any>
