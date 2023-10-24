import type { StoreOptions } from 'vuex'
import { findById } from '@/utils'

export default {
  thread: (state: any) => {
    return (id: string) => {
      const thread = findById(state.items, id)
      if (!thread) return null

      return {
        ...thread,
        get author() {
          return findById(state.users, thread?.userId)
        },
        get repliesCount() {
          return thread?.posts?.length - 1 || 0
        },
        get contributorsCount() {
          return thread?.contributors?.length || 0
        }
      }
    }
  }
} as StoreOptions<any>['getters']
