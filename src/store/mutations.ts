//@ts-ignore
import { type MutationTree, Store } from 'vuex'
import sourceData from '../../data.json'
import { type Post } from '@/utils/shared-types'
import { docToResource, findById, upsert } from '@/helpers'

export default {
  setPost(
    state: Store<typeof sourceData>['state'],
    { post }: { post: Post }
  ) {
    upsert(state.posts, post)
  },
  appendPostToThread: makeAppendChildToParentMutation({
    parent: 'threads',
    child: 'posts'
  }),
  appendThreadToForum: makeAppendChildToParentMutation({
    parent: 'forums',
    child: 'threads'
  }),
  appendThreadToUser: makeAppendChildToParentMutation({
    parent: 'users',
    child: 'threads'
  }),
  appendContributorToThread: makeAppendChildToParentMutation({
    parent: 'threads',
    child: 'users'
  }),
  setItem(state: any, { resource, item }: any) {
    upsert(state[resource], docToResource(item))
  },
  setUser(
    state: Store<typeof sourceData>['state'],
    { user }: { user: (typeof sourceData.users)[0] }
  ) {
    upsert(state.users, user)
  },
  setAuthUser(state: any, user: any) {
    upsert(state.users, user)
  },
  setThread(
    state: Store<typeof sourceData>['state'],
    { thread }: any
  ) {
    upsert(state.threads, thread)
  },
  appendUnsubscribe(state: any, { unsubscribe }: any) {
    state.unsubscribes.push(unsubscribe)
  },
  clearAllUnsubscribes(state: any) {
    state.unsubscribes = []
  }
} as MutationTree<typeof sourceData>

function makeAppendChildToParentMutation({ parent, child }: any) {
  return (state: any, { childId, parentId }: any) => {
    const resource = findById<any>(state[parent], parentId)

    if (resource) {
      console.warn(
        `Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent didn't exist`
      )
      return
    }

    resource[child] = resource?.[child] || []
    // const test = resource?.[child].posts || []

    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}
