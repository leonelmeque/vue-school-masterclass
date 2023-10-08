//@ts-ignore
import { type ActionTree } from 'vuex'
import { type Post, type Users } from '@/utils/shared-types'
import { findById } from '@/helpers'
import { fetchResource, fetchResourceById } from '@/helpers/api'

export default {
  createPost({ commit, state }: any, post: Post) {
    post.id = 'xyz' + Math.random()
    post.userId = state.authId
    post.publishedAt = Math.floor(Date.now() / 1000)

    commit('setPost', { post })
    commit('appendPostToThread', {
      childId: post.id,
      parentId: post.threadId
    })
    commit('appendContributorToThread', {
      childId: state.authId,
      parentId: post.threadId
    })
  },
  updateUser({ commit }: any, user: Users) {
    commit('setUser', { user, userId: user.id })
  },
  async createThread(
    { commit, state, dispatch }: any,
    { text, title, forumId }: any
  ) {
    const id = 'ggqq' + Math.random()
    const userId = state.authId
    const publishedAt = Math.floor(Date.now() / 1000)
    const thread = { forumId, title, publishedAt, userId, id }

    commit('setThread', { thread })
    commit('appendThreadToForum', { parentId: forumId, childId: id })
    commit('appendThreadToUser', {
      parentId: userId,
      childId: id
    })
    dispatch('createPost', { text, threadId: id })

    return findById<typeof state.threads>(state.threads, id)
  },
  async updateThread(
    { commit, state }: any,
    { title, text, id }: any
  ) {
    const thread = findById<typeof state.threads>(state.threads, id)
    const post = findById(state.posts, thread?.posts[0])

    const newThread = { ...thread, title }
    const newPost = { ...post, text }

    commit('setThread', { thread: newThread })
    commit('setPost', { post: newPost })

    return newThread
  },
  // Single fetching actions
  fetchThread: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'threads', id }),
  fetchUser: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'users', id }),
  fetchPost: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'posts', id }),
  fetchForum: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'forums', id }),
  // Batch fetching actions
  fetchThreads: ({ dispatch }: any, { ids }: any) =>
    dispatch('fetchItems', { ids, resource: 'threads' }),
  fetchPosts: ({ dispatch }: any, { ids }: any) =>
    dispatch('fetchItems', { ids, resource: 'posts' }),
  fetchUsers: ({ dispatch }: any, { ids }: any) =>
    dispatch('fetchItems', { ids, resource: 'users' }),
  fetchForums: ({ dispatch }: any, { ids }: any) => {
    dispatch('fetchItems', { ids, resource: 'forums' })
  },
  fetchItem: async ({ commit }: any, { id, resource }: any) => {
    const data = await fetchResourceById(resource, id)

    if (data) {
      commit('setItem', { resource, id, item: data })
      return data
    }

    return data
  },
  fetchItems: ({ dispatch }: any, { ids, resource }: any) =>
    Promise.all(
      ids.map((id: any) => dispatch('fetchItem', { id, resource }))
    ),
  fetchAllCategories: async ({ commit }: any) => {
    const categories = await fetchResource('categories')

    categories.forEach((category: any) => {
      commit('setItem', { resource: 'categories', item: category })
    })

    return categories
  }
} as ActionTree<any, any>
