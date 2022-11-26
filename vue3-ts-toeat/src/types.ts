import type { dietList, restaurantStatusList } from '@/constants'

export type Restaurant = {
  id: string
  name: string
  address: string
  website: string
  status: Status
  diet?: Diet
}

export class Dish {
  id: string = ''
  name: string = ''
  status: Status = 'Want to Try'
  diet?: Diet

  //   constructor() {
  //     return { id: '', name: '' }
  //   }
}

// Instead of declaring:
// type Status = 'Want to Try' | 'Recommended' | 'Not Recommended'
// this programatical and funky syntax is used:
type Status = typeof restaurantStatusList[number]

//type Diet = 'Vegetarian' | 'Pescetarian' | 'Keto'
type Diet = typeof dietList[number]
