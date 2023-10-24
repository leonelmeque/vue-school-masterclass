import { type Mutation, type StoreOptions } from 'vuex'
import { upsert } from '@/utils'

const setPost: Mutation<any> = (state, { post }: { post }) => {
  upsert(state.items, post)
}

export default {
  setPost
} as StoreOptions<any>['mutations']
