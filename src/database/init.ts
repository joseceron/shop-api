import {Product} from './models';

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Product.sync({ alter: isDev })
}
export default dbInit 