import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { ProductInput } from './Product'
import Product from './Product'


interface StockAttributes {
  product_id: string,
  count: number,
}

export interface StockInput extends Required<StockAttributes> {}
export interface StockOutput extends Required<StockAttributes> {}

class Stock extends Model<StockAttributes, ProductInput> implements StockAttributes {
  public product_id: string;
  public count: number;
}

Stock.init({
  product_id: { 
    type: DataTypes.UUIDV4, 
    allowNull: false, 
    references: {model: Product, key: 'id'},
    primaryKey: true
  },
  count: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
}, {
  tableName: "stocks",
  sequelize: sequelizeConnection,
  timestamps: false,
})

Stock.belongsTo(Product, {foreignKey: "product_id"});

export default Stock