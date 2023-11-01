//@ts-ignore
import { type ActionTree } from 'vuex'
import { api } from '@/utils/api'
import { getFirebaseUser } from '@/utils/firebase-utils'
import type { Unsubscribe } from 'firebase/firestore'

export default {
  // Single fetching actions
  fetchAuthUser: async ({ dispatch, commit }: any) => {
    const userId = getFirebaseUser()
    if (!userId) {
      return
    }

    function handleUnsubscribe(unsubscribe: Unsubscribe) {
      commit('setAuthUserUnsubscribe', unsubscribe)
    }

    await dispatch('fetchItem', {
      resource: 'users',
      id: userId,
      handleUnsubscribe
    })
    commit('setAuthId', userId)
    // commit('setAuthUser', user)
  },
  signInWithGoogle: async ({ dispatch }: any) => {
    const { user, exists } = await api.signInWithGoogle()
    if (!exists) {
      return await dispatch('createUser', user)
    }

    return user
  },
  signInWithEmailAndPassword: async (
    context: any,
    { email, password }: any
  ) => {
    return api.signInWithEmailAndPassword(email, password)
  },
  signOut: async ({ commit }: any) => {
    await api.signOut()
    commit('setAuthId', null)
  },
  fetchForum: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'forums', id }),
  fetchCategory: ({ dispatch }: any, { id }: any) =>
    dispatch('fetchItem', { resource: 'categories', id }),
  fetchForums: ({ dispatch }: any, { ids }: any) => {
    dispatch('fetchItems', { ids, resource: 'forums' })
  },
  fetchItem: async (
    { commit }: any,
    { id, resource, handleUnsubscribe }: any
  ) => {
    const { unsubscribe, resource: data } =
      await api.fetchResourceById(resource, id)

    if (data) {
      commit('setItem', { resource, id, item: data })
      return data
    }

    if (handleUnsubscribe) {
      handleUnsubscribe(unsubscribe)
    } else {
      commit('appendUnsubscribe', { unsubscribe })
    }
    return data
  },
  fetchItems: ({ dispatch }: any, { ids, resource }: any) =>
    Promise.all(
      ids?.map((id: any) =>
        dispatch('fetchItem', { id, resource })
      ) ?? []
    ),
  async unsubscribeAllSnapshots({ state, commit }: any) {
    state.unsubscribes.forEach((unsubscribe: any) => unsubscribe())
    commit('clearAllUnsubscribes')
  },
  async unsubscribeAuthUserSnapshot({ state, commit }: any) {
    if (state.authUserUnsubscribe) {
      state.authUserUnsubscribe()
      commit('setAuthUserUnsubscribe', null)
    }
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
