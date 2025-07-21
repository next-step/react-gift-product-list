import Price from "./Price"
import BrandInfo from "./BrandInfo"
export interface Product {
  id: number
  name: string
  price: Price
  imageURL: string
  brandInfo: BrandInfo
}
