import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const useAuthProvider = () => {
  const store = useStore()
  const router = useRouter()
  async function signInWithGoogle() {
    await store.dispatch('signInWithGoogle')
    await router.push({ name: 'Home' })
  }

  return {
    signInWithGoogle
  }
}

export { useAuthProvider }
