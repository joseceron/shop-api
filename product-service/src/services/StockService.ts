import * as StockDal from '../database/dal/Stock';
import {StockInput, StockOutput} from '../database/models/Stock';

export const create = (payload: StockInput) : Promise<StockOutput> => {
  return StockDal.create(payload);
}

export const getAll = () : Promise<StockOutput[]> => {
  return StockDal.getAll()
}

export const getByProductId = (productId: string) : Promise<StockOutput> => {
  return StockDal.getByProductId(productId)
}