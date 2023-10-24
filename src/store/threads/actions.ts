import type { ActionContext, StoreOptions } from 'vuex'
import { api } from '@/utils/api'
import { docToResource, findById } from '@/utils'

type ActionFunction<P> = <R>(
  context: ActionContext<any, any>,
  payload: P
) => R | Promise<R>

const fetchThread: ActionFunction<{ id: string }> = async (
  { dispatch },
  { id }
) => {
  return await dispatch('fetchItem', { resource: 'threads', id })
}

const fetchThreads = async (
  { dispatch }: ActionContext<any, any>,
  { ids }: any
) => await dispatch('fetchItems', { ids, resource: 'threads' })

async function createThread(
  { commit, state, dispatch }: ActionContext<any, any>,
  {
    text,
    title,
    forumId
  }: { text: string; title: string; forumId: string }
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
  await dispatch('createPost', { text, threadId: thread.id })

  return findById<typeof state.threads>(
    state.threads.items,
    thread.id
  )
}

async function updateThread(
  { commit, state, rootState }: ActionContext<any, any>,
  { title, text, id }: { title: string; text: string; id: string }
) {
  const thread = findById(state.items, id)
  const post = findById(rootState.posts, thread?.posts[0])

  const { newThread, newPost } = await api.updateThread({
    thread: { ...thread, title },
    post: { ...post, text }
  })

  commit('setItem', { item: newThread, resource: 'threads' })
  commit('setItem', { item: newPost, resource: 'posts' })

  return docToResource(newThread)
}

export default {
  fetchThread,
  fetchThreads,
  createThread,
  updateThread
} as StoreOptions<any>['actions']
