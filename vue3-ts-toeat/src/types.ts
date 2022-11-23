import type { dietList, restaurantStatusList } from '@/constants'

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet
}

export type Dish = {
  id: string
  name: string
  status: Status
  diet?: Diet
}

// Instead of declaring:
// type Status = 'Want to Try' | 'Recommended' | 'Not Recommended'
// this programatical and funky syntax is used:
type Status = typeof restaurantStatusList[number]

//type Diet = 'Vegetarian' | 'Pescetarian' | 'Keto'
type Diet = typeof dietList[number]
