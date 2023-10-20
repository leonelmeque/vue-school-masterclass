import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  type Unsubscribe,
  updateDoc,
  writeBatch
} from 'firebase/firestore'
import { db } from '@/config/firebase-config'

async function fetchResourceById(
  resource: string,
  resourceId: string
): Promise<{ unsubscribe: Unsubscribe; resource: any }> {
  const ref = doc(db, resource, resourceId)

  return new Promise((resolve) => {
    let data: any = null
    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists()) {
        data = doc.data()
      }
      resolve({ unsubscribe, resource: data })
    })
  })
}

async function fetchResource(resource: string) {
  const q = query(collection(db, resource))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) return []

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}

async function createPost(newPost: any, authId: string) {
  const batch = writeBatch(db)
  const postCollection = collection(db, 'posts')
  const postRef = doc(postCollection)
  const threadRef = doc(db, 'threads', newPost.threadId)
  const userRef = doc(db, 'users', authId)

  batch.set(postRef, newPost)
  batch.update(threadRef, {
    posts: arrayUnion(postRef.id),
    contributors: arrayUnion(authId)
  })
  batch.update(userRef, {
    postsCount: increment(1)
  })
  await batch.commit()

  return {
    id: postRef.id,
    ...newPost
  }
}

async function createThread(newThread: any) {
  const publishedAt = serverTimestamp() as unknown as number

  const batch = writeBatch(db)
  const threadCollection = collection(db, 'threads')
  const threadRef = doc(threadCollection)
  const userRef = doc(db, 'users', newThread.userId)
  const forumRef = doc(db, 'forums', newThread.forumId)

  batch.set(threadRef, {
    publishedAt,
    id: threadRef.id,
    ...newThread
  })
  batch.update(userRef, { threads: arrayUnion(threadRef.id) })
  batch.update(forumRef, {
    threads: arrayUnion(threadRef.id)
  })
  await batch.commit()

  return {
    id: threadRef.id,
    ...newThread
  }
}

async function updateThread({ thread, post }: any) {
  const batch = writeBatch(db)

  const threadRef = doc(db, 'threads', thread.id)
  const postRef = doc(db, 'posts', post.id)

  batch.update(threadRef, { id: threadRef.id, ...thread })
  batch.update(postRef, { id: postRef.id, ...post })
  await batch.commit()

  return {
    newThread: {
      id: thread.id,
      ...thread
    },
    newPost: {
      id: postRef.id,
      ...post
    }
  } as const
}

async function updatePost(post: any) {
  const postRef = doc(db, 'posts', post.id)
  await updateDoc(postRef, { id: postRef.id, ...post })

  return { id: postRef.id, ...post }
}

export const api = {
  fetchResource,
  fetchResourceById,
  createPost,
  createThread,
  updateThread,
  updatePost
}
