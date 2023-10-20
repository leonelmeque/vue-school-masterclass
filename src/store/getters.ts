import { type GetterTree } from 'vuex'
import { findById } from '@/helpers'

export default {
  authUser: (state: any, getters: any) => {
    return getters.user(state.authId)
  },
  user: (state: any) => {
    return (id: string) => {
      const user = findById<any>(state.users, id)

      if (!user) return null

      return {
        ...user,
        get posts() {
          return state.posts.filter(
            (post: any) => post.userId === user.id
          )
        },
        get postsCount(): number {
          return user.postsCount ?? 0
        },

        get threads(): any {
          return state.threads.filter(
            (thread: any) => thread.userId === user.id
          )
        },
        get threadsCount(): number {
          return user?.threads?.length ?? 0
        }
      }
    }
  },
  thread: (state: any) => {
    return (id: string) => {
      const thread = findById(state.threads, id)

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
} as GetterTree<any, any>
