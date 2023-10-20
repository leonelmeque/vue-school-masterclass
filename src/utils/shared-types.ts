import sourceData from '../../data.json'

export type Post = (typeof sourceData.posts)[0]
export type Thread = (typeof sourceData.threads)[0]
export type Users = {
  avatar: string
  email: string
  lastVisitAt: number
  name: string
  isModerator: true
  registeredAt: number
  username: string
  usernameLower: string
  id: string
  website?: string
  bio?: string
}
export type Forum = (typeof sourceData.forums)[0]
export type Categories = (typeof sourceData.categories)[0]

export type SourceData = typeof sourceData
