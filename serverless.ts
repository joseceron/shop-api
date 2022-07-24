import type { AWS } from '@serverless/typescript';

// import {getProductsList, getProductsById, createProduct} from '@functions/products'
// import {createProduct} from '@functions/products'
import {createProduct} from '@functions/createProduct'
import {getProductsList} from '@functions/getProducts'
import {getProductsById} from '@functions/getProductsById'

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
      HOST: '',
      DB_USER: '',
      PASSWORD: '',
      DB: '',
      NODE_ENV: 'production',
    },
  },
  // import the function via paths
  functions: { 
    getProductsList,
    getProductsById,
    createProduct,
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
