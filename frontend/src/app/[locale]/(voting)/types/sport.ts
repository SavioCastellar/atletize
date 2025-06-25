import { Athlete } from "./athlete"

export interface Sport {
  id: number
  name: string
  icon: string
  athletes: Athlete[]
}
