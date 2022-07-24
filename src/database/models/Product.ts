import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ProductAttributes {
  title: string,
  description?: string,
  price: number,
}

export interface ProductInput extends Optional<ProductAttributes, 'description'> {}
export interface ProductOutput extends Optional<ProductAttributes, 'description'> {}

class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
  public title: string
  public description?: string
  public price: number
}

Product.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,

  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
},{
  tableName: "products",
  sequelize: sequelizeConnection,
  timestamps: false,
})

export default Product