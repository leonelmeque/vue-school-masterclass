import { type Mutation, type StoreOptions } from 'vuex'
import { upsert } from '@/utils'

const setUser: Mutation<any> = (state, { user }) => {
  upsert(state.items, user)
}
const setAuthUser: Mutation<any> = (state: any, user: any) => {
  upsert(state.users, user)
}
export default {
  setUser,
  setAuthUser
} as StoreOptions<any>['mutations']
