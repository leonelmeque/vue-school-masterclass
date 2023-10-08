interface Resource {
  id: string
}

export const findById = <T extends Resource>(
  resources: T[],
  id: string
) =>
  !resources ? null : resources.find((resource) => resource.id === id)

export const upsert = <T extends Resource>(
  resources: T[],
  resource: T
) => {
  const index = resources.findIndex((r) => r.id === resource.id)
  if (resource.id && index !== -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}
