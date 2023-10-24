import { type Mutation, type StoreOptions } from 'vuex'
import { serverTimestamp } from 'firebase/firestore'
import { api } from '@/utils/api'
import { type Post } from '@/utils/shared-types'
import { findById } from '@/utils'

const fetchPost: Mutation<any> = ({ dispatch }: any, { id }: any) =>
  dispatch('fetchItem', { resource: 'posts', id })

const fetchPosts: Mutation<any> = ({ dispatch }, { ids }) =>
  dispatch('fetchItems', { ids, resource: 'posts' })

const createPost: Mutation<any> = async (
  { commit, rootState },
  post: Post
) => {
  post.userId = rootState.authId
  post.publishedAt = serverTimestamp() as unknown as number

  const newPost = await api.createPost(post, rootState.authId)

  const userToUpdate = findById(
    rootState.users.items,
    rootState.authId
  )

  commit('setPost', { post: newPost })
  commit('appendPostToThread', {
    childId: newPost.id,
    parentId: newPost.threadId
  })
  commit('appendContributorToThread', {
    childId: rootState.authId,
    parentId: newPost.threadId
  })

  commit('setUser', {
    user: {
      ...userToUpdate,
      postsCount: (userToUpdate?.postsCount || 0) + 1
    }
  })
}

const updatePost: Mutation<any> = async (
  { commit, state },
  { id, text }
) => {
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
}

export default {
  fetchPost,
  fetchPosts,
  updatePost,
  createPost
} as StoreOptions<any>[actions]
