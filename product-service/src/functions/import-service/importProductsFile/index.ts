import { handlerPath } from '@libs/handler-resolver';

export const importProductsFile = {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: {
          origin: '*',
        },
        responses: {          
          '200': {
            description: 'Success response',
            bodyType: 'Product'
          }
        }
      },
    },
  ],
};