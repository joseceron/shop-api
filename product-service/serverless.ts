import type { AWS } from '@serverless/typescript';

import {createProduct} from '@functions/createProduct';
import {getProductsList} from '@functions/getProducts';
import {getProductsById} from '@functions/getProductsById';

// import {importProductsFile} from '@functions/import-service/importProductsFile';
// import {importFileParser} from '@functions/import-service/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'shop-api',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-offline', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      HOST: 'database-1.cvdyadm1wxrj.us-east-1.rds.amazonaws.com',
      DB_USER: 'postgres',
      PASSWORD: 'postgres',
      DB: 'postgres',
      NODE_ENV: 'production',
      REGION: 'us-east-1',
      BUCKET_NAME: 'uploaded-shop-api'
    },
    // iamRoleStatements: [
      // {
      //   Effect: 'Allow',
      //   Action: ['s3:ListBucket' ],
      //   Resource: [ 'arn:aws:s3:::shop-api-repository' ]
      // },
      // {
      //   Effect: 'Allow',
      //   Action: ['s3:*' ],
      //   Resource: [ 'arn:aws:s3:::shop-api-repository/*' ]
      // },
      // {
      //   Effect: 'Allow',
      //   Action: ['s3:ListBucket' ],
      //   Resource: [ 'arn:aws:s3:::uploaded-shop-api' ]
      // },
      // {
      //   Effect: 'Allow',
      //   Action: ['s3:*' ],
      //   Resource: [ 'arn:aws:s3:::uploaded-shop-api/*' ]
      // }
    // ]
  },
  // import the function via paths
  functions: { 
    getProductsList,
    getProductsById,
    createProduct,
    // importProductsFile,
    // importFileParser,
  },
  package: { individually: true },
  custom: {
    autoswagger: {
      useStage: true
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    }   
  },
};

module.exports = serverlessConfiguration;
