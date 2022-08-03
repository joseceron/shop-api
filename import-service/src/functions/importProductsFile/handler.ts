import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import cors from '@middy/http-cors';

// Import the required AWS SDK clients and commands for Node.js
import { PutObjectCommand }
from "@aws-sdk/client-s3";
import { s3Client } from "@libs/s3Client"; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const importProductsFile = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  try {
    const name = event.queryStringParameters.name;   
    console.log('name: ', name);

    const BUCKET = 'uploaded-shop-api';
    const catalogPath = `uploaded/${name}`;

    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      ContentType: 'text/csv',
    }

    const command = new PutObjectCommand(params);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(signedUrl);
    return formatJSONResponse({url: signedUrl})

  } catch (e) {        
    const errorCode = e?.statusCode ? e.statusCode : 500;
    return errorResponse(e.message, errorCode);    
  }
  
}).use(cors());



