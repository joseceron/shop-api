// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "shop-api",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get.products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Success response",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          }
        }
      }
    },
    "/products/{id}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get.products/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success response",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          }
        }
      }
    },
    "/products/": {
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post.products/",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Success response",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "count": {
          "title": "Product.count",
          "type": "number"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        }
      },
      "required": [
        "id",
        "title",
        "count",
        "description",
        "price"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    }
  },
  "securityDefinitions": {}
};