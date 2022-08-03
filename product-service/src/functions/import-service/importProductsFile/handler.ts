import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import cors from '@middy/http-cors';

// import AWS from 'aws-sdk'

// Import the required AWS SDK clients and commands for Node.js
import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteBucketCommand }
from "@aws-sdk/client-s3";
import { s3Client } from "@libs/s3Client"; // Helper function that creates an Amazon S3 service client module.
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fetch from "node-fetch";


export const importProductsFile = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  try {
    
    const name = event.queryStringParameters.name;   
    console.log('name: ', name);

    // const s3 = new AWS.S3({region: 'us-east-1'});

    const BUCKET = 'uploaded-shop-api';
    // const catalogPath = 'uploaded/catalog.csv';
    const catalogPath = `uploaded/${name}`;

    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      // Expires: 60,
      ContentType: 'text/csv',
    }
   
    // s3.getSignedUrl('putObject', params, (error, url) => {

    //   if(error) throw new Error('Error in getSigned Url')
    //   console.log(url);      
    //   return formatJSONResponse({url})
    // })

    const command = new PutObjectCommand(params);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(signedUrl);
    return formatJSONResponse({url: signedUrl})

    // const response = await fetch(signedUrl, {method: 'PUT', body: params.Body});


  } catch (e) {        
    const errorCode = e?.statusCode ? e.statusCode : 500;
    return errorResponse(e.message, errorCode);    
  }
  
}).use(cors());



