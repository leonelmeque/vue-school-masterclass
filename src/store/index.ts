//@ts-ignore
import { createStore } from 'vuex'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from '@/store/getters'

import threads from '@/store/threads/module'
import users from '@/store/users/module'
import posts from '@/store/posts/module'

export default createStore({
  modules: {
    threads,
    users,
    posts
  },
  state: {
    categories: [],
    forums: [],
    posts: [],
    unsubscribes: [],
    authId: null
  },
  actions,
  getters,
  mutations
})
