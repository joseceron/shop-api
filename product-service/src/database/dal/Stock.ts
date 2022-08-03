import Product from '../models/Product'
import Stock from '../models/Stock'
import {StockInput, StockOutput} from '../models/Stock'

export const create = async (payload: StockInput): Promise<StockOutput> => {
  const stock = await Stock.create(payload)
  return stock
}

export const getAll = async() : Promise<StockOutput[]> => {
  const stocks = await Stock.findAll({include: [Product]})
  return stocks
}

export const getByProductId = async(productId: string) : Promise<StockOutput> => {
  const stocks = await Stock.findOne({where: {product_id: productId}, include: [Product]})
  return stocks
}