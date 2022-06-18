import type Emoji from "./Emoji"

type Entry = {
  id: number
  body: string
  emoji: Emoji | null
  createdAt: Date
  userId: number
}

export default Entry
