import { handlerPath } from '@libs/handler-resolver';

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.importFileParser`,
  events: [
    {
      s3: {
        bucket: 'uploaded-shop-api',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/'
          }
        ],
        existing: true,
      }
    }
  ],
  // events: [
  //   {
  //     s3: {
  //       bucket: 'shop-api-repository',
  //       event: 's3:ObjectCreated:*',
  //       rules: [
  //         {
  //           prefix: 'uploaded-shop-api/'
  //         }
  //       ],
  //       existing: true,
  //     }
  //   }
  // ],
};