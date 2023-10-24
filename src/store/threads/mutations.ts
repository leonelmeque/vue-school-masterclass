import { makeAppendChildToParentMutation } from '@/store/helpers'
import type { StoreOptions } from 'vuex'
import { Store } from 'vuex'
import sourceData from '../../../data.json'
import { upsert } from '@/utils'

const appendPostToThread = makeAppendChildToParentMutation({
  parent: 'threads',
  child: 'posts'
})

const appendThreadToForum = makeAppendChildToParentMutation({
  parent: 'forums',
  child: 'threads'
})

const appendThreadToUser = makeAppendChildToParentMutation({
  parent: 'users',
  child: 'threads'
})

const appendContributorToThread = makeAppendChildToParentMutation({
  parent: 'threads',
  child: 'users'
})

function setThread(
  state: Store<typeof sourceData>['state'],
  { thread }: any
) {
  upsert(state.items, thread)
}

export default {
  appendThreadToForum,
  appendThreadToUser,
  appendContributorToThread,
  appendPostToThread,
  setThread
} as StoreOptions<any>['mutations']
