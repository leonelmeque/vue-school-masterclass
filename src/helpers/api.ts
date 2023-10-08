import {
  collection,
  doc,
  getDoc,
  getDocs,
  query
} from 'firebase/firestore'
import { db } from '@/config/firebase-config'

export async function fetchResourceById(
  resource: string,
  resourceId: string
) {
  const ref = doc(db, resource, resourceId)
  const docSnap = await getDoc(ref)

  if (docSnap.exists()) {
    return docSnap.data()
  }

  return null
}

export async function fetchResource(resource: string) {
  const q = query(collection(db, resource))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) return []

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}
