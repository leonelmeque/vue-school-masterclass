interface Resource {
  id: string
}

export const findById = <T extends Resource>(
  resources: T[],
  id: string
) =>
  !resources ? null : resources.find((resource) => resource.id === id)

export const upsert = <T extends Resource>(
  resources: T[] | { items: T[] },
  resource: T
) => {
  const hasItems = 'items' in resources

  const index = hasItems
    ? resources.items.findIndex((r) => r.id === resource.id)
    : resources.findIndex((r) => r.id === resource.id)

  if (resource.id && index !== -1) {
    hasItems
      ? (resources.items[index] = resource)
      : (resources[index] = resource)
  } else {
    hasItems
      ? resources.items.push(resource)
      : resources.push(resource)
  }
}

export const docToResource = (doc: any) => {
  if (typeof doc?.data !== 'function') return doc
  return { ...doc.data(), id: doc.id }
}

export { onFirebaseAuthStateChanged } from './firebase-utils'
