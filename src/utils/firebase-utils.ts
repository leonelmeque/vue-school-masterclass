import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'

export function onFirebaseAuthStateChanged(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(getAuth(), callback)
}

export function getFirebaseUser() {
  return getAuth().currentUser?.uid as unknown as string | null
}
