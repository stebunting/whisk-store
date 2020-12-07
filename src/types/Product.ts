interface Date {
  year: number,
  month: number,
  date: number,
  time: {
    start: string,
    end: string
  },
  deadline: {
    year: number,
    month: number,
    date: number,
    hours: number
  }
}

export interface Product {
  _id: string,
  name: string,
  slug: string,
  brand: string,
  category: string,
  contents?: Array<string>,
  description: Array<string>,
  ingredients?: Array<{
    item: string,
    details: string
  }>,
  links?: Array<{
    text: string,
    url: string
  }>,
  momsRate: number,
  grossPrice: number,
  deliveryMethods: Array<string>,
  delivery?: {
    dates: Array<Date>,
    costs: {
      [zone: string]: {
        zone: number,
        price: number,
        momsRate: number
      }
    }
    maxZone: number
  },
  collection?: {
    dates: Array<Date>
  },
  images: Array<{
    thumb: string,
    url: string
  }>
}
