import * as ProductDal from '../database/dal/Product';
import {ProductInput, ProductOutput} from '../database/models/Product';

export const create = (payload: ProductInput) : Promise<ProductOutput> => {
  return ProductDal.create(payload);
}
