//@ts-ignore
import { type ActionTree } from 'vuex'
import { type Post, type Users } from '@/utils/shared-types'
import { docToResource, findById } from '@/helpers'
import { serverTimestamp } from 'firebase/firestore'
import { api } from '@/helpers/api'

export default {
  async createPost({ commit, state }: any, post: Post) {
    post.userId = state.authId
    post.publishedAt = serverTimestamp() as unknown as number

    const newPost = await api.createPost(post, state.authId)

    const userToUpdate = findById(state.users, state.authId)

    commit('setPost', { post: newPost })
    commit('appendPostToThread', {
      childId: newPost.id,
      parentId: newPost.threadId
    })
    commit('appendContributorToThread', {
      childId: state.authId,
      parentId: newPost.threadId
    })

    commit('setUser', {
      user: {
        ...userToUpdate,
        postsCount: (userToUpdate?.postsCount || 0) + 1
      }
    })
  },
  updateUser({ commit }: any, user: Users) {
    commit('setUser', { user, userId: user.id })
  },
  async createThread(
    { commit, state, dispatch }: any,
    { text, title, forumId }: any
  ) {
    const userId = state.authId
    const thread = await api.createThread({
      forumId,
      title,
      userId,
      posts: []
    })

    commit('setThread', { thread })
    commit('appendThreadToForum', {
      parentId: forumId,
      childId: thread.id
    })
    commit('appendThreadToUser', {
      parentId: userId,
      childId: thread.id
    })
    dispatch('createPost', { text, threadId: thread.id })

    return findById<typeof state.threads>(state.threads, thread.id)
  },
  async updateThread(
    { commit, state }: any,
    { title, text, id }: any
  ) {
    const thread = findById<typeof state.threads>(state.threads, id)
    const post = findById(state.posts, thread?.posts[0])

    const { newThread, newPost } = await api.updateThread({
      thread: { ...thread, title },
      post: { ...post, text }
    })

    commit('setItem', { item: newThread, resource: 'threads' })
    commit('setItem', { item: newPost, resource: 'posts' })

    return docToResource(newThread)
  },
  async updatePost({ commit, state }: any, { id, text }: any) {
    const post = {
      id,
      text,
      edited: {
        at: serverTimestamp(),
        by: state.authId,
        moderated: false
      }
    }
    const updatedPost = await api.updatePost(post)
    commit('setItem', { resource: 'posts', item: updatedPost })
  },
  // Single fetching actions
  fetchThread: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'threads', id }),
  fetchUser: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'users', id }),
  fetchAuthUser: ({ dispatch, state }: any) =>
    dispatch('fetchItem', { resource: 'users', id: state.authId }),
  fetchPost: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'posts', id }),
  fetchForum: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'forums', id }),
  fetchCategory: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'categories', id }),
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
    const { unsubscribe, resource: data } =
      await api.fetchResourceById(resource, id)

    if (data) {
      commit('setItem', { resource, id, item: data })
      return data
    }
    commit('appendUnsubscribe', { unsubscribe })
    return data
  },
  fetchItems: ({ dispatch }: any, { ids, resource }: any) =>
    Promise.all(
      ids?.map((id: any) => dispatch('fetchItem', { id, resource }))
    ),
  async unsubscribeAllSnapshots({ state, commit }: any) {
    state.unsubscribes.forEach((unsubscribe: any) => unsubscribe())
    commit('clearAllUnsubscribes')
  },
  fetchCategories: ({ dispatch }: any, { ids }: any) => {
    return dispatch('fetchItems', {
      resource: 'categories',
      ids
    })
  },
  fetchAllCategories: async ({ commit }: any) => {
    const categories = await api.fetchResource('categories')

    categories.forEach((category: any) => {
      commit('setItem', { resource: 'categories', item: category })
    })

    return categories
  }
} as ActionTree<any, any>
