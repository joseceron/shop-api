import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import cors from '@middy/http-cors';

import {
  getAll as getAllStocks,
} from '../../services/StockService'

export const getProductsList = middyfy(async (): Promise<APIGatewayProxyResult> => {
  
  try {
    let stocks = await getAllStocks()
    const products = setProductsAttributes(stocks)
    return formatJSONResponse({products})
  } catch (e) {
    const errorCode = e?.statusCode ? e.statusCode : 500;
    return errorResponse(e.message, errorCode);  
  }
    
}).use(cors());

function setProductsAttributes(stocks) {
  let response = []
  for(let stock of stocks) {
    let item = setProductItem(stock)
    response.push(item)    
  }
  return response  
}

function setProductItem(stock) {
  const item = {
    ...stock.Product.dataValues,
    price: +stock.Product.dataValues.price,
    count: stock.count  
  }
  return item
}



