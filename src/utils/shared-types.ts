import sourceData from '../../data.json'

export type Post = (typeof sourceData.posts)[0]
export type Thread = (typeof sourceData.threads)[0]
export type Users = (typeof sourceData.users)[0]
export type Forum = (typeof sourceData.forums)[0]
export type Categories = (typeof sourceData.categories)[0]
