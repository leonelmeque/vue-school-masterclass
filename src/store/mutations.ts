//@ts-ignore
import { type MutationTree, Store } from 'vuex'
import sourceData from '../../data.json'
import { docToResource, upsert } from '@/utils'
import type { Unsubscribe } from 'firebase/firestore'

export default {
  setItem(state: any, { resource, item }: any) {
    upsert(state[resource], docToResource(item))
  },
  setAuthUserUnsubscribe(state: any, unsubscribe: Unsubscribe) {
    state.authUserUnsubscribe = unsubscribe
  },
  setAuthId(state: any, authId: string) {
    state.authId = authId
  },
  appendUnsubscribe(state: any, { unsubscribe }: any) {
    state.unsubscribes.push(unsubscribe)
  },
  clearAllUnsubscribes(state: any) {
    state.unsubscribes = []
  }
} as MutationTree<typeof sourceData>
