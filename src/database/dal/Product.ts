import {Op} from 'sequelize'
import Product from '../models/Product'
import {ProductInput, ProductOutput} from '../models/Product'

export const create = async (payload: ProductInput): Promise<ProductOutput> => {
  const product = await Product.create(payload)
  return product
}