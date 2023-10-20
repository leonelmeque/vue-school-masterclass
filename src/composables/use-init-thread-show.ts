import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useAsyncDataStatus } from '@/composables/use-async-data-status'

const useInitThreadShow = ({ threadId }: { threadId: string }) => {
  const store = useStore()
  const { isReady, setReady } = useAsyncDataStatus()

  onBeforeMount(async () => {
    const _thread = await store.dispatch('fetchThread', {
      id: threadId
    })

    await store.dispatch('fetchUser', {
      id: _thread.userId
    })

    const _posts = await store.dispatch('fetchPosts', {
      ids: _thread.posts
    })

    const users = _posts
      .map(({ userId }: any) => userId)
      .concat(_thread.userId)

    await store.dispatch('fetchUsers', {
      ids: users
    })
    setReady()
  })

  return { isReady }
}

export { useInitThreadShow }
