import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import { default as products } from '../../utils/productList.json';
import cors from '@middy/http-cors';

import {create as createProductService} from '../../services/ProductService'
import {
  create as createStockServer,
  // getAll as getAllStocks,
  // getByProductId as getStockByProductId
} from '../../services/StockService'

// export const getProductsList = middyfy(async (): Promise<APIGatewayProxyResult> => {
//   return formatJSONResponse(products);
// }).use(cors());

// export const getProductsList = middyfy(async (): Promise<APIGatewayProxyResult> => {
//   let stocks = await getAllStocks()
//   const products = setProductsAttributes(stocks)
//   return formatJSONResponse({products})
// }).use(cors());

// function setProductsAttributes(stocks) {
//   let response = []
//   for(let stock of stocks) {
//     let item = setProductItem(stock)
//     response.push(item)    
//   }
//   return response  
// }

// export const getProductsById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const id = event.pathParameters.id;
//   const product = products.find(p => p.id === id);
//   return formatJSONResponse(product);
// }).use(cors());

// export const getProductsById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const productId = event.pathParameters.id;
//   console.log('productId: ', productId);

//   const stock = await getStockByProductId(productId)
//   var product = null
//   if(stock) product = setProductItem(stock)
  
//   return formatJSONResponse({product})
  
// }).use(cors());

// function setProductItem(stock) {
//   const item = {
//     ...stock.Product.dataValues,
//     price: +stock.Product.dataValues.price,
//     count: stock.count  
//   }
//   return item
// }

export const createProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const body = event.body
  const {title, description, price, count} = body;  
  
  console.log('title: ', title);
  console.log('description: ', description);
  console.log('price: ', price);
  console.log('count: ', count);

  const product = {
    title: title,
    description: description,
    price: price,
  };
 

  let productCreated = await createProductService(product)
  productCreated = productCreated.dataValues
  console.log(productCreated);
  if(productCreated.id){
    let stockParams = {
      product_id: productCreated.id,
      count
    }
    
    let stockCreated = await createStockServer(stockParams)
    stockCreated = stockCreated.dataValues
    console.log(stockCreated);
    productCreated.count = stockCreated.count
  }


  // const product = products.find(p => p.id === id);
  return formatJSONResponse({productCreated});
}).use(cors());

