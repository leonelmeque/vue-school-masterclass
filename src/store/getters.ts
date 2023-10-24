import { type GetterTree } from 'vuex'

export default {
  authUser: (state: any, getters: any) => {
    return getters.user(state.authId)
  }
} as GetterTree<any, any>
