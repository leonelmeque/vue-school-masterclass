import { findById } from '@/utils'

export function makeAppendChildToParentMutation({
  parent,
  child
}: any) {
  return (state: any, { childId, parentId }: any) => {
    const resource = findById<any>(state.items, parentId)

    if (!resource) {
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
