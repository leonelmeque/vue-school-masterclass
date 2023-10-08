//@ts-ignore
import { createStore } from 'vuex'
import sourceData from '../../data.json'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

export default createStore<typeof sourceData>({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  actions,
  getters,
  mutations
})
