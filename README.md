# Project Name

## Description

This project implements a RESTful API server using Express.js and SQLite3. It provides endpoints to manage products and cars data.

## Datastore

The application uses SQLite3 as the database management system. The database contains two tables: `products` and `cars`.

### Products Table

The `products` table stores information about products. Each product has the following attributes:

- `id`: Unique identifier for the product (automatically generated).
- `name`: Name of the product.
- `price`: Price of the product.

### Cars Table

The `cars` table stores information about cars. Each car has the following attributes:

- `id`: Unique identifier for the car (automatically generated).
- `brand`: Brand of the car.

## Endpoints

- [Production deploy](https://dp-ca.onrender.com/)
  
### Products Endpoints

- `GET /products`: Retrieve a list of all products.
- `GET /products/:id`: Retrieve details of a specific product.
- `POST /products`: Add a new product.
- `DELETE /products/:id`: Delete a specific product.

### Cars Endpoints

- `GET /cars`: Retrieve a list of all cars.
- `GET /cars/:id`: Retrieve details of a specific car.
- `POST /cars`: Add a new car.
- `DELETE /cars/:id`: Delete a specific car.


### Author

- Ssander Selfors
