import { ref } from 'vue'

function useAsyncDataStatus() {
  const isReady = ref(false)

  function setReady() {
    isReady.value = true
  }

  return {
    isReady,
    setReady
  }
}

export { useAsyncDataStatus }
