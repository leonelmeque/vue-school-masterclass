import { type StoreOptions } from 'vuex'
import { findById } from '@/utils'

export default {
  user: (state: any, _, rootState) => {
    return (id: string) => {
      const user = findById<any>(state.items, id)

      if (!user) return null

      return {
        ...user,
        get posts() {
          return rootState.posts.items.filter(
            (post: any) => post.userId === user.id
          )
        },
        get postsCount(): number {
          return user.postsCount ?? 0
        },

        get threads(): any {
          return rootState.threads.items.filter(
            (thread: any) => thread.userId === user.id
          )
        },
        get threadsCount(): number {
          return user?.threads?.length ?? 0
        }
      }
    }
  }
} as StoreOptions<any>['getters']
