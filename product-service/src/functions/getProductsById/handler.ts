import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import cors from '@middy/http-cors';

import {
  getByProductId as getStockByProductId
} from '../../services/StockService'

export const getProductsById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  try {
    const productId = event.pathParameters.id;   
    console.log('productId: ', productId);

    if(!productId)
     return errorResponse('title is missing', 400);  
  
    const stock = await getStockByProductId(productId)
    
    if(stock == null) 
      return errorResponse(`Product with id: ${productId} not found`, 400)
      
    const product = setProductItem(stock)
    return formatJSONResponse({product})

  } catch (e) {        
    const errorCode = e?.statusCode ? e.statusCode : 500;
    return errorResponse(e.message, errorCode);    
  }
  
}).use(cors());

function setProductItem(stock) {
  const item = {
    ...stock.Product.dataValues,
    price: +stock.Product.dataValues.price,
    count: stock.count  
  }
  return item
}

