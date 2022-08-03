import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import cors from '@middy/http-cors';

import {create as createProductService} from '../../services/ProductService'
import {
  create as createStockServer,
} from '../../services/StockService'

export const createProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  try {
    const body = event.body
    const {title, description, price, count} = body;  

    console.log('title: ', title);
    console.log('description: ', description);
    console.log('price: ', price);
    console.log('count: ', count);

    if(!title)
     return errorResponse('title is missing', 400);  
    if(!price)
      return errorResponse('price is missing', 400);  
    if(!count)
      return errorResponse('count is missing', 400); 
  
    const product = {
      title: title,
      description: description,
      price: price,
    };
   
    let productCreated = await createProductService(product)
    productCreated = productCreated.dataValues
    if(productCreated.id){
      let stockParams = {
        product_id: productCreated.id,
        count
      }
      
      let stockCreated = await createStockServer(stockParams)
      stockCreated = stockCreated.dataValues
      productCreated.count = stockCreated.count
    }
    return formatJSONResponse({productCreated});
  } catch (e) {
    const errorCode = e?.statusCode ? e.statusCode : 500;
    return errorResponse(e.message, errorCode);  
  }


 
}).use(cors());

function dataValidation(body) {
  const {title, description, price, count} = body;

  if(title == null || title == undefined)
    return errorResponse('title is missing', 404);  
  if(price == null || price == undefined)
    return errorResponse('price is missing', 404);  
  if(count == null || count == undefined)
    return errorResponse('count is missing', 404);  
  
}

