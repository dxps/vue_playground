export default interface User {
  id: number
  username: string
  settings: string[]
}

export const isUserLoggedIn = (currUser: User | undefined) => {
  return currUser !== undefined && currUser?.username !== undefined
}
