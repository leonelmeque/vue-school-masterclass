import { type Users } from '@/utils/shared-types'
import type { Action } from 'vuex'
import { api } from '@/utils/api'

const registerUser: Action<any> = async (
  { dispatch }: any,
  { email, name, username, avatar = null, password }: any
) => {
  const { id } = await api.registerAuthUser({ email, password })
  dispatch('createUser', { email, name, username, avatar, id })
}

const createUser: Action<any> = async (
  { commit }: any,
  { email, name, username, avatar = null, id }: any
) => {
  const registeredUser = await api.createUser({
    id,
    email: email.toLowerCase(),
    name,
    username: username.toLowerCase(),
    avatar,
    postsCount: 0,
    registeredAt: serverTimestamp()
  })

  commit('setItem', { resource: 'users', item: registeredUser })
  return docToResource(registeredUser)
}

const updateUser: Action<any> = ({ commit }, user: Users) => {
  commit('setUser', { user, userId: user.id })
}

const fetchUser: Action<any> = ({ dispatch }, { id }) =>
  dispatch('fetchItem', { resource: 'users', id })

const fetchUsers: Action<any> = ({ dispatch }: any, { ids }: any) =>
  dispatch('fetchItems', { ids, resource: 'users' })

export default {
  updateUser,
  fetchUser,
  fetchUsers,
  registerUser,
  createUser
} as StoreOptions<any>['actions']
