import { Product } from "./Product"

export interface ThemeProductList {
  list: Product[]
  cursor: number
  hasMoreList: boolean
}
